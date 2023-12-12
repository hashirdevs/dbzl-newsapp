from django.urls import path
from .views import NewsAPIView

urlpatterns = [
    path('<str:query>/<str:language>/', NewsAPIView.as_view(), name='news-api'),
]