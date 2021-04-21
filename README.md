# NoShitEmpornium
Fully featured filtering solution for Empornium. Hide torrents based on tags, titles, uploaders, whether you previously downloaded it, and lots more!

# Features
- Maintain a blacklist of tags, titles, and uploaders you'd like to automatically hide
- Whitelists to ignore the above blacklist rules
- Filter individual torrents by clicking the new eye icon next to it!
- Hide uploads based on whether you've grabbed/downloaded it before, or if you're actively leeching/seeding it
- Click a button to see the list of hidden torrents
- Highlighting based on your lists, so you'll always know why a torrent was hidden or whitelisted
- Neat toggle button and GUI to manage lists and settings

# Prerequisites
- A supported browser:
  - [Firefox](https://getfirefox.com/) (Recommended!)
  - Chromium-based browsers are also supported
- The [Tampermonkey](https://tampermonkey.net/) userscript engine addon for your browser

# Note on browsers and userscript engines
Note that NSE is mainly developed on and tested with mainline Firefox and Tampermonkey, and thus Tampermonkey is the only "officially" supported userscript engine. Although I am an avid FF user, I'm not blind to the fact that most of the world uses Chrome, so every release of NSE is also tested and made sure to work on Chromium-based browsers. Waterfox and other comparably niche browser forks and userscript engines might work fully or partly, but are not supported. Thus there is no guarantee it will work on any other combination of browsers and engines aside from FF/Chromium + Tampermonkey.  

# How to use
* Make sure the checkbox for "Hide tags in lists" is **unchecked** in your user settings on Emp, the script won't be able to access tags if they're hidden (hover over your username at the top right of any page and click Settings). In addition, it is recommended that you increase the value of "Max Tags in lists" to a high number such as 1000, so that torrents with a lot of tags will be correctly handled.
* Install [Tampermonkey](https://tampermonkey.net/)
* Install NSE by clicking [here](https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js)
* Follow the instructions given by Tampermonkey to install the script
* Once the script is installed, visit an applicable page on Emp (Torrents, Top 10/100/250/500, Collages, Notifications)
* Click the Options button in the new NSE configuration area (placed below the search center, or near the top of the torrent list area)
* Add your lists of tags, title phrases or uploaders in the newly revealed areas, and check the Settings tab for more goodies
* Click the question mark next to each list for an explanation of what it does
* Click "Save" then "Reload page" to save your options and reload the page
* Torrents matching your blacklist rules will now be hidden, and can be shown by clicking the "Toggle X hidden torrents" button. Torrents matching whitelist rules will be shown regardless of blacklist rules. To hide individual torrents, click the eye icon that appears next to it

# Important note
If you:

* Use incognito mode
* Clear Emp cookies
* Clear Emp website data
* Reinstall the same version of the script
* Uninstall then reinstall the script

...all your lists and settings may be deleted. If you're planning to do any of these things, make sure you back up your settings first! 

# Backups
Use the **Export NSE data** button in Options > Settings > Data management to backup all your data to a file. Use the **Import NSE data** button to restore from a file.

You can also do it through Tampermonkey:
* Enter the Tampermonkey dashboard by clicking its icon on your browser toolbar and selecting "Dashboard"
* Click the "Settings" tab, and set "Config mode" to "Advanced"
* Go back to the "Installed Userscripts" list, and click on NoShitEmpornium
* Select the "Storage" tab, and copy-paste all that text into a file, save it to your computer or on cloud storage
* You have now backed up your settings. To restore them, paste your settings back into the Storage text box and click "Save"

# [Click here for changelog](https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG.md)
