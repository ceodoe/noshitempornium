# Older versions
[(Latest changes)](https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG.md#latest-changes)
## v2.6.2
### Features
- Added the ability to import your NSE lists into notification filters on the "edit notification filters" page (user.php?action=notify)

<p>&nbsp;</p>

## v2.6.1
### Bugfixes
- Fixed a bug where Right-Click Management wouldn't work on uploaders on TopX pages

### Other
- Added Contribute section to About page under Options

<p>&nbsp;</p>

## v2.6
### Features
- Added an option to change the filter list (textarea) font (Options > Settings > Interface)
- Added a section showing some statistics related to your filter lists (Options > Settings > About)

### Other changes
- Removed the setting for *Gazelle Collapse Duplicates* support, it is now built into the script. NSE now automatically detects whether you are using GCD by identifying one of its elements after the page has loaded, and enables GCD support accordingly
- If GCD is detected, NSE will move the comment link it creates into the comment column of the torrent list instead of removing it from the page

### Code
- Added a bunch more sanity checks
- Replaced all HTML style-tags with CSS rules
- Slimmed down the initialization code and sorted it into sections matching the layout of the NSE settings UI itself
- Initizialise empty filter lists to an empty array instead of a single-element array containing an empty string
- Labeled sections in the code better. The script has just passed 2000 lines, so better structuring is in order

<p>&nbsp;</p>

## v2.5.10
### Bugfixes
- Fixed a regression that would render part of the individual filtering button (eye icon) unclickable when using GCD compatibility mode

### Others
- Reworded font selection help text

<p>&nbsp;</p>

## v2.5.9
### Features
- Added a new built-in theme: "Dark Purple". With a nice dark gray background color lifted straight from KDE's Breeze Dark theme and purple highlights, this refreshing theme will surely give you a new outlook on filtering content on Empornium
- Added an option to change the font used by the NSE user interface (Default is Helvetica like it's always been, change it in Settings > Options > Interface).

### Other
- Update URLs for NSE and GlobalArrowKeyNavigation.user.js changed to their respective meta.js-files, so we don't hammer GitHub with requests to download the full script every time an update check is done
- Now getting all version information from script metadata block
- Simplify theme descriptions code

<p>&nbsp;</p>

## v2.5.8
### Features
- All NSE UI elements are now affected by your theme (textareas, textboxes, dropdowns, etc)
- Added a companion script to the repository that will add arrow key navigation globally on Emp. This is linked to next to the arrow key option in Settings > Options > Interface > Extras
- Added an update notification that will display when NSE is updated, with a link to see the new changes! Note that this won't actually show up until the next version is released, because NSE did not previously store version information in user storage before this change. The update notification is also affected by your theme.
- Added an accompanying option to toggle the update notification (Enabled by default, disable in Settings > Options > Interface)

### Bugfixes
- NSE will now gracefully die if it can't get a reference node to base HTML insertion on. This usually happens if Emp shows an error page (like a bad gateway error)

### Other
- Changelog split into two parts - "Latest changes" and "Older versions" (they are linked together)
- Properly classed GPL link so it is affected by theming
- Reordered and reworded links on About page
- Simplified GCD support code
- Added some sanity checks

<p>&nbsp;</p>

## v2.5.7
### Features
- Added an option to navigate to previous/next pages in torrent lists with the keyboard arrow keys (Disabled by default, enable in Options > Settings > Interface > Extras)

### Other
- New settings section: Interface > Extras. Will be used for interface features that don't directly relate to the script's main purpose of filtering uploads, or to the interface of NSE itself
- Moved "Hide category icons" to Interface > Extras
- Cleaned up some messy event handling

<p>&nbsp;</p>

## v2.5.6
### Features
- You can now define the background color of hidden torrents when using a custom theme. This color is the background color shown on hidden torrents when you click the toggle button. The default for all built-in themes is still #aaf (purple). (Options > Settings > Interface > Theme > Custom >  Hidden torrent background color)

### Bugfixes
- Fixed a bug where NSE would run on Top X Users/Tags/Taggers (and crash silently) and not just on Top X Torrents like it's supposed to, by adding an exclude for the affected pages

<p>&nbsp;</p>

## v2.5.5
### Features
- NSE now runs on "user uploaded" pages (the page you get to by clicking "View" next to "Uploaded" on user profile pages (/torrents.php?type=uploaded&userid=xxxxxx))
- Filtering will be disabled on your own user uploaded page, but you can still use NSEs other features such as right-click management there

<p>&nbsp;</p>

## v2.5.4
### Features
- Added an option to hide unseeded torrents (Disabled by default, enable in Options > Settings > Filtering > Torrent site status)
- Added an option to hide category icons in torrent lists (Disabled by default, enable in Options > Settings > Interface)

<p>&nbsp;</p>

## v2.5.3
### Features
- Added an option to use a "Hard Pass" tag blacklist. Hard Pass tags will make sure the torrent gets hidden no matter what other settings are set; The only thing that will override Hard Pass is manually whitelisting a torrent through individual filtering (clicking the eye icon on it). Hard Pass is disabled by default, and can be enabled in Options > Settings > Filtering > Hard Pass. You can also enable the Black Hole option in the same place as Hard Pass to remove the results from the page entirely instead of hiding them behind the toggle button. Hard Pass options have also been added to Right-Click Management

<p>&nbsp;</p>

## v2.5.2
### Features
- Added an option to enable or disable the extended unicode icons/emoji (Enabled by default)
- Added an option to automatically scroll to NSE/torrents area on page load (Disabled by default)
- Added an easter egg (spoilers: [[1]](https://github.com/ceodoe/noshitempornium/blob/457b2e16af431a3ddfafdc9062af304b44bab9bb/NoShitEmpornium.user.js#L185-L188) [[2]](https://github.com/ceodoe/noshitempornium/blob/457b2e16af431a3ddfafdc9062af304b44bab9bb/NoShitEmpornium.user.js#L535-L539) [[3]](https://github.com/ceodoe/noshitempornium/blob/457b2e16af431a3ddfafdc9062af304b44bab9bb/NoShitEmpornium.user.js#L986-L997))

### Other
- Minor text and code changes

<p>&nbsp;</p>

## v2.5.1
### Features
- When the NSE options area is expanded, there is now a button available to close it from the bottom so you don't have to scroll back up to do it. It also somewhat corrects for the lost page height when closing the options, by scrolling your view to the NSE box immediately after closing it
- Added a quick-refresh button that shows up in the main NSE box next to the Options button if/when you make any changes with Right-Click Management

### UI
- Split the huge settings page into four sub-pages
- Renamed "Cosmetic" options category to "Interface"
- Adjusted some text in the explanation boxes for the lists

<p>&nbsp;</p>

### Bugfixes
- "Export NSE data" button now saves your current settings before exporting them
- The "toggle x torrents" button will no longer toggle an empty list if you end up unfiltering everything on the page during one page load. Instead it will switch to showing non-hidden torrents and disable toggle functionality whenever this happens. Re-hiding a torrent will re-enable the toggling functionality
- The above change also fixes a bug that would kill toggle functionality when using individual filtering on pages where there were no hidden results before manually filtering

### Code
- Lots of code changes, simplification and rearrangement (loops are FUN!)
- Added @supportURL and @homepageURL to the userscript header
- Replaced custom CSS inject function with GM_addStyle
- Replaced all vars with lets because I was already using block scoping and apparently let has been in ES for six years 
- Changed names of "settingsCheckbox" and "explanationSpan" to "nseSettingsCheckbox" and "nseExplanationSpan" respectively; You'll need to update your custom CSS if you style these elements

<p>&nbsp;</p>

## v2.5
### Features
- Added support for importing or exporting all NSE data to/from a file, through the new "Data management" section in the Settings page
- You can also reset all NSE lists and settings to their default values in the Data management area 
- You can now press Ctrl+S (Windows/Linux) or Cmd+S (macOS) to save your settings when editing any black/whitelist

### Bugfixes
- Fixed a bug where the eye icons from individual filtering would indicate results being hidden when they were actually being shown by the Russian Roulette

### Other
- Added "title" to Right-Click Management explanation text
- Adjusted the padding of buttons created by NSE to make them look more uniform
- Updated script description
- Removed some leftover debug code

<p>&nbsp;</p>

## v2.4.1
- When Right-Click Management is active, you can now right-click torrent titles to filter based on that torrent's name.
- Gave Right-Click Management settings toggle a unique icon

<p>&nbsp;</p>

## v2.4
- We here at NSE Enterprises, Inc understand that it's hard to keep managing your text tags with one hand. That's why we've developed our groundbreaking new invention: Right-Click Management! This new feature allows you to right-click any tag or any uploader in the torrent list, in order to add/remove them from their respective black- or whitelists. Never type a tag or uploader name again!
- We also understand that some people want to keep their daggum context menus, so Right-Click Management can be turned off via the Settings page.
- General system stability improvements to enhance the user's experience.

<p>&nbsp;</p>

## v2.3.5
- Fixed bug with trimming of leading and trailing whitespace in all black- and whitelists
- Fixed a reintroduced bug where clicking the "NoShitEmpornium" text when no torrents were filtered would hide the entire torrent list
- Fixed bug where black-/whitelisting based on title would fire on every torrent if the black- or whitelist is an empty string
- Simplified settings initialization for new installs, shaving off a good chunk of unnecessary code
- Simplified domain-specific links (using href="/..." instead of parsing the current URL, which is also future proof for any other domains that may get added in the future)

<p>&nbsp;</p>

## v2.3.4
- Fix z-order index of individual filtering icons (eyes) when using GCD compatibility mode, so that they don't appear in front of the torrent preview that is shown when hovering over a torrent title
- You now need to again click the toggle text to toggle torrents instead of anywhere in the options box. This was done revert a change in an earlier release that broke compatibility with browsers that don't support event.stopPropagation() like Waterfox and Pale Moon, basically browsers based on OLD Firefox code. This does not mean that these browsers are now supported, but this change has little impact in other browsers and avoids users of these browsers having to stay on an older version of NSE. I still massively recommend those users upgrade to a modern browser like Firefox.
- Link to author profile and to NSE forum thread now takes which site domain you are using into account when generating the links (me/sx/is)

<p>&nbsp;</p>

## v2.3.3
- Add support for .is domain
- Adjusted some text in the Options box
- Added a license notice to the script and a full license file in the repository
- Whitespace adjustments 

<p>&nbsp;</p>

## v2.3.2
- Move support for "Gazelle Collapse Duplicates" script (GCD) into its own option under Settings, default is disabled
- When GCD support is enabled, all torrent comment icons created by it are now hidden
- When GCD support is enabled, the eye-icon for individual filters is now brought to the front as not to be obscured by the version lines from GCD
- Disabled GCD support on any page besides torrents.php, as it is the only page NSE and GCD have in common
- The "toggle hidden torrents" on-click functionality now covers most of the options box instead of just the text

<p>&nbsp;</p>

## v2.3.1
- Add compatibility with Gazelle Collapse Duplicates (restores the torrent icon box)
- Fixed an oversight causing the hidden torrents list not to be toggleable under certain conditions
- Fixed a bug where the NSE options area wouldn't appear on any Notifications pages past the first page
- Add logic to avoid duplicate entries in the individual upload filter lists if the same torrent is black/whitelisted several times on the same page (the same torrent can appear multiple times on the Top10 page, for example)

<p>&nbsp;</p>

## v2.3
- Added filtering for individual uploads. To use this new feature, click the new eye icon next to any torrent in any supported torrent list, and it will hide/show that upload regardless of any tag/title/uploader rules. This is useful if you just plain don't want to see a torrent, but don't have anything unique to filter it on. This feature is enabled by default when you update, but can be disabled from the Settings tab within NSE. Note that you don't need to manually save when filtering uploads this way, as it is done automatically whenever you click the eye icon.

<p>&nbsp;</p>

## v2.2.4
- Added option to hide grabbed torrents
- Added option to hide currently leeching torrents
- Added option to hide currently seeding torrents
- Added option to hide snatched torrents
- Added option to bypass whitelists for the above torrents so that they are always hidden
- Removed some legacy code and minor CSS restructuring

<p>&nbsp;</p>

## v2.2.3
- Added option to hide reported uploads
- Added option to hide warned uploads

<p>&nbsp;</p>

## v2.2.2
- Added option to hide anon uploads
- Added help text on Uploaders tab to clarify that username-based filtering won't work on collage pages

<p>&nbsp;</p>

## v2.2.1
- Changed title filtering from words to phrases. List is now separated by semicolons instead of spaces, so you can use more than one word to filter titles on, great for filtering torrents with common themes or mistagged/untagged torrents.
- Changed the name of the "Options" tab to "Settings" (button is still labeled "Options")
- Added text to clarify which character to use to separate the lists

<p>&nbsp;</p>

## v2.2
- Added option to add your own custom CSS
- Fixed whitespace/indentation of in-script HTML and CSS
- Dropped alpha tag from version, I'm pretty confident it's more or less stable now

<p>&nbsp;</p>

## v2.1.1a
- Added Russian Roulette mode
- Optimized tag filtering loop
- Added icons to Oblivious and Russian Roulette options
- Added margins to the main box to put some air between elements on topX/collage pages

<p>&nbsp;</p>

## v2.1a
- Added theming support

<p>&nbsp;</p>

## v2.0.2a
- Smaller toggle/options box
- Smaller font sizes
- Changed font to Helvetica
- Removed broken external font, replaced icons with emojis
- Added padding and margins to tabs and main expanded box
- Adjusted text area and explanation to fit better within parent
- Removed NSE tag on toggle button

<p>&nbsp;</p>

## v2.0.1a
- Added option to hide torrent tag lists, for a cleaner look
- More code optimizations

<p>&nbsp;</p>

## v2.0a
- All new design and color scheme
- Added toggleable help boxes for each list
- Added blacklist/whitelist based on words in torrent title
- Added whitelist for uploaders
- Character case in uploader blacklist no longer matters
- Split save and reload into two separate buttons
- Many more improvements under the hood
- Please report any bugs on GitHub or Emp!

<p>&nbsp;</p>

## v1.5.5
- Fixed bug where NSE would not work on torrents.php after site update
- Fixed tag misalignment when using tag highlighter
- Add support for automatic updates

<p>&nbsp;</p>

## v1.5.4
- Fixed bug where script would not filter torrents on notifications page
- Fixed bug where options area would not appear in collages

<p>&nbsp;</p>

## v1.5.3
- Fixed a bug where NSE wouldn't work on torrents.php after a server-side HTML change

<p>&nbsp;</p>

## v1.5.2
- Clarified the explanations and reformatted the text in the management area

<p>&nbsp;</p>

## v1.5.1
- Fixed bug where a torrent would be hidden if an illegal tag was found after a whitelisted tag in the tag order

<p>&nbsp;</p>

## v1.5
- Added whitelist feature

<p>&nbsp;</p>

## v1.4.4
- Fixed bug where script didn't hide uploaders on top10
- Fixed bug where script wouldn't run on tag searches

<p>&nbsp;</p>

## v1.4.3
- More include/exclude changes, script should now run correctly on applicable collage pages whilst ignoring 
torrent-pages with id or type parameters (torrent details, user seeding/leeching pages)

<p>&nbsp;</p>

## v1.4.2
- Fix bug where script didn't run on collage subpages

<p>&nbsp;</p>

## v1.4.1
- Convert includes to regex (PR [#1](https://github.com/ceodoe/noshitempornium/pull/1))

<p>&nbsp;</p>

## v1.4
- New feature: Hide by uploader name. This new feature allows you to specify usernames you want to hide 
all uploaded torrents from, on all torrent browsing pages, and the Top 10 list. Collages are unaffected, 
as they do not display uploader names on specific torrents. This feature works pretty much exactly like 
the hide-by-tag feature, and hides a torrent if the username matches one on your list. At this time, you 
cannot hide anon uploads. The list is space-separated, and case sensitive, which means that upper/lower 
case of the username to hide matters. Please give this feature a go, and let me know how it works (or 
doesn't work).

<p>&nbsp;</p>

## v1.3.3
- Fixed bug where toggle button would hide all torrents when clicked, when no illegal tags were found
- Slightly changed field design to be more fitting with default emp theme
- Made the Options button into an actual button
- Made code for button design more legible

<p>&nbsp;</p>

## v1.3.1
- Added matching of both .me and .sx domains
- Created GitHub repository for project

<p>&nbsp;</p>

## v1.3
- Major code restructuring and changes
- Added in-page taglist management (click [Options]), no more need for manually editing the script
- Removed ability to hide the toggle button, it is now required to manage tags
- Button is now always visible on applicable pages to enable taglist management when no torrents were hidden

<p>&nbsp;</p>

## v1.2.7
- Added toggling the toggle button by changing the toggleButtonEnabled variable's value
- Minor code changes

<p>&nbsp;</p>

## v1.2.6
- Now runs on individual collage pages

<p>&nbsp;</p>

## v1.2.5
- The script now also matches HTTPS, in case Emp ever implements SSL
- Toggle button will now show "torrent" instead of "torrents" when there's only one hidden element
