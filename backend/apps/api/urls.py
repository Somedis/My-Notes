from django.urls import path
from .views import (get_routes, get_notes, get_note)


urlpatterns = [
    path('', get_routes, name='routes'),
    path('notes/', get_notes, name='notes'),

    path('notes/<str:pk>/', get_note, name='note')
]
