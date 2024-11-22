# Generated by Django 5.1.3 on 2024-11-19 08:58

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("payments", "0037_alter_customer_vat"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customer",
            name="tax",
            field=models.CharField(
                blank=True,
                help_text="Please fill in your company registration number if it should appear on the invoice.",
                max_length=200,
                verbose_name="Company identification number",
            ),
        ),
    ]