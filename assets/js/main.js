/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

})(jQuery);

//SECURITY
// 1. Post Orders:
// A. Red Binder: Emergency Post Orders 
// B. White Binder: Post Duties
// 2. Office Paperwork:
// A. Passdowns
// B. SAR
// C. Schedule
// D. Shift / Holiday Matrix / Vacation
// E. Sign-In/Out Logs
// F. Incident Reports
// G. Badge Access Log
// H. Access Form – Completion and Filing
// I. Property Removal Form
// J. Other Forms (Lost and Found, Key Log, 
// etc.)
// 3. Phones:
// A. Proper Phone Etiquette 
// B. Phone Directories/Transferring Calls
// C. Directors and Their Administrators
// D. Threatening Phone Calls
// 4. S2:
// A. Log-in Process - Workstations
// B. Status Group-Door Status Verification
// C. Looking up Profiles - Search Feature
// D. How to Lock/Unlock/Mask Doors
// E. Event Procedures
// F. Running Reports
// 5. Badges/VMS:
// A. How to Make Badges/Terminating Badges
// B. Editing Badge Access
// C. Terminated/Disabled Badges
// D. Alarm Feature
// 6. Milestone:
// A. Camera Setup
// B. Changing Cameras
// C. How to Look up Footage
// D. How to Look up Cameras 
// E. Saving/Exporting Footage
// 7. Miscellaneous:
// A. SAF 09-11
// B. Attendance and Punctuality HR SOP
// C. Dress Code Guidelines
// D. Standards of Performance
// E. PA Announcements
// F. BOLOs
// G. Discuss Phase 1, 2, 3 Training
// H. Workplace Violence
// I. Signing-In/Out of Computers
// J. Lost & Found
// K. Iron Mountain

// PATROL OFFICER
// 1. Patrol Procedures:
// A. Proper Patrol Procedures
// B. Interior Patrol
// C. Exterior Patrol
// 2. Fire Panel:
// A. Know Four Different Levels:
//  (Trouble, Supervisory, Pre-Alarm, Fire Alarm)
// B. Acknowledge Alarms
// C. How and Where to Log Alarms
// 3. Code Blue Boxes:
// A. Locations
// B. Purpose/Functions
// 4. Back-up Generator:
// A. Location
// B. Checking Panels & Annunciator
// 5. MDF / IDF Units:
// A. Check for Alarms
// B. Types of Alarms
// C. Silencing Alarms
// 6. Pump Room / Riser Room:
// A. Checking Area

// LOBBY / CONSOLE  
// A. Lobby/Console Duties
// B. Access Control
// C. Issuing Badges – Visitor Kiosk
// D. Issuing Badges - Book
// E. Signing Out Keys
// F. Issuing Cabinet Keys
// G. Boxes and Bag Checks
// H. Code Blue Procedures
// I. Duress Button
// J. Lock Down Button
// K. Proper Radio Etiquette
// L. Revolving Door – Usage and Breakdown
// M. Circle Lock
// N. PA Emergency System
// O. Go-Bag Content/Use
// P. GSOC Notifications

// GEM - PATROL VEHICLES
// A. Charging Schedule
// B. GEM Inspection & Damage Reporting
// C. Safety
// D. Proper Operation of GEM

// HR / MYAPRON
// A. Schedule New Hire Orientation
// B. Sign in to myApron
// C. myTHDHR
// D. Knowledge Depot
// E. Kronos
// F. ESS/MSS – Deliverables 
// G. Benefits/LivetheOrangeLife

