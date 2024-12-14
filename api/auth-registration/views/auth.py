from . import app_views

@app_views.route("/register", method=('GET'), strict_slashes=False)
def register():
    """
        retrieve
        user email
        user password
        and store in database
    """
