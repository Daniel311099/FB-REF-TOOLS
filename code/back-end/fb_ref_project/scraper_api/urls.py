from django.urls import path

from .views import AddFrame, TestView

urlpatterns = [
        path('', AddFrame.as_view(), name="stats for year"),
        path('stats', TestView.as_view())
]