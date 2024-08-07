# Latest changes
## v2.7.12
### Features
- Added a floating button to toggle hidden torrents to the bottom right of applicable pages. This is enabled by default, but can be turned off in Options > Settings > Interface > "Enable the floating toggle button".

### Bugfixes
- Fixed a most likely long-standing bug where NSE would fail to appear on Top 10 pages for some users. This seems to be related to lower user classes who don't yet have access to the search form on those pages. The search form was used as a CSS selector for placement of the NSE configuration area and would fail if it wasn't present. The NSE config area will now appear underneath the linkbox, above the search form if present, for all users on Top 10 pages.
 
---

[(Older versions)](https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG_OLD.md#older-versions)
