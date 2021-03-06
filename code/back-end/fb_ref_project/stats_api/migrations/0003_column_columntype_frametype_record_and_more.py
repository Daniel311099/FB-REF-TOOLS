# Generated by Django 4.0.3 on 2022-03-30 12:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('stats_api', '0002_alter_standardstats_frame_alter_standardstats_player_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Column',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('column_id', models.CharField(max_length=100)),
                ('records_added', models.BooleanField(default=False, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='ColumnType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('data_type', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='FrameType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('subject', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('record_id', models.CharField(max_length=100)),
                ('int_value', models.IntegerField(null=True)),
                ('float_value', models.FloatField(null=True)),
                ('str_value', models.CharField(max_length=100, null=True)),
                ('column', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='column_records', to='stats_api.column')),
                ('player', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='player_records', to='stats_api.player')),
            ],
        ),
        migrations.RemoveField(
            model_name='standardstats',
            name='frame',
        ),
        migrations.RemoveField(
            model_name='standardstats',
            name='player',
        ),
        migrations.RemoveField(
            model_name='frame',
            name='subject',
        ),
        migrations.AddField(
            model_name='frame',
            name='records_added',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AddField(
            model_name='frame',
            name='year',
            field=models.IntegerField(null=True),
        ),
        migrations.DeleteModel(
            name='ShootingStats',
        ),
        migrations.DeleteModel(
            name='StandardStats',
        ),
        migrations.AddField(
            model_name='column',
            name='column_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='column_type_columns', to='stats_api.columntype'),
        ),
        migrations.AddField(
            model_name='column',
            name='frame',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='frame_columnss', to='stats_api.frame'),
        ),
        migrations.AlterField(
            model_name='frame',
            name='frame_type',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='frame_type_frames', to='stats_api.frametype'),
        ),
    ]
