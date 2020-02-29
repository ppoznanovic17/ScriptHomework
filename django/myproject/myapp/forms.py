from django.forms import ModelForm

from .models import Theme
from .models import Comment

class ThemeForm(ModelForm):
    class Meta:
        model = Theme
        fields =[ 'title', 'content']

class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['content']