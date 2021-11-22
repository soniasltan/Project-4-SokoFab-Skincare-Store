from .models import Product
from rest_framework import viewsets, permissions
from .serializers import ProductsSerializer

class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, permissions, status
from django.contrib.auth.models import User
from .serializers import TokenSerializer
from django.contrib.auth import authenticate, login
from rest_framework.response import Response

# class LoginView(generics.ListCreateAPIView):
#     """
#     POST user/login/
#     """

#     # This permission class will overide the global permission class setting
#     # Permission checks are always run at the very start of the view, before any other code is allowed to proceed.
#     # The permission class here is set to AllowAny, which overwrites the global class to allow anyone to have access to login.
#     permission_classes = (permissions.AllowAny, )
#     serializer_class = UserSerializer
#     queryset = User.objects.all()

#     def post(self, request, *args, **kwargs):
#         username = request.data.get("username", "")
#         password = request.data.get("password", "")
#         user = authenticate(request, username=username, password=password)
#         if user is not None:
#             # login saves the user’s ID in the session,
#             # using Django’s session framework.
#             login(request, user)
#             refresh = RefreshToken.for_user(user)
#             serializer = TokenSerializer(
#                 data={
#                     # using DRF JWT utility functions to generate a token
#                     "token": str(refresh.access_token)
#                 })
#             serializer.is_valid()
#             return Response(serializer.data)
#         return Response(status=status.HTTP_401_UNAUTHORIZED)
