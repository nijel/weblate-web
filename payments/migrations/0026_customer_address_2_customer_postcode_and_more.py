# Generated by Django 5.0.6 on 2024-07-11 11:52

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("payments", "0025_alter_payment_uuid"),
    ]

    operations = [
        migrations.AddField(
            model_name="customer",
            name="address_2",
            field=models.CharField(
                blank=True,
                max_length=200,
                null=True,
                verbose_name="Additional address information",
            ),
        ),
        migrations.AddField(
            model_name="customer",
            name="postcode",
            field=models.CharField(max_length=20, null=True, verbose_name="Postcode"),
        ),
        migrations.AlterField(
            model_name="customer",
            name="city",
            field=models.CharField(max_length=200, null=True, verbose_name="City"),
        ),
    ]