from django.db import models


class Note(models.Model):
    user = models.ForeignKey('userApi.UserAccount', on_delete=models.CASCADE)
    body = models.TextField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.body[:50]
