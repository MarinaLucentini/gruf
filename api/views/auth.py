from . import app_views

@app_views.route("/register", methods=('GET'), strict_slashes=False)
def register():
    """
        retrieve
        user email
        user password
        and store in database
    """


@app_views.route("/Login", methods=('GET'), strict_slashes=False)
def authenticate():
    """
        retrieve user email, password
        checks if email is correct, then
        compares password with the existing
        password
    """