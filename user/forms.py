# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth import authenticate

# from user.models import User

# class SignupForm(UserCreationForm):
#     username = forms.CharField(max_length=30, help_text="Please add a username.")
#     email = forms.EmailField(max_length=255, help_text="Please add a valid email address.")
#     first_name = forms.CharField(max_length=50, help_text="Please add your first name.")
#     last_name = forms.CharField(max_length=50, help_text="Please add your last name.")
#     password = forms.CharField(min_length=6, label='Password', widget=forms.PasswordInput, help_text="Please add a password (min 6 chars).")
#     class Meta:
#         model = User
#         fields = ("username", "email", "first_name", "last_name", "password")

#     def clean_username(self):
#         username = self.cleaned_data["username"].lower()
#         try:
#             user = User.objects.get(username=username)
#         except Exception as e:
#             return username
#         raise forms.ValidationError(f"Username {username} is already in use")
    
#     def clean_email(self):
#         email = self.cleaned_data["email"].lower()
#         try:
#             user = User.objects.get(email=email)
#         except Exception as e:
#             return email
#         raise forms.ValidationError(f"Email {email} is already in use")

