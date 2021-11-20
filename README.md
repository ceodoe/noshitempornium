# NoShitEmpornium
Fully featured filtering solution for Empornium. Hide torrents based on tags, titles, uploaders, whether you previously downloaded it, and lots more!

# Features
- Maintain a blacklist of tags, titles, and uploaders you'd like to automatically hide
- Whitelists to ignore the above blacklist rules
- Filter individual torrents that don't match any of your rules
- Hide uploads based on whether you've grabbed/downloaded it before, or if you're actively leeching/seeding it
- Click a button to see the list of hidden torrents
- Highlighting based on your lists, so you'll always know why a torrent was hidden or whitelisted
- Neat toggle button and GUI to manage lists and settings
- Actively updated
- Lots more!

# Prerequisites
- A supported browser:
  - [Firefox](https://getfirefox.com/) (Recommended!)
  - Chromium-based browsers are also supported (Chrome, Edge, Vivaldi, Brave, etc.)
- The [Tampermonkey](https://tampermonkey.net/) userscript engine addon for your browser

# Note on browsers and userscript engines
Note that NSE is mainly developed on and tested with mainline Firefox and Tampermonkey, and thus Tampermonkey is the only "officially" supported userscript engine. Although I am an avid FF user, I'm not blind to the fact that most of the world uses Chrome, so every release of NSE is also tested and made sure to work on Chromium-based browsers. Waterfox and other comparably niche browser forks and userscript engines might work fully or partly, but are not supported. Thus there is no guarantee it will work on any other combination of browsers and engines aside from FF/Chromium + Tampermonkey.  

# How to install and use
Make sure the checkbox for "Hide tags in lists" is **unchecked** in your user settings on Emp, the script won't be able to access tags if they're hidden (hover over your username at the top right of any page and click Settings). In addition, it is recommended that you increase the value of "Max Tags in lists" to a high number such as 1000, so that torrents with a lot of tags will be correctly handled.

1. Install [Tampermonkey](https://tampermonkey.net/)
1. Install NSE by clicking [here](https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js)
1. Follow the instructions given by Tampermonkey to install the script
1. Once the script is installed, visit an applicable page on Emp (Torrents, Top 10, Collages, Notifications)
1. Click the Options button in the new NSE configuration area (placed below the search center, or near the top of the torrent list area)
1. Add your lists of tags, title phrases or uploaders in the newly revealed areas, and check the Settings tab for more goodies
1. Click the question mark next to each list for an explanation of what it does
1. Click "Save" then "Reload page" to save your options and reload the page

Torrents matching your blacklist rules will now be hidden, and can be shown by clicking the "Toggle X hidden torrents" button. Torrents matching whitelist rules will be shown regardless of blacklist rules. To hide individual torrents, click the eye icon that appears next to it. For more options and information, be sure to check out the settings page within NSE!

You can also check out the latest (and older) changes in the [changelog](https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG.md)!

# Important note on data loss
If you do any of the following:

* Use incognito mode to access Emp
* Clear Emp cookies
* Clear Emp website data/LocalStorage
* Reinstall the same version of the script
* Uninstall then reinstall the script

...all your lists and settings may be deleted. If you're planning to do any of these things, please make sure you back up your settings first, as they are irretrievable once lost.

# Backups
* To **backup** all your NSE data to a file, click the *Export NSE data* button in Options > Settings > Data management. You'll be given a JSON file to download that contains all your settings and filter lists. Store this in a safe place, for example on cloud storage.
* To **restore** all your data from a file, click the *Browse* button below *Import NSE data* and select your previously backed-up JSON file.

If you can't open Emp/NSE (at work, people around, script broken, etc), you can also do it through Tampermonkey:
1. Enter the Tampermonkey dashboard by clicking its icon on your browser toolbar and selecting "Dashboard"
1. Click the "Settings" tab, and set "Config mode" to "Advanced"
1. Go back to the "Installed Userscripts" list, and click on NoShitEmpornium
1. Select the "Storage" tab, and copy-paste all that text into a file, save it to your computer or on cloud storage
1. You have now backed up your settings. To restore them, paste your settings back into the Storage text box and click "Save", or use the import function in Options > Settings > Data management.

The files produced by these two backup methods use the same format (JSON), and such they are interchangeable; a file produced using one method will be able to be imported with the other method.

# Troubleshooting
## The script doesn't load or content isn't being hidden
- [Make sure you are using a supported browser and a supported userscript engine.](https://github.com/ceodoe/noshitempornium#note-on-browsers-and-userscript-engines)
- Make sure there are no foreign characters in any of your filter lists, and that it is properly formatted. The script does some checks to make sure it looks okay, but it can't catch everything. Your lists should be space separated (semicolons for titles), and words within tags are separated by periods, just like the tags on the site.

## Right-clicking torrent titles to open them in a new tab doesn't work anymore
- This is because Right-Click Management is enabled. You can either:
  - Use your mouse's middle button on the link to open it in a new tab
  - Hold down Ctrl, then click the link to open it in a new tab
  - Hold down Shift, then right-click the link to override RCM and show the context menu (Firefox only)
  - Disable Right-Click Management in Options > Settings > Filtering > List management

## There are weird/garbled characters next to all the options
Disable extended unicode support by going to Options > Settings > Interface and unchecking "Enable extended Unicode icons ("emoji")".

## The "Open all unfiltered results" button doesn't work or only opens a single tab
Go to the results tab you clicked the button in, and your browser will tell you that it blocked the website from opening a bunch of popups. To enable popups:
  - **Firefox**: 
    - Click the "Preferences" button next to the popup notice
    - Click the option to always allow popups from Emp
  - **Chromium-based browsers**: 
    - Click the "Pop-up blocked" button that appears in the address bar
    - Choose the option to always allow popups from Emp
    - Click "Done"
    - Click the "Open all unfiltered results" button again

## A bug was found, another issue not listed, or the solution described doesn't work
- [Make sure you are using a supported browser and a supported userscript engine.](https://github.com/ceodoe/noshitempornium#note-on-browsers-and-userscript-engines)
- If you are still experiencing an issue not listed here, or the solution described does not work for you, you may have found a bug. You can create an issue in the GitHub repo, post in the thread on Emp, or send me a message there, and I will do my best to assist you and/or fix the bug.

# Contribute
If you enjoy NSE, consider a donation! I've spent a lot of time making this, and any sum is hugely appreciated.

Bitcoin (BTC): `15YM9XCe5isbf1T8TBjku1BYmyNTj1ZyX9`<br />
Bitcoin Cash (BCH): `qqcuude6a6q09r0a6ujvvklzm6qjrxtr5vfwkxrk34`<br />
Ethereum (ETH): `0xD66eB1CafE88f299929b4FCedCCac3B3D9d7Bee1`<br />
Stellar (XLM): `GD7KXIYO3FTINLBXIJCBMOXVMO4DCXNSLFJTEAIILZAODEMDQRSOT532`

You can also contribute by reporting bugs, submitting feature requests, pull requests, or just generally using NSE to its fullest. Thanks for considering my software.

# [Latest changes](https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG.md)