from django import forms
from django.core import validators


class NoteForm(forms.Form):
    title = forms.CharField(validators=[validators.MaxLengthValidator(
        100, "The title can't be longer than 100 characters")],
        widget=forms.TextInput,
        label="Note title")
    text = forms.CharField(
        validators=[validators.MinLengthValidator(
            2, "Please enter a note at least 2 characters long.")],
        widget=forms.Textarea,
        label='Text Note', max_length=300)
