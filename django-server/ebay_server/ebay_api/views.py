from django.shortcuts import render
from django.http import HttpResponse
from django.urls import path
from rest_framework.decorators import api_view

# Create your views here.
@api_view('GET')
def get_listings():
    return