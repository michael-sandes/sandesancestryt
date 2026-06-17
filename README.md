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
├── sandes_ancestry/         # Primary front-end theme — seven switchable colour schemes
├── royal_heritage/          # Alternate front-end theme (royal blue & gold)
└── claro_custom/            # Admin theme (Claro subtheme)

recipes/sandesancestry/      # Site recipe — config for all content types, views, and blocks
```

## Themes

### sandes_ancestry (primary)

The main front-end theme. Colour scheme and typography are switchable via **Appearance → Settings** without any code changes. Seven schemes are available:

| Scheme | Primary | Accent | Body font |
|---|---|---|---|
| Emerald & Bronze *(default)* | Forest green | Bronze/copper | Lora |
| Burgundy & Sage | Wine red | Sage green | Source Sans 3 |
| Sepia & Antique Gold | Sepia brown | Antique gold | Open Sans |
| Slate & Rose Gold | Steel blue | Rose gold | Inter |
| Charcoal & Silver | Charcoal grey | Pewter | Crimson Pro |
| Midnight & Copper | Midnight navy | Copper | Raleway |
| Teal & Ochre | Deep teal | Amber/ochre | Cabin |

Each non-default scheme loads an additional CSS file from `css/color-schemes/` that overrides the CSS custom properties defined in `css/style.css`. To add a new scheme: create the CSS file, register it in `sandes_ancestry.libraries.yml`, and add it to `sandes_ancestry_color_scheme_options()` in `sandes_ancestry.theme`.

### royal_heritage

Alternate theme with a fixed royal blue and gold palette (Cinzel, Playfair Display, Crimson Pro fonts).

## Common commands

```bash
ddev start                   # Start the environment
ddev drush cr                # Clear caches (run after any CSS/JS/Twig/module change)
ddev drush cim -y            # Import config from sync/
ddev drush cex -y            # Export config to sync/
ddev drush updb -y           # Run pending database updates
ddev composer require drupal/<module>
```

## Configuration management

Config lives in `config/sync/` as YAML and is tracked in git.

1. Make changes in the Drupal UI
2. `ddev drush cex -y` — export to `config/sync/`
3. Commit `config/sync/` alongside any code changes
4. On another environment: `git pull && ddev composer install && ddev drush updb -y && ddev drush cim -y && ddev drush cr`

## Privacy

Living family members (`field_living = true` on Person nodes) are visible to anonymous visitors **by name only**. All biographical detail is hidden until the visitor logs in. This is handled by the `living_member_privacy` module — do not use `content_access` to restrict Person nodes as it will hide them entirely.
