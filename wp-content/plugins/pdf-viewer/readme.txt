=== PDF Viewer ===
Contributors: envigeek
Tags: pdf, pdfjs, pdf viewer, viewer, embed,
Requires at least: 3.8
Tested up to: 6.1.1
Stable tag: 1.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

HTML5-compliant PDF Viewer for WordPress

== Description ==
PDF Viewer is a WordPress plugin that allows you to embed PDF document on your site without using Flash plugin and only rely on JavaScript in order to work. This will make your website HTML5-compliant. This plugin is powered by Mozilla PDF.js script.

**How to embed:** Use shortcode like this [pdfviewer width="600px" height="849px"]http://full-url/document.pdf[/pdfviewer]

[PDF.js](https://mozilla.github.io/pdf.js/) is an HTML5 technology experiment that explores building a faithful and efficient Portable Document Format (PDF) renderer without native code assistance. The goal is to create a general-purpose, web standards-based platform for parsing and rendering PDFs. PDF.js development is community-driven and supported by Mozilla Labs.

== Installation ==
1. Install from within WordPress plugin installer, or get from WordPress plugin repository
1. Activate the plugin through the "Plugins" menu in WordPress.
1. Go to Settings > PDF Viewer to set default values for the plugin.
1. Create or edit any page (or post) and insert the shortcode [pdfviewer][/pdfviewer].

== Frequently Asked Questions ==
= Is this supported on WordPress Multisite? =
In simple words, YES. But if you are using domain mapping plugin, this only works when your backend URL is the same as the frontend. Means you have to make sure the document URL use the website public-facing domain name instead of the multisite domain.

== Screenshots ==
1. PDF viewer in action.
1. Settings page for default values.

== Changelog ==
= 1.1.0 =
* Updated PDF.js to latest version 3.2.146

= 1.0.1 =
* Fixed PDF.js not loading correctly

= 1.0.0 =
* Updated PDF.js to latest version 3.1.81
* Removed beta version of PDF.js as no longer available
* Fixed potential XSS by contributor role. Thanks to WPScan for responsible disclosure.

= 0.1 =
* Initial release.

== Upgrade Notice ==
= Updated PDF.js to latest version 3.2.146 =