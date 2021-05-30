# Latest changes
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

---

[(Older versions)](https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG_OLD.md#older-versions)
