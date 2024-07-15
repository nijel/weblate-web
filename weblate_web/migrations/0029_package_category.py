# Generated by Django 5.0.6 on 2024-07-15 08:25

from django.db import migrations, models

from weblate_web.models import PackageCategory


def update_category(apps, schema_editor):
    Package = apps.get_model("weblate_web", "Package")

    for package in Package.objects.all():
        if package.name.startswith("hosted:"):
            package.category = PackageCategory.PACKAGE_DEDICATED
        elif package.name.startswith("shared:"):
            package.category = PackageCategory.PACKAGE_SHARED
        elif package.name in {"basic", "extended", "premium", "backup"}:
            package.category = PackageCategory.PACKAGE_SUPPORT
        else:
            print(f"Warning: no package category for {package.name}!")  # noqa: T201
        package.save(update_fields=["category"])


class Migration(migrations.Migration):
    dependencies = [
        ("weblate_web", "0028_subscription_package_link"),
    ]

    operations = [
        migrations.AddField(
            model_name="package",
            name="category",
            field=models.IntegerField(
                choices=[
                    (0, "None"),
                    (10, "Dedicated hosting"),
                    (20, "Shared hosting"),
                    (30, "Self-hosted support"),
                ],
                default=0,
            ),
        ),
        migrations.RunPython(update_category, migrations.RunPython.noop, elidable=True),
    ]
