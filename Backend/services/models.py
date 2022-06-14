from django.db import models
from django.contrib.auth.models import User


# model for Post Types
class Post(models.Model):
    PostID = models.AutoField(primary_key=True, db_column="PostID")
    value = models.CharField(
        max_length=255, db_column="value", unique=True, blank=False
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class meta:
        db_table = "Post"


class UserPost(models.Model):
    UserPostID = models.AutoField(primary_key=True, db_column="UserPostID")
    UserID = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, db_column="UserID"
    )
    PostID = models.ForeignKey(
        Post, on_delete=models.DO_NOTHING, db_column="PostID"
    )

    class meta:
        db_table = "UserPost"
        constraints = [
            models.UniqueConstraint(
                fields=["UserID", "PostID"], name="AK_UserPost"
            )
        ]


class Country(models.Model):
    CountryCode = models.CharField(
        db_column="CountryCode", max_length=2, primary_key=True
    )
    CountryName = models.CharField(db_column="CountryName", max_length=80)
    CountryDisplayName = models.CharField(
        db_column="CountryDisplayName", max_length=80
    )
    TimeZoneName = models.CharField(
        db_column="TimeZoneName", max_length=80, null=True
    )

    class Meta:
        db_table = "Country"


class CountrySubdivision(models.Model):
    CountrySubdivisionCode = models.CharField(
        db_column="CountrySubdivisionCode", max_length=6, primary_key=True
    )
    CountryCode = models.ForeignKey(
        Country,
        on_delete=models.DO_NOTHING,
        db_column="CountryCode",
    )
    SubdivisonCode = models.CharField(db_column="SubdivisonCode", max_length=3)
    CountrySubdivisionName = models.CharField(
        db_column="CountrySubdivisionName", max_length=80
    )
    CountrySubdivisionDisplayName = models.CharField(
        db_column="CountrySubdivisionDisplayName", max_length=80
    )

    def __str__(self):
        return self.CountrySubdivisionName

    class Meta:
        db_table = "CountrySubdivision"
        unique_together = (("CountryCode", "SubdivisonCode"),)


class City(models.Model):
    CityID = models.AutoField(db_column="CityID", primary_key=True)
    CountryCode = models.ForeignKey(
        Country,
        on_delete=models.DO_NOTHING,
        db_column="CountryCode",
    )
    CountrySubdivisionCode = models.ForeignKey(
        CountrySubdivision,
        db_column="CountrySubdivisionCode",
        on_delete=models.DO_NOTHING,
    )
    CityName = models.CharField(db_column="CityName", max_length=200)

    class Meta:
        db_table = "City"


class ApplicationLoginActivity(models.Model):
    ApplicationLoginActivityID = models.AutoField(
        db_column="ApplicationLoginActivityID", primary_key=True
    )
    UserID = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, db_column="UserID", null=True
    )
    CityID = models.ForeignKey(
        City,
        on_delete=models.DO_NOTHING,
        db_column="CityID",
        null=True,
    )
    IPAddress = models.CharField(db_column="IPAddress", max_length=39)
    LoginTimestamp = models.DateTimeField(
        auto_now_add=True, db_column="LoginTimestamp"
    )

    class Meta:
        db_table = "ApplicationLoginActivity"
