# Generated by Django 4.2.7 on 2024-06-21 04:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='bio',
            field=models.CharField(blank=True, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='fullname',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
