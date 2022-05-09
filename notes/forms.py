from django import forms
from django.core import validators


class NoteForm(forms.Form):
    text = forms.CharField(
        validators=[validators.MinLengthValidator(
            2, "Please enter a note at least 2 characters long.")],
        widget=forms.Textarea,
        label='Text Note', max_length=300)
