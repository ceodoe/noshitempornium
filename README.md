# NoShitEmpornium
Script to hide torrents with unwanted tags or by unwanted uploaders on Empornium

# Features
- Blacklist tags and uploaders
- Whitelist tags to ignore blacklist rules
- Tag highlighting based on blacklist/whitelist
- Neat toggle button and GUI to manage taglists

# Prerequisites
NSE is a JavaScript user script. In order to use it, you'll need to install an extension/addon in your browser that can handle and execute user scripts.

* Chrome/Vivaldi - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
* Opera - [Tampermonkey](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)
* Firefox - [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
* Safari - [Tampermonkey](https://tampermonkey.net/?browser=safari)
* Edge - [Tampermonkey](https://tampermonkey.net/?browser=edge)

# How to use
* Make sure the checkbox for "Hide tags in lists" is **unchecked** in your user settings on Emp, the script won't be able to access tags if they're hidden (hover over your username at the top right of any page and click Settings). In addition, it is recommended that you increase the value of "Max Tags in lists" to a high number such as 1000, so that torrents with a lot of tags will correctly handled.
* Install Tampermonkey/Greasemonkey using the appropriate link above
* Install NSE by clicking [here](https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js)
* Follow the instructions given by Tampermonkey/Greasemonkey to install the script
* Once the script is installed, visit an applicable page on Emp (Torrents, Top 10, Collages, Notifications)
* Click the Options button in the new, blue NSE area placed below the search center
* Add your lists of space-separated tags or uploaders in the newly revealed text areas
* Click "Save and reload page" to save your options and reload the page
* Torrents containing the entered tags or by entered usernames will now be hidden, and can be shown by clicking the "Toggle X hidden torrents" button. Torrents containing any tag in the whitelist will be shown regardless of blacklist rules.

# Important note
If you:

* Use incognito mode
* Clear Emp cookies
* Clear Emp website data
* Reinstall the same version of the script
* Uninstall then reinstall the script

...your saved taglist will be deleted. If you're planning to do any of these things, make sure you back up your taglist first.

# [Click here for changelog](https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG.md)
