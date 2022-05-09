from django.shortcuts import redirect, render, get_list_or_404, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from .models import Note
from .forms import NoteForm

# Create your views here.


def index(request):
    query_offset = int(request.GET.get('offset', 0))
    pagination_offset = 4
    notes = Note.objects.all()[query_offset:query_offset+pagination_offset]
    count = Note.objects.count()
    pagination_btns = []
    for btn in range(int(count / pagination_offset)):
        pagination_btns.append(btn+1)
    context = {'notes': notes, 'pagination_buttons': pagination_btns}
    return render(request, 'notes/index.html', context)


def create_note(request):
    if request.method == 'POST':
        form = NoteForm(request.POST)
        if form.is_valid():
            text = form.cleaned_data['text']
            try:
                Note(text=text).save()
                return HttpResponseRedirect('/')
            except:
                return HttpResponse(status=404)
    else:
        form = NoteForm()
    return render(request, 'notes/form.html', {'form': form})


def delete_note(request, note_id):
    if request.method == 'DELETE':
        note = get_object_or_404(Note, pk=note_id)
        note.delete()
        return HttpResponse(status=200)
