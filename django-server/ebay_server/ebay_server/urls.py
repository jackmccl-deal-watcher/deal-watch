"""
URL configuration for ebay_server project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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

from django.contrib import admin
from django.urls import path

from ebay_notifs import views as ebay_notifs_views
from ebay_api import views as ebay_api_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/ebay_notif', ebay_notifs_views.ebay_notif_handler),
    path('api/ebay_api/get_listings', ebay_api_views.get_listings)
]
