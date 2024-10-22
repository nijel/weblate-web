# Generated by Django 5.1.2 on 2024-10-22 11:48

import django.db.models.expressions
import django.db.models.functions.comparison
import django.db.models.functions.datetime
import django.db.models.functions.text
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("invoices", "0004_invoice_number"),
    ]

    operations = [
        migrations.AlterField(
            model_name="invoice",
            name="currency",
            field=models.IntegerField(choices=[(0, "EUR"), (1, "CZK")], default=0),
        ),
        migrations.AlterField(
            model_name="invoice",
            name="number",
            field=models.GeneratedField(
                db_persist=True,
                expression=django.db.models.functions.text.Concat(
                    django.db.models.functions.comparison.Cast(
                        "kind", models.CharField()
                    ),
                    django.db.models.functions.comparison.Cast(
                        django.db.models.expressions.CombinedExpression(
                            django.db.models.functions.datetime.Extract(
                                "issue_date", "year"
                            ),
                            "%%",
                            models.Value(2000),
                        ),
                        models.CharField(),
                    ),
                    django.db.models.functions.text.LPad(
                        django.db.models.functions.comparison.Cast(
                            "sequence", models.CharField()
                        ),
                        6,
                        models.Value("0"),
                    ),
                ),
                output_field=models.CharField(max_length=20),
                unique=True,
            ),
        ),
    ]
