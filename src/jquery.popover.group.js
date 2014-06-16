define(['jquery', 'bootstrap'], function ($) {
    'use strict';

	/*
     * data-toggle="popover"
     */
    var toggleSelector = '[data-toggle="popover"]',
        clearSelector = toggleSelector + '[data-popover-enabled]'; // Only clear popovers that have been setup already otherwise a popover will be created with the wrong configuration

    function clearPopovers ($popover) {
        $(clearSelector).not($popover).popover('hide');
    }

    // Close popovers when a click happens off of one
    $('html').on('click.popover.data-api', function (e) {
        // If the element that was clicked on is not inside of a popover
        if ($(e.target).closest('.popover').length === 0) {
            clearPopovers();
        }
    });

    // Close popovers when a touch happens off of one
    $('html').on('touchstart.popover.data-api', function (e) {
        // If the element that was touched is not inside of a popover
        if ($(e.target).closest('.popover').length === 0) {
            clearPopovers();
        }
    });

    $('body').on('click.popover.data-api', toggleSelector, function () {
        var $this = $(this),
            $target, selector, isActive, options;

        if ($this.is('.disabled, :disabled')) {
            return;
        }

        // If this popover has not been created yet then set it up
        if (typeof $this.attr('data-popover-enabled') === 'undefined') {
            options = {
                trigger: 'manual',
                html: true,
                placement: function () {
                    return $this.attr('data-placement');
                }
            };

            selector = $this.attr('data-target');

            if (!selector) {
                selector = $this.attr('href');
                selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
            }

            // If a valid selector was specified
            if (selector && selector !== '#') {
                $target = $(selector);
            }
            // Else try to grab a sibling .popover-group-content to use as the target
            else {
                $target = $this.parent().find('> .popover-group-content') ;
            }

            // If a target has not been found yet
            if ($target.length === 0 || $target.attr('data-inline-template')) {
                // Then this must have a popover defined in the markup

                // Set the template equal to the popover that is already in the markup.
                // This keeps the dom from being modified (nodes removed and added) thus preventing data-binding from breaking
                options.template = $this.closest('.popover-group').find('.popover');

                // Set the content to true to indicate this popover does in fact have content
                options.content = true;
            }
            // Else we have a target
            else {
                // Use the target's html as the content
                options.content = $target.html();
            }

            $this.popover(options);

            $this.attr('data-popover-enabled', '');
        }

        isActive = $this.data('bs.popover').tip().hasClass('in');

        // Only close this popover if it is currently active and will be closing
        clearPopovers(isActive ? null : $this);

        // If this popover needs to be opened
        if (!isActive) {
            $this.popover('show');
        }

        return false;
    });
});