from django import forms


class NoteForm(forms.Form):
    text = forms.CharField(widget=forms.Textarea,
                           label='Text Note', max_length=300)
