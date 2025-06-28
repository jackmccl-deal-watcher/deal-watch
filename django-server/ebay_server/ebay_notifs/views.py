from django.shortcuts import render
from django.http import HttpResponse
from django.urls import path
from rest_framework.decorators import api_view

# Create your views here.

# Endpoint to recieve challenge response and response 200 OK to deletion requests
@api_view(['GET'])
def ebay_notif_handler():
    return