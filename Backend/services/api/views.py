import socket

import requests
from django.contrib.auth.models import User
from dynamic_rest import viewsets
from rest_framework import generics, permissions
from rest_framework.response import Response
from services.api import serializers
from services import models
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.RegisterSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = serializers.MyTokenObtainPairSerializer


def visitor_ip_address(request):
    # sourcery skip: assign-if-exp, inline-immediately-returned-variable, use-named-expression
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        return x_forwarded_for.split(",")[0]
    else:
        return request.META.get("REMOTE_ADDR")


def CheckValidIP(ip):
    try:
        socket.inet_aton(ip)
        ip_valid = True
    except socket.error:
        ip_valid = False
    return ip_valid


def IPBasedLocation(ip, data):
    if data.get("countryCode", None) is None:
        data = requests.get(f"http://ip-api.com/json/{ip}")
        data = data.json()
    CountryCode = data.get("countryCode", None)
    CountryName = data.get("country", None)
    CountryDisplayName = data.get("country", None)
    SubdivisonCode = data.get("region", None)
    CityName = data.get("city", None)
    ip = data.get("query", None)
    SubdivisonName = data.get("regionName", None)
    TimeZoneName = data.get("timezone", None)
    return (
        CountryCode,
        CountryName,
        CountryDisplayName,
        TimeZoneName,
        SubdivisonCode,
        SubdivisonName,
        CityName,
        ip,
    )


def CityCreateOrUpdate(
    CountryCode,
    CountryName,
    CountryDisplayName,
    TimeZoneName,
    SubdivisonCode,
    SubdivisonName,
    CityName,
):
    return models.City.objects.get_or_create(
        CountryCode=models.Country.objects.get_or_create(
            CountryCode=CountryCode,
            CountryName=CountryName,
            CountryDisplayName=CountryDisplayName,
            TimeZoneName=TimeZoneName or None,
        )[0],
        CountrySubdivisionCode=models.CountrySubdivision.objects.get_or_create(
            SubdivisonCode=SubdivisonCode,
            CountryCode=models.Country.objects.get(CountryCode=CountryCode),
            CountrySubdivisionCode=f"{CountryCode}-{SubdivisonCode}",
            CountrySubdivisionName=SubdivisonName,
            CountrySubdivisionDisplayName=SubdivisonName,
        )[0],
        CityName=CityName,
    )


class CountryViewSet(viewsets.DynamicModelViewSet):
    """
    Country API.
    """

    queryset = models.Country.objects.all()
    serializer_class = serializers.CountrySerializer


class ApplicationLoginActivityViewSet(viewsets.DynamicModelViewSet):
    queryset = models.ApplicationLoginActivity.objects.all().order_by(
        "-LoginTimestamp"
    )
    serializer_class = serializers.ApplicationLoginActivitySerializer

    def create(self, request):
        """
        Required Fields
        ---------------
            username as username  \n
        """
        username = request.data.get("username", None)
        ip = request.data.get("ip", None)
        if ip is None:
            ip = visitor_ip_address(request)
        (
            CountryCode,
            CountryName,
            CountryDisplayName,
            TimeZoneName,
            SubdivisonCode,
            SubdivisonName,
            CityName,
            ip,
        ) = IPBasedLocation(ip, request.data)

        if CityName:
            City = CityCreateOrUpdate(
                CountryCode,
                CountryName,
                CountryDisplayName,
                TimeZoneName,
                SubdivisonCode,
                SubdivisonName,
                CityName,
            )
        models.ApplicationLoginActivity.objects.create(
            UserID=User.objects.get(username=username) if username else None,
            IPAddress=ip,
            CityID=City[0] if CityName else None,
        )
        return Response(request.data, status=201)


class UserPostViewSet(viewsets.DynamicModelViewSet):
    queryset = models.UserPost.objects.all()
    serializer_class = serializers.UserPostSerializer

    def create(self, request):
        """
        Required Fields
        ---------------
            username as username  \n
            post as postValue  \n
        """
        username = request.data.get("username", None)
        postValue = request.data.get("postValue", None)
        if username is None or postValue is None:
            return Response(
                {"error": "Missing username or postValue"}, status=400
            )
        try:
            models.UserPost.objects.get(
                UserID=User.objects.get(username=username),
                PostID=models.Post.objects.get_or_create(value=postValue)[0],
            ).delete()
        except models.UserPost.DoesNotExist:
            models.UserPost.objects.create(
                UserID=User.objects.get(username=username),
                PostID=models.Post.objects.get_or_create(value=postValue)[0],
            )
        return Response(request.data, status=201)


class PostViewSet(viewsets.DynamicModelViewSet):
    queryset = models.Post.objects.all()
    serializer_class = serializers.PostSerializer
