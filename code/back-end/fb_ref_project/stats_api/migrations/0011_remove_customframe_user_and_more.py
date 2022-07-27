# Generated by Django 4.0.3 on 2022-06-29 13:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('stats_api', '0010_column_name'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customframe',
            name='user',
        ),
        migrations.RemoveField(
            model_name='customplayer',
            name='custom_frame',
        ),
        migrations.RemoveField(
            model_name='customplayer',
            name='player',
        ),
        migrations.DeleteModel(
            name='CustomColumn',
        ),
        migrations.DeleteModel(
            name='CustomColumnType',
        ),
        migrations.DeleteModel(
            name='CustomFrame',
        ),
        migrations.DeleteModel(
            name='CustomPlayer',
        ),
    ]