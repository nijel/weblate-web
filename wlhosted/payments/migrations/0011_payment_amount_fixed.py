# Generated by Django 1.11.16 on 2018-11-27 13:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [("payments", "0010_auto_20181127_1307")]

    operations = [
        migrations.AddField(
            model_name="payment",
            name="amount_fixed",
            field=models.BooleanField(default=False, blank=True),
        )
    ]
