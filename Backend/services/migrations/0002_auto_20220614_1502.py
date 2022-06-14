# Generated by Django 3.2.13 on 2022-06-14 10:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('services', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('PostID', models.AutoField(db_column='PostID', primary_key=True, serialize=False)),
                ('value', models.CharField(db_column='value', max_length=255, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserPost',
            fields=[
                ('UserPostID', models.AutoField(db_column='UserPostID', primary_key=True, serialize=False)),
                ('PostID', models.ForeignKey(db_column='PostID', on_delete=django.db.models.deletion.DO_NOTHING, to='services.post')),
                ('UserID', models.ForeignKey(db_column='UserID', on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='PostType',
        ),
    ]