from django.urls import path

from .views import CustomColumnView, CustomTableView

urlpatterns = [
    path('column', CustomColumnView.as_view()),
    path('table', CustomTableView.as_view()),
]