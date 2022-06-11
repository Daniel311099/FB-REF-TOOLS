from django.contrib import admin
from django.urls import path, include

from .views import StandardFrameView, FrameIds, CustomFrameView

urlpatterns =[
        path('<str:frame_id>/<int:rows>', StandardFrameView.as_view(), name="stats for year"),
        path('frame_ids', FrameIds.as_view()),
        path('custom', CustomFrameView.as_view()),
]