from .models import Note
from .serializers import NoteSerializer


def get_notes_list(request):
    notes = Note.objects.filter(
        user=request.query_params['pk']
        ).order_by('-updated')

    serializer = NoteSerializer(notes, many=True)
    return serializer.data


def create_note_detail(request):
    data = request.data
    note = Note.objects.create(
        body=data['body'],
        user_id=data['user'],
    )
    serializer = NoteSerializer(note, many=False)
    return serializer.data


def get_note_detail(request, pk):
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, many=False)
    return serializer.data


def update_note_detail(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return serializer.data


def delete_note_detail(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return ('Note was deleted')
