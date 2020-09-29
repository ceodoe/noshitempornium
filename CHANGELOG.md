# Changelog
v2.2.4
- Added option to hide grabbed torrents
- Added option to hide currently leeching torrents
- Added option to hide currently seeding torrents
- Added option to hide snatched torrents
- Added option to buypass whitelists for the above torrents so that they are always hidden
- Remove some legacy code and minor CSS restructuring

v2.2.3
- Added option to hide reported uploads
- Added option to hide warned uploads

v2.2.2
- Added option to hide anon uploads
- Added help text on Uploaders tab to clarify that username-based filtering won't work on collage pages

v2.2.1
- Changed title filtering from words to phrases. List is now separated by semicolons instead of spaces, so you can use more than one word to filter titles on, great for filtering torrents with common themes or mistagged/untagged torrents.
- Changed the name of the "Options" tab to "Settings" (button is still labeled "Options")
- Added text to clarify which character to use to separate the lists

v2.2
- Added option to add your own custom CSS
- Fixed whitespace/indentation of in-script HTML and CSS
- Dropped alpha tag from version, I'm pretty confident it's more or less stable now

v2.1.1a
- Added Russian Roulette mode
- Optimized tag filtering loop
- Added icons to Oblivious and Russian Roulette options
- Added margins to the main box to put some air between elements on topX/collage pages

v2.1a
- Added theming support

v2.0.2a
- Smaller toggle/options box
- Smaller font sizes
- Changed font to Helvetica
- Removed broken external font, replaced icons with emojis
- Added padding and margins to tabs and main expanded box
- Adjusted text area and explanation to fit better within parent
- Removed NSE tag on toggle button

v2.0.1a
- Added option to hide torrent tag lists, for a cleaner look
- More code optimizations

v2.0a
- All new design and color scheme
- Added toggleable help boxes for each list
- Added blacklist/whitelist based on words in torrent title
- Added whitelist for uploaders
- Character case in uploader blacklist no longer matters
- Split save and reload into two separate buttons
- Many more improvements under the hood
- Please report any bugs on GitHub or Emp!

v1.5.5
- Fixed bug where NSE would not work on torrents.php after site update
- Fixed tag misalignment when using tag highlighter
- Add support for automatic updates

v1.5.4
- Fixed bug where script would not filter torrents on notifications page
- Fixed bug where options area would not appear in collages

v1.5.3
- Fixed a bug where NSE wouldn't work on torrents.php after a server-side HTML change

v1.5.2
- Clarified the explanations and reformatted the text in the management area

v1.5.1
- Fixed bug where a torrent would be hidden if an illegal tag was found after a whitelisted tag in the tag order

v1.5
- Added whitelist feature

v1.4.4
- Fixed bug where script didn't hide uploaders on top10
- Fixed bug where script wouldn't run on tag searches

v1.4.3
- More include/exclude changes, script should now run correctly on applicable collage pages whilst ignoring 
  torrent-pages with id or type parameters (torrent details, user seeding/leeching pages)
  
v1.4.2
- Fix bug where script didn't run on collage subpages

v1.4.1
- Convert includes to regex (PR [#1](https://github.com/ceodoe/noshitempornium/pull/1))

v1.4
- New feature: Hide by uploader name. This new feature allows you to specify usernames you want to hide 
  all uploaded torrents from, on all torrent browsing pages, and the Top 10 list. Collages are unaffected, 
  as they do not display uploader names on specific torrents. This feature works pretty much exactly like 
  the hide-by-tag feature, and hides a torrent if the username matches one on your list. At this time, you 
  cannot hide anon uploads. The list is space-separated, and case sensitive, which means that upper/lower 
  case of the username to hide matters. Please give this feature a go, and let me know how it works (or 
  doesn't work).

v1.3.3
- Fixed bug where toggle button would hide all torrents when clicked, when no illegal tags were found
- Slightly changed field design to be more fitting with default emp theme
- Made the Options button into an actual button
- Made code for button design more legible

v1.3.1
- Added matching of both .me and .sx domains
- Created GitHub repository for project

v1.3
- Major code restructuring and changes
- Added in-page taglist management (click [Options]), no more need for manually editing the script
- Removed ability to hide the toggle button, it is now required to manage tags
- Button is now always visible on applicable pages to enable taglist management when no torrents were hidden

v1.2.7
- Added toggling the toggle button by changing the toggleButtonEnabled variable's value
- Minor code changes

v1.2.6
- Now runs on individual collage pages

v1.2.5
- The script now also matches HTTPS, in case Emp ever implements SSL
- Toggle button will now show "torrent" instead of "torrents" when there's only one hidden element
