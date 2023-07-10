from rest_framework.response import Response
from rest_framework.decorators import api_view

from .utils import (get_notes_list, create_note_detail, get_note_detail,
                    update_note_detail, delete_note_detail)


@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request' # noqa
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
def get_notes(request):
    if request.method == 'GET':
        response = get_notes_list(request)
        return Response(response)

    if request.method == 'POST':
        response = create_note_detail(request)
        return Response(response)


@api_view(['GET', 'PUT', 'DELETE'])
def get_note(request, pk):
    if request.method == 'GET':
        response = get_note_detail(request, pk)
        return Response(response)

    if request.method == 'PUT':
        response = update_note_detail(request, pk)
        return Response(response)

    if request.method == 'DELETE':
        response = delete_note_detail(request, pk)
        return Response(response)
