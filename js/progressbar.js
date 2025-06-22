/**
 * @file
 * Progress bar.
 */
(function ($, Drupal) {
  /**
   * Theme function for the progress bar.
   *
   * @param {string} id
   *   The id for the progress bar.
   *
   * @return {string}
   *   The HTML for the progress bar.
   */
  Drupal.theme.progressBar = function (id) {
    const escapedId = Drupal.checkPlain(id);
    return (
      `<div id="${escapedId}" class="progress" aria-live="polite">` +
        '<div class="progress-label">...</div>' +
        '<div class="progress-track"><div class="progress-bar"></div></div>' +
        '<div class="progress-percentage">0%</div>' +
        '<div class="progress-description">&nbsp;</div>' +
      '</div>'
    );
  };

  $.extend(
    Drupal.ProgressBar.prototype, {
      /**
       * Set the percentage and status message for the progressbar.
       *
       * @param {number} percentage
       *   The progress percentage.
       * @param {string} message
       *   The message to show the user.
       * @param {string} label
       *   The text for the progressbar label.
       */
      setProgress(percentage, message, label) {
        if (percentage >= 0 && percentage <= 100) {
          $(this.element)
            .find('div.progress-bar')
            .each(function () {
              this.style.width = `${percentage}%`;
            });
          $(this.element)
            .find('div.progress-percentage')
            .html(`${percentage}%`);
        }
        $('div.progress-description', this.element).html(message);
        $('div.progress-label', this.element).html(label);
        if (this.updateCallback) {
          this.updateCallback(percentage, message, this);
        }
      },
    },
  );
})(jQuery, Drupal);
