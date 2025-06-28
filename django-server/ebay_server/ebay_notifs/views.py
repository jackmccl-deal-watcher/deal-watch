from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.urls import path
from rest_framework.decorators import api_view
import hashlib

# Create your views here.

# Endpoint to recieve challenge response and response 200 OK to deletion requests
@api_view(['GET'])
def ebay_notif_handler(request):
    if "challenge_code" in request.GET.dict():
        challengeCode = request.GET.get('challenge_code')
        endpoint = "http://127.0.0.1:8000/api/ebay_notifs"
        verificationToken = "879878121345134523452345234523452354"
        challengeResponse = hashlib.sha256(challengeCode.encode()+verificationToken.encode()+endpoint.encode())
        print(challengeResponse.hexdigest())
        data = {
            "challengeResponse": challengeResponse.hexdigest(),
        }
        print(data)
        return JsonResponse(data, status=200)
    else:
        return HttpResponse(status=200)