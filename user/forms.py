from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate

from user.models import User

class SignupForm(UserCreationForm):
    username = forms.CharField(max_length=30, help_text="Please add a username.")
    email = forms.EmailField(max_length=255, help_text="Please add a valid email address.")
    first_name = forms.CharField(max_length=50, help_text="Please add your first name.")
    last_name = forms.CharField(max_length=50, help_text="Please add your last name.")
    class Meta:
        model = User
        fields = ("username", "email", "first_name", "last_name", "password")

    def clean_email(self):
        email = self.cleaned_data["email"].lower()
        try:
            user = User.objects.get(email=email)
        except Exception as e:
            return email
        raise forms.ValidationError(f"Email {email} is already in use")

