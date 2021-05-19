# Latest changes
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

---

[(Older versions)](https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG_OLD.md#older-versions)
