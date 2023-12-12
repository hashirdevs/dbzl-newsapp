from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
import requests
from datetime import datetime, timedelta

class NewsAPIView(APIView):
    def get(self, request, **kwargs):
        query = self.kwargs.get('query')
        language = self.kwargs.get('language')
        seven_days_ago = datetime.now() - timedelta(days=7)

        endpoint = "https://newsapi.org/v2/everything"

        params = {
            'q': query,
            'from': seven_days_ago.strftime('%Y-%m-%d'),
            'sortBy': 'publishedAt',
            'language': language,
            'apiKey':settings.NEWS_API_KEY,
        }

        response = requests.get(endpoint, params=params).json()
        articles = response.get('articles', [])
        return Response(articles)
