# Generated by Django 4.2.2 on 2023-08-08 11:12

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("weblate_web", "0024_package_limit_hosted_words_report_hosted_words_and_more"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="subscription",
            options={
                "verbose_name": "Customer’s subscription",
                "verbose_name_plural": "Customer’s subscriptions",
            },
        ),
    ]