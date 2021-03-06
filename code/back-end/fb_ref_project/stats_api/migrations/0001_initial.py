# Generated by Django 4.0.3 on 2022-03-07 21:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Frame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frame_id', models.CharField(max_length=100)),
                ('comp', models.CharField(max_length=100)),
                ('frame_type', models.CharField(max_length=100)),
                ('subject', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Player',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('player_id', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='UserFrame',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('frame', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='frame_users', to='stats_api.frame')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_frames', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StandardStats',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('record_id', models.CharField(max_length=100)),
                ('games_starts', models.IntegerField()),
                ('minutes', models.IntegerField()),
                ('goals', models.IntegerField()),
                ('assists', models.IntegerField()),
                ('xg', models.FloatField()),
                ('xa', models.FloatField()),
                ('frame', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='frame_set', to='stats_api.frame')),
                ('player', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='record_set', to='stats_api.player')),
            ],
        ),
    ]
