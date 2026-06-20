(function (Drupal) {
  'use strict';

  Drupal.behaviors.sabootstrap = {
    attach(context) {
      // Bootstrap tooltips — opt-in via data-bs-toggle="tooltip"
      const tooltipEls = context.querySelectorAll('[data-bs-toggle="tooltip"]');
      tooltipEls.forEach((el) => {
        if (!el._bsTooltip) {
          new bootstrap.Tooltip(el);
        }
      });
    },
  };
}(Drupal));
