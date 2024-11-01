# Generated by Django 5.1.2 on 2024-10-24 18:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("payments", "0035_payment_draft_invoice_payment_paid_invoice"),
    ]

    operations = [
        migrations.AlterField(
            model_name="payment",
            name="currency",
            field=models.IntegerField(
                choices=[(0, "EUR"), (1, "BTC"), (2, "USD"), (3, "CZK"), (4, "GBP")],
                default=0,
            ),
        ),
    ]