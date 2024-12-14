from flask import Flask, render_template, redirect, url_for, request
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, LoginManager, login_user, login_required, logout_user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.secret_key = 'secret_key_here'
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and user.password == password:
            login_user(user)
            return redirect(url_for('dashboard'))
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

if __name__ == "__main__":

    app.run(debug=True)



import plotly.graph_objects as go
import requests
import json

def get_weather_data(latitude, longitude):
    # Fetch weather data from a weather API, e.g., OpenWeatherMap
    api_key = "your_api_key_here"
    url = f"http://api.openweathermap.org/data/2.5/onecall?lat={latitude}&lon={longitude}&exclude=hourly,daily&appid={api_key}"
    response = requests.get(url)
    return response.json()

def create_weather_graph(data):
    humidity = data['current']['humidity']
    temp = data['current']['temp']
    pressure = data['current']['pressure']

    # Create a Plotly graph
    fig = go.Figure()

    fig.add_trace(go.Bar(x=['Humidity'], y=[humidity], name='Humidity'))
    fig.add_trace(go.Bar(x=['Temperature'], y=[temp], name='Temperature'))
    fig.add_trace(go.Bar(x=['Pressure'], y=[pressure], name='Pressure'))

    fig.update_layout(title='Weather Data Visualization', barmode='group')
    return fig

# Example of fetching weather data based on user geolocation (latitude, longitude)
latitude = 40.7128
longitude = -74.0060  # Example coordinates for New York
weather_data = get_weather_data(latitude, longitude)
fig = create_weather_graph(weather_data)
fig.show()


def get_plant_suggestions(temp, humidity, light_level):
    if temp > 30:
        suggestion = "Consider moving your plants to a cooler place."
    elif humidity < 40:
        suggestion = "Increase humidity by misting your plants."
    elif light_level < 3:
        suggestion = "Your plants may need more sunlight or artificial light."
    else:
        suggestion = "Your plant environment looks good!"

    return suggestion

# Example usage
temp = 28  # Temperature in Celsius
humidity = 45  # Humidity in percentage
light_level = 2  # 1-5 scale (1 is low, 5 is high)

suggestion = get_plant_suggestions(temp, humidity, light_level)
print(suggestion)


import folium

def create_map(latitude, longitude, nearby_crops):
    # Initialize the map centered at the user's geolocation
    user_map = folium.Map(location=[latitude, longitude], zoom_start=12)

    # Add a marker for the user
    folium.Marker([latitude, longitude], popup="Your Location").add_to(user_map)

    # Add markers for nearby crops (list of crop locations)
    for crop in nearby_crops:
        folium.Marker([crop['latitude'], crop['longitude']], popup=crop['name']).add_to(user_map)

    return user_map

# Example of nearby crops
nearby_crops = [
    {'name': 'Farm A', 'latitude': 40.730610, 'longitude': -73.935242},
    {'name': 'Farm B', 'latitude': 40.730000, 'longitude': -73.940000}
]

user_map = create_map(40.7128, -74.0060, nearby_crops)
user_map.save('map.html')
