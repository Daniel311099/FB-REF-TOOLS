from django.urls import path, include, re_path
from .views import index
import re

urlpatterns = [
    re_path(r'^(?:.*)/?$', index),
]
