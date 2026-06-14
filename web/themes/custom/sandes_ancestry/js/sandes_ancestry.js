/**
 * @file
 * Sandes Ancestry theme — global scripts.
 * Handles mobile navigation toggle.
 */
(function (Drupal) {
  'use strict';

  /**
   * Mobile menu toggle behaviour.
   */
  Drupal.behaviors.sandesAncestryMenu = {
    attach: function (context, settings) {
      const toggles = once('sa-menu-toggle', '.menu-toggle', context);

      toggles.forEach(function (toggle) {
        const menuId = toggle.getAttribute('aria-controls');
        const menu   = document.getElementById(menuId);

        if (!menu) return;

        toggle.addEventListener('click', function () {
          const expanded = toggle.getAttribute('aria-expanded') === 'true';
          toggle.setAttribute('aria-expanded', String(!expanded));
          menu.classList.toggle('is-open', !expanded);
        });

        // Close menu when focus leaves nav
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
          }
        });
      });
    }
  };

})(Drupal);
