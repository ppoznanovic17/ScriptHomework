from django.shortcuts import render, redirect
from .models import User, Comment, Theme
from django.db.models import Avg, Max, Min, Count
from collections import Counter
from .forms import  ThemeForm
import operator



def index(request):
    '''
    Statistical data:
    '''

    avgCommentLikes = Comment.objects.all().aggregate(Avg('likes'))['likes__avg']
    avgCommentDislikes = Comment.objects.all().aggregate(Avg('dislikes'))['dislikes__avg']
    avgThemeLikes = Theme.objects.all().aggregate(Avg('likes'))['likes__avg']
    avgThemeDislikes = Comment.objects.all().aggregate(Avg('dislikes'))['dislikes__avg']

    themeCount = Theme.objects.all().count()
    commentCount = Comment.objects.all().count()
    avgCommentPerTheme = commentCount / themeCount

    maximumLikesComment = Comment.objects.all().aggregate(Max('likes'))['likes__max']
    commentWithMaxLikes = Comment.objects.get(likes=maximumLikesComment)
    owner3 = User.objects.all().filter(id=commentWithMaxLikes.user_id).first()

    maximumLikesTheme = Theme.objects.all().aggregate(Max('likes'))['likes__max']
    themeWithMaxLikes = Theme.objects.get(likes=maximumLikesTheme)
    owner2 = User.objects.all().filter(id=themeWithMaxLikes.user_id).first()


    minLikesTheme = Theme.objects.all().aggregate(Min('likes'))['likes__min']
    themeWithMinLikes = Theme.objects.get(likes=minLikesTheme)

    minLikesComment = Comment.objects.all().aggregate(Min('likes'))['likes__min']
    commentWithMinLikes = Comment.objects.get(likes=minLikesComment)

    ownerIdWithMostComments = Counter(Comment.objects.values_list('user_id', flat=True)).most_common(1).pop(
        0).__getitem__(0)
    ownerMostCommentsNum = Counter(Comment.objects.values_list('user_id', flat=True)).most_common(1).pop(0).__getitem__(
        1)
    owner = User.objects.all().filter(id=ownerIdWithMostComments).first()






    themeIdWithMostComments = Counter(Comment.objects.values_list('theme_id', flat=True)).most_common(1).pop(
        0).__getitem__(0)
    themeWithMostCommentsNum = Counter(Comment.objects.values_list('theme_id', flat=True)).most_common(1).pop(
        0).__getitem__(1)
    mostCommentedTheme = Theme.objects.all().filter(id=themeIdWithMostComments).first()

    themeIdWithMostComments2 = Counter(Comment.objects.values_list('theme_id', flat=True)).most_common(3).pop(
        1).__getitem__(0)
    themeWithMostCommentsNum2 = Counter(Comment.objects.values_list('theme_id', flat=True)).most_common(3).pop(
        1).__getitem__(1)
    mostCommentedTheme2 = Theme.objects.all().filter(id=themeIdWithMostComments).first()

    themeIdWithMostComments3 = Counter(Comment.objects.values_list('theme_id', flat=True)).most_common(3).pop(
        2).__getitem__(0)
    themeWithMostCommentsNum3 = Counter(Comment.objects.values_list('theme_id', flat=True)).most_common(3).pop(
        2).__getitem__(1)
    mostCommentedTheme3 = Theme.objects.all().filter(id=themeIdWithMostComments).first()





    context = {
        "avgCommentLikes": avgCommentLikes,
        "avgCommentDislikes": avgCommentDislikes,
        "avgThemeLikes": avgThemeLikes,
        "avgThemeDislikes": avgThemeDislikes,

        "themeCount": themeCount,
        "commentCount": commentCount,
        "avgCommentPerTheme": avgCommentPerTheme,

        "maximumLikesComment": maximumLikesComment,
        "commentWithMaxLikes": commentWithMaxLikes,

        "maximumLikesTheme": maximumLikesTheme,
        "themeWithMaxLikes": themeWithMaxLikes,

        "minLikesTheme": minLikesTheme,
        "themeWithMinLikes": themeWithMinLikes,

        "minLikesComment" : minLikesComment,
        "commentWithMinLikes" : commentWithMinLikes,

        "ownerIdWithMostComments": ownerIdWithMostComments,
        "ownerMostCommentsNum": ownerMostCommentsNum,
        "owner": owner,
        "owner2": owner2,
        "owner3": owner3,




        "themeIdWithMostComments": themeIdWithMostComments,
        "themeWithMostCommentsNum": themeWithMostCommentsNum,
        "mostCommentedTheme": mostCommentedTheme,

        "themeIdWithMostComments2": themeIdWithMostComments2,
        "themeWithMostCommentsNum2": themeWithMostCommentsNum2,
        "mostCommentedTheme2": mostCommentedTheme2,

        "themeIdWithMostComments3": themeIdWithMostComments3,
        "themeWithMostCommentsNum3": themeWithMostCommentsNum3,
        "mostCommentedTheme3": mostCommentedTheme3




    }

    return render(request, 'index.html', context)


def users(request):
    users = User.objects.all()

    context = {
        'users': users
    }
    return render(request, 'users.html', context)


def themes(request):
    themes = Theme.objects.order_by('likes')

    context = {
        'themes': themes
    }
    return render(request, 'themes.html', context)


def comments(request):
    comments = Comment.objects.order_by('-likes')

    context = {
        'comments': comments
    }
    return render(request, 'comments.html', context)

def deleteUser(req, id):
    User.objects.get(id=id).delete()
    return redirect('/u/')

def editTheme(req, id):
    if(req.method== 'POST'):
        theme = Theme.objects.get(id=id)
        form = ThemeForm(req.POST, instance=theme)
        if form.is_valid():
            theme.title = form.cleaned_data['title']
            theme.content = form.cleaned_data['content']
            theme.save()
            return redirect('/t/')
        else:
            return redirect('/')
    else:
        tsk = Theme.objects.get(id=id)
        form = ThemeForm(instance=tsk)
        return render(req, 'editTheme.html', {'form': form, 'id': id})
