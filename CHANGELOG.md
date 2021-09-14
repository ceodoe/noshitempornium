# Latest changes
## v2.6.5
### Features
- NSE now runs on individual torrent details pages. It does not filter out anything on these pages, but all other applicable features work, like Right-Click Management on the taglist, and coloring of tags based on your lists. This is handy for instance for blocking tags from within a torrent details page
- Added an option to control the timeout for GCD support and loading of taglists on torrent detail pages. This is useful if these functions fail for you due to a slower connection/machine (Default is 1500ms, Options > Settings > Interface > Timeout for timed functions)

### Other
- Don't set a timeout for GCD compatibility if we're not on the Torrents page
- Remove leftover comment

---

[(Older versions)](https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG_OLD.md#older-versions)
