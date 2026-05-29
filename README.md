# Sandes Ancestry

A private family genealogy site built on Drupal 11, tracking the Sandes family history.

## Stack

- **CMS:** Drupal 11
- **PHP:** 8.4
- **Database:** MariaDB 11.8
- **Web server:** nginx-fpm
- **Local dev:** [DDEV](https://ddev.readthedocs.io/)
- **Local URL:** https://sandesancestry.ddev.site

## Getting started

Requires [DDEV](https://ddev.readthedocs.io/en/stable/#installation) and Docker.

```bash
git clone https://github.com/michael-sandes/sandesancestryt.git
cd sandesancestryt
ddev start
ddev composer install
ddev drush site:install --existing-config -y
ddev drush cr
ddev launch
```

> A database dump is required for a full local setup — the repository tracks configuration only, not content.

## Project structure

```
web/modules/custom/
└── living_member_privacy/   # Privacy module — shows only name to anonymous users for living persons

web/themes/custom/
├── royal_heritage/          # Primary front-end theme (royal blue & gold, Cinzel/Playfair fonts)
├── claro_custom/            # Admin theme (Claro subtheme)
└── olivero_subtheme/        # Alternate front-end theme

recipes/sandesancestry/      # Site recipe — config for all content types, views, and blocks
```

## Common commands

```bash
ddev start                   # Start the environment
ddev drush cr                # Clear caches
ddev drush cim -y            # Import config from sync
ddev drush cex -y            # Export config to sync
ddev drush updb              # Run pending database updates
ddev composer require drupal/<module>
```

## Privacy

Living family members (`field_living = true` on Person nodes) are visible to anonymous visitors **by name only**. All biographical detail is hidden until the visitor logs in. This is handled by the `living_member_privacy` module — do not use `content_access` to restrict Person nodes as it will hide them entirely.
