# Generated by Django 5.1.2 on 2024-10-24 06:24

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("payments", "0033_alter_customer_address_alter_customer_address_2_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="payment",
            name="draft_invoice",
        ),
        migrations.RemoveField(
            model_name="payment",
            name="paid_invoice",
        ),
    ]