# Claro Custom — Drupal 11 Subtheme

A subtheme of **Claro** (Drupal's default administration theme) for Drupal 10/11.

---

## Installation

1. Copy the `claro_custom` directory to `web/themes/custom/claro_custom`  
   (or `docroot/themes/custom/claro_custom` depending on your project layout).

2. Enable the theme via Drush:
   ```bash
   drush theme:enable claro_custom
   drush config:set system.theme admin claro_custom -y
   drush cr
   ```
   Or go to **Administration → Appearance** and set it as the admin theme.

---

## File structure

```
claro_custom/
├── claro_custom.info.yml        # Theme definition & metadata
├── claro_custom.libraries.yml   # CSS/JS library declarations
├── claro_custom.theme           # Preprocess functions & hook implementations
├── css/
│   ├── variables.css            # CSS custom properties (design tokens)
│   ├── global.css               # General layout & component overrides
│   ├── forms.css                # Admin form overrides
│   └── typography.css           # Heading & text overrides
├── js/
│   └── global.js                # Drupal behaviors
├── templates/                   # Twig template overrides (add as needed)
├── images/                      # Logo, favicon, icons
└── config/
    └── install/
        └── claro_custom.settings.yml
```

---

## Customisation

### Colours
Edit `css/variables.css` and update the `--color-brand-*` custom properties.  
All other colour references use these tokens, so a single file change cascades everywhere.

### Typography
Custom font families can be declared in `css/variables.css` (`--font-family-base`)  
and loaded via a `@font-face` block or a Google Fonts `@import` in `css/typography.css`.

### Template overrides
Copy any Twig template from `core/themes/claro/templates/` into  
`claro_custom/templates/` and edit freely. Drupal's theme negotiator will  
automatically prefer your copy over the parent's.

### Additional libraries
Add new entries to `claro_custom.libraries.yml` and reference them from  
`claro_custom.info.yml` (`libraries:`) or attach them conditionally in  
`claro_custom.theme` via `hook_preprocess_*`.

---

## Requirements

- Drupal ^10.3 || ^11
- PHP ^8.1
