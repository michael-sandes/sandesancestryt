# Sandes Ancestry

A private family genealogy site built on Drupal 11, tracking the Sandes family history.

## Stack

| | |
|---|---|
| CMS | Drupal 11 |
| PHP | 8.4 |
| Database | MariaDB 11.8 |
| Web server | nginx-fpm |
| Local dev | [DDEV](https://ddev.readthedocs.io/) |
| Local URL | https://sandesancestry.ddev.site |

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
└── living_member_privacy/   # Access control for living persons

web/themes/custom/
├── sandes_ancestry/         # Primary front-end theme — eight switchable colour schemes
├── royal_heritage/          # Alternate front-end theme (royal blue & gold)
└── claro_custom/            # Admin theme (Claro subtheme)

recipes/sandesancestry/      # Site recipe — config for all content types, views, and blocks
config/sync/                 # Drupal config YAML (tracked in git)
```

## Theme — sandes_ancestry

The main front-end theme. Colour scheme and typography are switchable via **Appearance → Settings** without any code changes. Eight schemes are available:

| Scheme | Style | Primary | Accent | Body font |
|---|---|---|---|---|
| Emerald & Bronze *(default)* | Light | Forest green | Bronze/copper | Lora |
| Burgundy & Sage | Light | Wine red | Sage green | Source Sans 3 |
| Sepia & Antique Gold | Light | Sepia brown | Antique gold | Open Sans |
| Slate & Rose Gold | Light | Steel blue | Rose gold | Inter |
| Charcoal & Silver | Light | Charcoal grey | Pewter | Crimson Pro |
| Midnight & Copper | Light | Midnight navy | Copper | Raleway |
| Teal & Ochre | Light | Deep teal | Amber/ochre | Cabin |
| Nightfall & Gold | **Dark** | Dark navy | Warm gold | Inter |

Each non-default scheme loads an additional CSS file from `css/color-schemes/` that overrides the CSS custom properties defined in `css/style.css`. To add a new scheme: create the CSS file, register it in `sandes_ancestry.libraries.yml`, and add it to `sandes_ancestry_color_scheme_options()` in `sandes_ancestry.theme`.

> **Dark scheme note:** The Nightfall & Gold scheme overrides `--sa-cream` to a near-black value. Any CSS that uses `var(--sa-cream)` for a background must be audited for readability. The Klaro cookie modal uses hardcoded light values for its body background specifically to avoid this issue.

## Contrib modules

| Module | Purpose |
|---|---|
| `admin_toolbar` | Expandable admin menu |
| `content_access` | Node-level access control |
| `easy_breadcrumb` | Configurable breadcrumbs |
| `eck` | Extra entity types (`event`, `family`, `image`) |
| `glightbox` | Lightbox for images |
| `klaro` | Cookie & consent manager |
| `pathauto` | Automatic URL aliases |
| `token` | Token support for pathauto |
| `toolbar_menu` | Menu in the admin toolbar |
| `add_content_by_bundle` | Quick-add content links |

## Content architecture

| Type | Entity | Notes |
|---|---|---|
| Person | Node | Central record; `field_living` flag controls privacy |
| Pedigree | Node | Ancestor chart grouping |
| Place | Node | Geographic records |
| Citation | Node | Inline source references |
| Source | Node | Primary source records |
| Event | ECK | Birth, death, marriage events attached to persons |
| Family | ECK | Links two Person records as a couple |
| Image | ECK | Media record with caption and attribution |

## Custom modules

### living_member_privacy

Controls visibility of living Person nodes. Uses Drupal's node grants system (`hook_node_access_records` / `hook_node_grants`) so living persons appear in search and views for all users, but all field content is hidden for anonymous visitors via `hook_node_view_alter`. Works alongside `content_access` without conflict.

Do not use `content_access` to restrict Person nodes — it removes them from listings entirely rather than redacting their content.

## Common commands

```bash
ddev start                        # Start the environment
ddev stop                         # Stop the environment
ddev drush cr                     # Clear caches (run after CSS/JS/Twig/module changes)
ddev drush cim -y                 # Import config from config/sync/
ddev drush cex -y                 # Export config to config/sync/
ddev drush updb -y                # Run pending database updates
ddev drush en <module> -y         # Enable a module
ddev composer require drupal/<module>
ddev export-db --file=backup.sql.gz
```

## Configuration management

Config lives in `config/sync/` as YAML and is tracked in git.

1. Make changes in the Drupal UI
2. `ddev drush cex -y` — export to `config/sync/`
3. Commit `config/sync/` alongside any code changes
4. On another environment: `git pull && ddev composer install && ddev drush updb -y && ddev drush cim -y && ddev drush cr`
