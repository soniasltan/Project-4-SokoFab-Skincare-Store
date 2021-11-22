from django.urls import path
from .views import CreateUserView

app_name = "user"

urlpatterns = [
    path("signup/", CreateUserView.as_view(), name="create_user")
]