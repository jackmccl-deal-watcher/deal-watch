from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.urls import path
from rest_framework.decorators import api_view
from django.conf import settings

import datetime
from ebaysdk.exception import ConnectionError
from ebaysdk.finding import Connection

# Create your views here.
@api_view(['GET'])
def get_listings(request):
    
    return JsonResponse(item, status=200, safe=False)