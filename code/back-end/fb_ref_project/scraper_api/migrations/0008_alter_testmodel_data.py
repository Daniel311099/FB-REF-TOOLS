# Generated by Django 4.0.3 on 2022-06-15 23:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scraper_api', '0007_alter_testmodel_data'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testmodel',
            name='data',
            field=models.TextField(max_length=60000, null=True),
        ),
    ]
