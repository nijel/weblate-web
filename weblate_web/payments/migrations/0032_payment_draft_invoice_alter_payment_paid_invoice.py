# Generated by Django 5.1.2 on 2024-10-18 09:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("invoices", "0002_alter_invoice_customer_alter_invoice_discount_and_more"),
        ("payments", "0031_alter_payment_customer_alter_payment_paid_invoice_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="payment",
            name="draft_invoice",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="draft_payment_set",
                to="invoices.invoice",
            ),
        ),
        migrations.AlterField(
            model_name="payment",
            name="paid_invoice",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="paid_payment_set",
                to="invoices.invoice",
            ),
        ),
    ]