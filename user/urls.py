from django.urls import path
from .views import BlacklistTokenView, CreateUserView
from user import views

app_name = "user"

urlpatterns = [
    path("signup/", CreateUserView.as_view(), name="create_user"),
    path("logout/blacklist/", BlacklistTokenView.as_view(), name="blacklist"),
    path("account/",views.account, name="show_account")
]