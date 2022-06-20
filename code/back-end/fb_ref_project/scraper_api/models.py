from django.db import models


class TestModel(models.Model):
    data = models.TextField(max_length=65534, null=True)