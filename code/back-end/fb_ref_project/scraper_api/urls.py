from django.contrib import admin
from django.urls import path, include

from .views import AddFrame, TestView

urlpatterns = [
        path('', AddFrame.as_view(), name="stats for year"),
        path('stats', TestView.as_view())
]