from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.

class User(AbstractUser):
    email       = models.EmailField(unique=True)

    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self) -> str:
        return self.username


class Profile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE, related_name='user_profile')
    fullname    = models.CharField(max_length=250, blank=True, null=True)
    bio         = models.CharField(max_length=400, blank=True, default='Bio', null=True)
    image       = models.ImageField(upload_to='profile_pic', default='profile_pic/default.png', blank=True, null=True)
    verified    = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.fullname
    

# Signals to create or update profile when user is created or updated
@receiver(post_save, sender=User) 
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    else:
        instance.user_profile.save()
  
@receiver(post_save, sender=User) 
def save_profile(sender, instance, **kwargs):
        instance.user_profile.save()