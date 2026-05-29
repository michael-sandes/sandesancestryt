/**
 * @file global.js
 *
 * Global JavaScript behaviors for the Claro Custom subtheme.
 */

(function (Drupal, once) {
  'use strict';

  /**
   * Example behavior: log theme init in development.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.claroCustomInit = {
    attach(context) {
      // Run once per page load on the document element.
      once('claro-custom-init', 'html', context).forEach(() => {
        if (window.location.hostname === 'localhost' ||
            window.location.hostname.endsWith('.ddev.site') ||
            window.location.hostname.endsWith('.lndo.site')) {
          console.info('[claro_custom] Subtheme loaded.');
        }
      });
    },
  };

  /**
   * Example behavior: enhance admin tables with a highlight on hover.
   *
   * @type {Drupal~behavior}
   */
  Drupal.behaviors.claroCustomTableHover = {
    attach(context) {
      once('claro-custom-table', 'table.views-table tbody tr', context)
        .forEach((row) => {
          row.addEventListener('click', () => {
            const link = row.querySelector('a');
            if (link) link.click();
          });
        });
    },
  };

}(Drupal, once));
