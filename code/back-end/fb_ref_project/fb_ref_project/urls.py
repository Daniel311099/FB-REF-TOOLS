"""fb_ref_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import re
from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users_api/', include('users.urls')),
    path('stats_api/', include('stats_api.urls')),
    path('scraper_api/', include('scraper_api.urls')),
    path('custom_tables/', include('custom_tables.urls')),
    path('api/', include('api.urls')),
    # re_path(r'^(?:.*)/?$', include('frontend.urls')),
]
