// ==UserScript==
// @name         NoShitEmpornium
// @namespace    http://www.empornium.me/
// @version      2.5.2
// @description  Fully featured torrent filtering solution for Empornium
// @updateURL    https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js
// @downloadURL  https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js
// @supportURL   https://github.com/ceodoe/noshitempornium/issues
// @homepageURL  https://github.com/ceodoe/noshitempornium/
// @author       ceodoe
// @include      /^https?://www\.empornium\.(me|sx|is)/torrents\.php*/
// @include      /^https?://www\.empornium\.(me|sx|is)/collages\.php.*id=*/
// @include      /^https?://www\.empornium\.(me|sx|is)/top10\.php*/
// @exclude      /^https?://www\.empornium\.(me|sx|is)/torrents\.php.*(\?|&)(type=|id=)/
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_addStyle
// ==/UserScript==
//
// Copyright © 2015-2021 ceodoe
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

let nseVersion = "v2.5.2"

// Load saved lists and options
let nseBlacklistTaglist = GM_getValue("nseTaglist", "enter.illegal.tags.here separated.by.spaces.only no.newlines scat puke blood"); // 3 unchanged names to allow backwards comp
let nseBlacklistTags;

let nseWhitelistTaglist = GM_getValue("nseWhitelist", "whitelist.tags go.here"); // ^
let nseWhitelistTags;

let nseBlacklistTitleList = GM_getValue("nseBlacklistTitles", "this is a title phrase;this is another title phrase");
let nseBlacklistTitlePhrases;

let nseWhitelistTitleList = GM_getValue("nseWhitelistTitles", "this is a title phrase;this is another title phrase");
let nseWhitelistTitlePhrases;

let nseBlacklistUploadersList = GM_getValue("nseUploaders", "putusernameshere separatedbyspacesonly nonewlines"); // ^
let nseBlacklistUploaders;

let nseWhitelistUploadersList = GM_getValue("nseWhitelistUploaders", "putusernameshere separatedbyspacesonly nonewlines");
let nseWhitelistUploaders;

let nseObliviousModeEnabled = GM_getValue("nseObliviousModeEnabled", false);
let nseRussianRouletteEnabled = GM_getValue("nseRussianRouletteEnabled", false);
let nseHideAnonUploadsEnabled = GM_getValue("nseHideAnonUploadsEnabled", false);
let nseHideWarnedEnabled = GM_getValue("nseHideWarnedEnabled", false);
let nseHideReportedEnabled = GM_getValue("nseHideReportedEnabled", false);
let nseHideSnatchedEnabled = GM_getValue("nseHideSnatchedEnabled", false);
let nseHideSeedingEnabled = GM_getValue("nseHideSeedingEnabled", false);
let nseHideGrabbedEnabled = GM_getValue("nseHideGrabbedEnabled", false);
let nseHideLeechingEnabled = GM_getValue("nseHideLeechingEnabled", false);
let nseBypassWhitelistsEnabled = GM_getValue("nseBypassWhitelistsEnabled", false);
let nseRightClickManagementEnabled = GM_getValue("nseRightClickManagementEnabled", true);
let nseEmojiEnabled = GM_getValue("nseEmojiEnabled", true);
let nseEveryDayIsApril1st = GM_getValue("nseEveryDayIsApril1st", false);
let nseScrollToNSEEnabled = GM_getValue("nseScrollToNSEEnabled", false);

let nseSelectedTheme = GM_getValue("nseSelectedTheme", "nseThemeDefault");
let nseCustomTheme = GM_getValue("nseCustomTheme", {
    backgroundColor: "#fff",
    backgroundHighlightColor: "#cfe7ff",
    foregroundColor: "#000",
    accentColor: "#0af",
    highlightColor: "#0071b0"
});

let nseCustomCSSEnabled = GM_getValue("nseCustomCSSEnabled", false);
let nseCustomCSS = GM_getValue("nseCustomCSS", "/* With great power comes great responsibility */");

let nseIndividualUploadHidingEnabled = GM_getValue("nseIndividualUploadHidingEnabled", true);
let nseIndividualUploadHidingBlacklist = GM_getValue("nseIndividualUploadHidingBlacklist", new Array(0));
let nseIndividualUploadHidingWhitelist = GM_getValue("nseIndividualUploadHidingWhitelist", new Array(0));

let nseEnableGCDCompatibilityMode = GM_getValue("nseEnableGCDCompatibilityMode", false);


// Initialize tag lists
nseBlacklistTaglist = nseBlacklistTaglist.trim();
nseBlacklistTags = nseBlacklistTaglist.split(" ");

nseWhitelistTaglist = nseWhitelistTaglist.trim();
nseWhitelistTags = nseWhitelistTaglist.split(" ");

// Initialize title lists
nseBlacklistTitleList = nseBlacklistTitleList.trim();
nseBlacklistTitlePhrases = nseBlacklistTitleList.split(";");

nseWhitelistTitleList = nseWhitelistTitleList.trim();
nseWhitelistTitlePhrases = nseWhitelistTitleList.split(";");

// Initialize uploader lists
nseBlacklistUploadersList = nseBlacklistUploadersList.trim();
nseBlacklistUploaders = nseBlacklistUploadersList.split(" ");

nseWhitelistUploadersList = nseWhitelistUploadersList.trim();
nseWhitelistUploaders = nseWhitelistUploadersList.split(" ");
// End of initialization


// Define themes
let themes = {
    nseThemeDefault:
        {
            backgroundColor: "#fff",
            backgroundHighlightColor: "#cfe7ff",
            foregroundColor: "#000",
            accentColor: "#0af",
            highlightColor: "#0071b0"
        },
    nseThemeLegacy:
        {
            backgroundColor: "#00f",
            backgroundHighlightColor: "#44f",
            foregroundColor: "#fff",
            accentColor: "#ddd",
            highlightColor: "#fff"
        },
    nseThemeEdgy:
        {
            backgroundColor: "#000",
            backgroundHighlightColor: "#333",
            foregroundColor: "#f00",
            accentColor: "#f22",
            highlightColor: "#f22"
        },
    nseThemeBaked:
        {
            backgroundColor: "#8300ff",
            backgroundHighlightColor: "#087300",
            foregroundColor: "#0a8700",
            accentColor: "#b669ff",
            highlightColor: "#b669ff"
        },
    nseThemeCustom:
        {
            backgroundColor: nseCustomTheme["backgroundColor"],
            backgroundHighlightColor: nseCustomTheme["backgroundHighlightColor"],
            foregroundColor: nseCustomTheme["foregroundColor"],
            accentColor: nseCustomTheme["accentColor"],
            highlightColor: nseCustomTheme["highlightColor"]
        }
};

// Reenable torrent icon box and hide comments if GCD mode is on, using a timer is the best I can do
if(window.location.href.includes("torrents.php")) { //torrents.php is the only page we have in common
    if(nseEnableGCDCompatibilityMode) {
        window.setTimeout(function () {
            // Reenable all torrent icon boxes
            let iconContainers = document.querySelectorAll("span.torrent_icon_container");
            for(let a = 0; a < iconContainers.length; a++) {
                iconContainers[a].style.display = "flex";
            }

            // Hide all comment icons GCD creates
            let commentElements = document.querySelectorAll("a.comment");
            for(let b = 0; b < commentElements.length; b++) {
                commentElements[b].style.display = "none";
            }

            // Bring all eyes to the front of the z-index as they are obscured by the div.version element
            let allEyes = document.querySelectorAll(".nseToggleHideButton");
            for(let c = 0; c < allEyes.length; c++) {
                allEyes[c].style.zIndex = "1";
            }
        },1500); // This should be enough time for any modern-ish machine to run through GCD's code before we look for its elements
    }
}

let nseEnableApril1stOption = false;
if(nseBlacklistTags.includes("hehehehehe")) {
    nseEnableApril1stOption = true;
}

// Set up reference node to place our html
let referenceNodeList = {"top10.php": "#content > div > form",      // TopX pages
                         "action=notify": "#content > div > h2",    // Notifications
                         "collages.php?": "div.clear:nth-child(6)"  // Collage pages
};

let referenceNode = document.querySelector("div#filter_slidetoggle"); // Default/Torrents.php

for(let rni = 0; rni < Object.keys(referenceNodeList).length; rni++) {
    if(window.location.href.includes(Object.keys(referenceNodeList)[rni])) {
        referenceNode = document.querySelector(referenceNodeList[Object.keys(referenceNodeList)[rni]]);
        break;
    }
}

// Start HTML section
let htmlContent = document.createElement("div");
htmlContent.innerHTML = `
<div id="nseOuter" class="nseOuterDiv">
    <div id="nseHeader">
        <span id="nseHeaderText">NoShitEmpornium</span>
        <span id="nseToggleOptionsNode" class="nseNiceButton">Options</span><span id="nseDynamicRefreshNode" class="nseNiceButton hidden" title="Reload the page to apply your changes" onclick="javascript:location.reload();">🗘</span>
    </div>
    <div id="nseMainDiv" class="nseMainBox hidden">
        <input class="nseRadioButton" id="nseTab1" type="radio" name="tabs" checked>
        <label class="nseLabel" for="nseTab1"><span class="nseEmoji">🏷️</span> Tags</label>

        <input class="nseRadioButton" id="nseTab2" type="radio" name="tabs">
        <label class="nseLabel" for="nseTab2"><span class="nseEmoji">📚</span> Titles</label>

        <input class="nseRadioButton" id="nseTab3" type="radio" name="tabs">
        <label class="nseLabel" for="nseTab3"><span class="nseEmoji">👥</span> Uploaders</label>

        <input class="nseRadioButton" id="nseTab4" type="radio" name="tabs">
        <label class="nseLabel" for="nseTab4"><span class="nseEmoji">⚙️</span> Settings</label>

        <section id="nseContent1">
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTagBlacklistHeader"><span class="nseEmoji">👎</span> Tag blacklist <small>(space-separated)</small></span><sup class="nseExplanationToggler" id="nseBLEToggler">[?]</sup><br />
                <div id="nseBLE" class="nseExplanationBox hidden">
                    <div class="nseExplanationNode">
                        <b>TL;DR</b>: <i>If any of these tags exist, hide the torrent</i>
                    </div>

                    <div class="nseExplanationNode">
                        This is where you specify tags you don't want to see. Any torrent matching 
                        any of these tags will be hidden unless overridden by any of the whitelist 
                        rules. The correct format for this field is the same used for tags on 
                        Empornium itself: Tags are separated by spaces, and uses a period between 
                        words within a tag. Character case does not matter. Blacklisted tags will be 
                        highlighted in <span style="color:#f00"><b>red</b></span> when viewing 
                        hidden torrents.
                    </div>

                    <div class="nseExplanationNode">
                        Example:<br />
                        <pre>scat piss.drinking jerk.off.instruction non.nude</pre>
                    </div>
                </div>
                <textarea class="nseTextArea" id="nseBlacklistTaglistArea" rows=10>${nseBlacklistTaglist}</textarea>
            </div>
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTagWhitelistHeader"><span class="nseEmoji">👍</span> Tag whitelist <small>(space-separated)</small></span><sup class="nseExplanationToggler" id="nseWLEToggler">[?]</sup><br />
                <div id="nseWLE" class="nseExplanationBox hidden">
                    <div class="nseExplanationNode">
                        <b>TL;DR</b>: <i>If any of these tags exist, ignore all other rules and show the torrent</i>
                    </div>

                    <div class="nseExplanationNode">
                        This is where you specify tags you want to show regardless of all other 
                        rules. In other words, no matter if the torrent matches on tags, title or 
                        uploader blacklists &mdash; if it contains any of these whitelisted tags, it 
                        will be shown regardless. The correct format for this field is the same used 
                        for tags on Empornium itself: Tags are separated by spaces, and uses a 
                        period between words within a tag. Character case does not matter. 
                        Whitelisted tags will be highlighted in 
                        <span style="color:#0f0"><b>green</b></span>.
                    </div>

                    <div class="nseExplanationNode">
                        Example:<br />
                        <pre>sasha.grey huge.ass gianna.michaels femdom</pre>
                    </div>
                </div>
                <textarea class="nseTextArea" id="nseWhitelistTaglistArea" rows=10>${nseWhitelistTaglist}</textarea>
            </div>
        </section>

        <section id="nseContent2">
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTitleBlacklistHeader"><span class="nseEmoji">👎</span> Title blacklist <small>(semicolon-separated)</small></span><sup class="nseExplanationToggler" id="nseTitleBLEToggler">[?]</sup><br />
                <div id="nseTitleBLE" class="nseExplanationBox hidden">
                    <div class="nseExplanationNode">
                        <b>TL;DR</b>: <i>If any of these phrases are in the title, hide the torrent</i>
                    </div>

                    <div class="nseExplanationNode">
                        This is where you specify title phrases you want to filter on. This is 
                        useful for hiding untagged content with a recurring theme (for example 
                        specific JAV series you don't care about, or re-encoded content). 
                        Character case does not matter. <b>Title phrases are separated by 
                        semicolons <span class="nseRCMMonospace">;</span> &mdash; not spaces, unlike tags or uploaders!</b>
                    </div>

                    <div class="nseExplanationNode">
                        Example:<br />
                        <pre>sdmm;hikr;princess peach;reencode</pre>
                    </div>
                </div>
                <textarea class="nseTextArea" id="nseBlacklistTitleListArea" rows=10>${nseBlacklistTitleList}</textarea>
            </div>
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTitleWhitelistHeader"><span class="nseEmoji">👍</span> Title whitelist <small>(semicolon-separated)</small></span><sup class="nseExplanationToggler" id="nseTitleWLEToggler">[?]</sup><br />
                <div id="nseTitleWLE" class="nseExplanationBox hidden">
                    <div class="nseExplanationNode">
                        <b>TL;DR</b>: <i>If any of these phrases are in the title, ignore all other rules and show the torrent</i>
                    </div>

                    <div class="nseExplanationNode">This is where you specify title phrases you want to show regardless of other rules. Character case does not matter. <b>Title phrases are separated by semicolons <span class="nseRCMMonospace">;</span> &mdash; not spaces like tags or uploaders!</b>
                    </div>

                    <div class="nseExplanationNode">Example:<br /><pre>minipack;super mario;sdmm;moist</pre></div>
                </div>
                <textarea class="nseTextArea" id="nseWhitelistTitleListArea" rows=10>${nseWhitelistTitleList}</textarea>
            </div>
        </section>

        <section id="nseContent3">
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseUploaderBlacklistHeader"><span class="nseEmoji">👎</span> Uploader blacklist <small>(space-separated)</small></span><sup class="nseExplanationToggler" id="nseUBLEToggler">[?]</sup><br />
                <div id="nseUBLE" class="nseExplanationBox hidden">
                    <div class="nseExplanationNode">
                        <b>TL;DR</b>: <i>If this torrent is uploaded by any of these users, hide it</i>
                    </div>

                    <div class="nseExplanationNode">
                        This is where you specify the names of uploaders you want to hide all 
                        uploads from, unless overriden by a whitelist rule. Uploader names will be 
                        highlighted in <span style="color:#f00"><b>red</b></span> when viewing 
                        hidden torrents. Character case does not matter. Note that filtering based 
                        on usernames will not function on collage pages, as torrent uploaders are 
                        not exposed on those pages.
                    </div>

                    <div class="nseExplanationNode">
                        Example:<br />
                        <pre>SuperUploader2007 LowQualityUploadsIncorporated</pre>
                    </div>
                </div>
                <textarea class="nseTextArea" id="nseBlacklistUploadersArea" rows=10>${nseBlacklistUploadersList}</textarea>
            </div>
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseUploaderWhitelistHeader"><span class="nseEmoji">👍</span> Uploader whitelist <small>(space-separated)</small></span><sup class="nseExplanationToggler" id="nseUWLEToggler">[?]</sup><br />
                <div id="nseUWLE" class="nseExplanationBox hidden">
                    <div class="nseExplanationNode">
                        <b>TL;DR</b>: <i>If this torrent is uploaded by any of these users, show it regardless of any other rules</i>
                    </div>

                    <div class="nseExplanationNode">
                        This is where you specify the names of uploaders you want to show all 
                        uploads from, regardless of any blacklist rules. Uploader names will be 
                        highlighted in <span style="color:#0f0"><b>green</b></span>. Character case 
                        does not matter. Note that filtering based on usernames will not function on 
                        collage pages, as torrent uploaders are not exposed on those pages.
                    </div>

                    <div class="nseExplanationNode">
                        Example:<br />
                        <pre>NobelPrizeWinningUploads ActuallyGreatUploader69 ceodoe</pre>
                    </div>
                </div>
                <textarea class="nseTextArea" id="nseWhitelistUploadersArea" rows=10>${nseWhitelistUploadersList}</textarea>
            </div>
        </section>

        <section id="nseContent4">
            <input class="nseRadioButton" id="nseSettingsTab1" type="radio" name="settingsTabs" checked>
            <label class="nseLabel" for="nseSettingsTab1"><span class="nseEmoji">🔍</span> Filtering</label>

            <input class="nseRadioButton" id="nseSettingsTab2" type="radio" name="settingsTabs">
            <label class="nseLabel" for="nseSettingsTab2"><span class="nseEmoji">🖥️</span> Interface</label>

            <input class="nseRadioButton" id="nseSettingsTab3" type="radio" name="settingsTabs">
            <label class="nseLabel" for="nseSettingsTab3"><span class="nseEmoji">🗃️</span> Data management</label>

            <input class="nseRadioButton" id="nseSettingsTab4" type="radio" name="settingsTabs">
            <label class="nseLabel" for="nseSettingsTab4"><span class="nseEmoji">ℹ️</span> About</label>

            <section id="nseSettingsContent1">
                <h3>Filtering</h3>
                <p>
                    <b>Individual uploads</b><br />
                    <input type="checkbox" id="nseCheckIndividualHide"${nseIndividualUploadHidingEnabled ? ' checked' : ''} />
                    <label for="nseCheckIndividualHide" class="nseSettingsCheckbox">
                        <span class="nseEmoji">👁️</span> Enable individual upload filtering
                    </label><br />
                    <span class="nseExplanationSpan" style="margin-left: 60px;">(Click the eye icon next to the torrent name to blacklist/whitelist uploads</span><br />
                    <span class="nseExplanationSpan" style="margin-left: 60px;">individually, ignoring <b>all</b> other rules. These filters are automatically saved)</span><br /><br />

                    <input type="checkbox" id="nseCheckGCDCompatibilityMode"${nseEnableGCDCompatibilityMode ? ' checked' : ''} />
                    <label for="nseCheckGCDCompatibilityMode" class="nseSettingsCheckbox">
                        <span class="nseEmoji">📃</span> Enable support for individual filtering when using <i>Gazelle Collapse Duplicates</i>
                    </label><br />
                    <span class="nseExplanationSpan" style="margin-left: 60px;">(This is experimental and might not work as expected, you have been warned.</span><br />
                    <span class="nseExplanationSpan" style="margin-left: 60px;">Interoperability with other scripts cannot be guaranteed)</span><br /><br />

                    <b>List management</b><br />
                    <input type="checkbox" id="nseCheckRightClickManagementEnabled"${nseRightClickManagementEnabled ? ' checked' : ''} />
                    <label for="nseCheckRightClickManagementEnabled" class="nseSettingsCheckbox">
                        <span class="nseEmoji">🖱️</span> Enable Right-Click Management
                    </label><br />
                    <span class="nseExplanationSpan" style="margin-left: 60px;">(Right-click a tag/title/uploader in the torrent list to add/remove from your lists)</span><br /><br />

                    <b>Torrent site status</b><br />
                    <input type="checkbox" id="nseCheckHideAnonUploads"${nseHideAnonUploadsEnabled ? ' checked' : ''} />
                    <label for="nseCheckHideAnonUploads" class="nseSettingsCheckbox">
                        <span class="nseEmoji">👤</span> Hide all anonymous uploads
                    </label>
                    <span class="nseExplanationSpan">(Will still be overridden by whitelist rules)</span><br />

                    <input type="checkbox" id="nseCheckHideReported"${nseHideReportedEnabled ? ' checked' : ''} />
                    <label for="nseCheckHideReported" class="nseSettingsCheckbox">
                        <span class="nseEmoji">⛔</span> Hide reported uploads
                    </label>
                    <span class="nseExplanationSpan">(Hide torrents with active reports, whitelists will override)</span><br />

                    <input type="checkbox" id="nseCheckHideWarned"${nseHideWarnedEnabled ? ' checked' : ''} />
                    <label for="nseCheckHideWarned" class="nseSettingsCheckbox">
                        <span class="nseEmoji">⚔️</span> Hide warned uploads
                    </label>
                    <span class="nseExplanationSpan">(Hide torrents with active warning, whitelists will override)</span><br /><br />

                    <b>Torrent personal status</b><br />
                    <input type="checkbox" id="nseCheckHideGrabbed"${nseHideGrabbedEnabled ? ' checked' : ''} />
                    <label for="nseCheckHideGrabbed" class="nseSettingsCheckbox">
                        <span class="nseEmoji">💾</span> Hide grabbed uploads
                    </label>
                    <span class="nseExplanationSpan">(Hide torrents you have previously grabbed)</span><br />

                    <input type="checkbox" id="nseCheckHideLeeching"${nseHideLeechingEnabled ? ' checked' : ''} />
                    <label for="nseCheckHideLeeching" class="nseSettingsCheckbox">
                        <span class="nseEmoji">⏬</span> Hide leeching uploads
                    </label>
                    <span class="nseExplanationSpan">(Hide torrents you are currently leeching)</span><br />

                    <input type="checkbox" id="nseCheckHideSeeding"${nseHideSeedingEnabled ? ' checked' : ''} />
                    <label for="nseCheckHideSeeding" class="nseSettingsCheckbox">
                        <span class="nseEmoji">⏫</span> Hide seeding uploads
                    </label>
                    <span class="nseExplanationSpan">(Hide torrents you are currently seeding)</span><br />

                    <input type="checkbox" id="nseCheckHideSnatched"${nseHideSnatchedEnabled ? ' checked' : ''} />
                    <label for="nseCheckHideSnatched" class="nseSettingsCheckbox">
                        <span class="nseEmoji">💽</span> Hide snatched uploads
                    </label>
                    <span class="nseExplanationSpan">(Hide torrents you have already downloaded/snatched)</span><br /><br />

                    <input type="checkbox" id="nseCheckBypassWhitelists"${nseBypassWhitelistsEnabled ? ' checked' : ''} />
                    <label for="nseCheckBypassWhitelists" class="nseSettingsCheckbox">
                        <span class="nseEmoji">💫</span> Bypass whitelists for personal status filtering
                    </label><br />
                    <span class="nseExplanationSpan" style="margin-left: 60px;">(Ignore all whitelists when filtering grabbed/leeching/seeding/snatched torrents)</span><br />
                </p>
            </section>

            <section id="nseSettingsContent2">
                <h3>Interface</h3>
                
                <div>
                    <input type="checkbox" id="nseCheckObliviousMode"${nseObliviousModeEnabled ? ' checked' : ''} />
                    <label for="nseCheckObliviousMode" class="nseSettingsCheckbox">
                        <span class="nseEmoji">❓</span> Oblivious
                    </label>
                    <span class="nseExplanationSpan">(Hide torrent tag lists)</span><br />

                    <input type="checkbox" id="nseCheckCustomCSS"${nseCustomCSSEnabled ? ' checked' : ''} />
                    <label for="nseCheckCustomCSS" class="nseSettingsCheckbox">
                        <span class="nseEmoji">📜</span> Custom CSS
                    </label>
                    <span class="nseExplanationSpan">(Define your own CSS rules)</span><br />
                    <div id="nseCustomCSSDiv" ${nseCustomCSSEnabled ? '' : 'class="hidden"'}>
                        Define your custom CSS below. Note that this code is injected at the very end of the built-in CSS, so use the !important tag liberally to overwrite existing rules. Do not escape backslashes, it will be done automatically. Avoid using backticks. <br />
                        <textarea class="nseTextArea" id="nseCustomCSSArea" rows=10>${nseCustomCSS.replace(/\\\\/gi,"\\")}</textarea>
                    </div>

                    <input type="checkbox" id="nseCheckScrollToNSEEnabled"${nseScrollToNSEEnabled ? ' checked' : ''} />
                    <label for="nseCheckScrollToNSEEnabled" class="nseSettingsCheckbox">
                        <span class="nseEmoji">⚓</span> Automatically scroll to NSE on page load
                    </label>
                    <span class="nseExplanationSpan">(Makes browsing several pages easier)</span><br />

                    <input type="checkbox" id="nseCheckEmojiEnabled"${nseEmojiEnabled ? ' checked' : ''} />
                    <label for="nseCheckEmojiEnabled" class="nseSettingsCheckbox">
                        <span class="nseEmoji">🖼️</span> Enable extended Unicode icons ("emoji")
                    </label>
                    <span class="nseExplanationSpan">(Disable if you see garbled characters)</span><br /><br />
                
                    Theme:<br />
                    <select name="nseThemeDropdown" id="nseThemeDropdown">
                        <option value="nseThemeDefault" ${nseSelectedTheme=="nseThemeDefault" ? "selected='selected'" : ''}>Default</option>
                        <option value="nseThemeLegacy" ${nseSelectedTheme=="nseThemeLegacy" ? "selected='selected'" : ''}>Legacy</option>
                        <option value="nseThemeEdgy" ${nseSelectedTheme=="nseThemeEdgy" ? "selected='selected'" : ''}>Edgy</option>
                        <option value="nseThemeBaked" ${nseSelectedTheme=="nseThemeBaked" ? "selected='selected'" : ''}>Baked</option>
                        <option value="nseThemeCustom" ${nseSelectedTheme=="nseThemeCustom" ? "selected='selected'" : ''}>Custom</option>
                    </select>
                    <span id="nseThemeDescription" class="nseExplanationSpan">${nseSelectedTheme=="nseThemeDefault" ? "White background with black text and blue accents" : ''}${nseSelectedTheme=="nseThemeLegacy" ? "Ye Olde Theme with a blue background and white text" : ''}${nseSelectedTheme=="nseThemeEdgy" ? "For the edgelord in all of us, red text on a black background" : ''}${nseSelectedTheme=="nseThemeBaked" ? "Ayyyy 420 blaze it &mdash; Green and purple" : ''}${nseSelectedTheme=="nseThemeCustom" ? "Define your own colors using the text boxes below" : ''}</span>

                    <div id="nseCustomThemeDiv" ${nseSelectedTheme=="nseThemeCustom" ? '' : 'class="hidden"'}>
                        <p>
                            You can use any <a class="nseLink" href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value" target="_blank">CSS color notation</a> here.<br />
                            Examples: <span style="font-family: Courier New;">#ffffff &mdash; rgb(0,0,255) &mdash; aquamarine</span>
                        </p>
                        <p>
                            Background color:<br />
                            <input type="text" id="nseCustomThemeBgCol" value='${nseCustomTheme['backgroundColor']}' />
                        </p>
                        <p>
                            Background highlight color:<br />
                            <input type="text" id="nseCustomThemeBgHighCol" value='${nseCustomTheme['backgroundHighlightColor']}' />
                        </p>
                        <p>
                            Foreground color:<br />
                            <input type="text" id="nseCustomThemeForeCol" value='${nseCustomTheme['foregroundColor']}' />
                        </p>
                        <p>
                            Accent color:<br />
                            <input type="text" id="nseCustomThemeAccentCol" value='${nseCustomTheme['accentColor']}' />
                        </p>
                        <p>
                            Highlight color:<br />
                            <input type="text" id="nseCustomThemeHighCol" value='${nseCustomTheme['highlightColor']}' />
                        </p>

                        <p>Remember to click the [Save] button to save your changes!</p>
                    </div>
                </div>
                
                <div style="margin-top: 20px; margin-bottom: 20px;">
                    <b>"Fun"</b><br />
                    <input type="checkbox" id="nseCheckRussianRouletteMode"${nseRussianRouletteEnabled ? ' checked' : ''} />
                    <label for="nseCheckRussianRouletteMode" class="nseSettingsCheckbox">
                        <span class="nseEmoji">🎲</span> Russian Roulette
                    </label>
                    <span class="nseExplanationSpan">(Randomly and silently show filtered torrents)</span><br />

                    ${nseEnableApril1stOption ? `<input type="checkbox" id="nseCheckApril1stAllYear"${nseEveryDayIsApril1st ? ' checked' : ''} />
                    <label for="nseCheckApril1stAllYear" class="nseSettingsCheckbox">
                        <span class="nseEmoji">🤪</span> Every day is April 1st
                    </label>
                    <span class="nseExplanationSpan">(For the masochists among us)</span>` : ''}
                </div>
            </section>

            <section id="nseSettingsContent3">
                <h3>Data management</h3>
                <p>
                    <span class="nseExplanationSpan">Use these functions to import, export or reset all your NSE lists and settings.</span>
                    <div class="nseNiceBox"><span class="nseEmoji">⤵️</span> Import NSE data<br />
                        <input type="file" accept=".json,text/plain" id="nseImportFilePicker">
                    </div><br />
                    <span class="nseNiceButton" id="nseExportButton"><span class="nseEmoji">⤴️</span> Export NSE data</span> 
                    <span class="nseNiceButton" id="nseEraseDataButton"><span class="nseEmoji">🔄</span> Reset NSE data</span><br /><br />
                    
                    <span class="nseExplanationSpan"><b>IMPORTANT: Data overwritten or reset by the functions above is <i>not</i> recoverable!</b></span>
                </p>
            </section>

            <section id="nseSettingsContent4">
                <h3>About</h3>
                <p>
                    Copyright &copy; 2015-2021 ceodoe. NoShitEmpornium ${nseVersion} was made with ${nseEmojiEnabled ? '💕' : 'love'} by <a class="nseLink" href="/user.php?id=508194">ceodoe</a> of Empornium, and its code is licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.txt" target="_blank">GNU General Public License v3.0</a>.
                </p>

                <h3>Resources</h3>
                <p>
                    <b>
                        <span class="nseEmoji">🐙</span> <a class="nseLink" href="https://github.com/ceodoe/noshitempornium" target="_blank">Report a bug or view commit history on GitHub</a><br />
                        
                        <span class="nseEmoji">📋</span> <a class="nseLink" href="https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG.md" target="_blank">Read the NSE changelog</a><br />
                        
                        <span class="nseEmoji">🧵</span> <a class="nseLink" href="/forum/thread/44258?postid=956045#post956045" target="_blank">Read the official forum thread on Emp</a>
                    </b>
                </p>
            </section>
        </section>

        <div style="text-align: center;">
            <span id="nseSaveButton" class="nseNiceButton"><span class="nseEmoji">💾</span> Save</span>
            <span id="nseReloadButton" class="nseNiceButton"><span class="nseEmoji">🔃</span> Reload page and apply changes</span> 
            <span id="nseCloseOptionsButton" class="nseNiceButton"><span class="nseEmoji">❌</span> Close options</span>
        </div>

        <div style="text-align: center;" id="nseSaveDiv" class="hidden">

        </div>
    </div>
</div>

<div id="nseRCMBox" class="hidden">
    <div id="nseRCMClose">${nseEmojiEnabled ? '❌' : '<span style="color:red"><b><big>X</big></b></span>'}</div>
    <p id="nseRCMBoxInfoText">Tag/uploader placeholder text</p>
    <p id="nseRCMBoxChoices">

    </p>
    <p><small>Your settings will be automatically saved when you choose one of the above options. Your changes will reflect in the torrent list once the page is <span class="nseSpanLink" onclick="location.reload();"><b>reloaded</b></a>.</small></p>
</div>
`;

referenceNode.parentNode.insertBefore(htmlContent, referenceNode.nextSibling);
// End HTML section

if(nseScrollToNSEEnabled) {
    document.getElementById("nseOuter").scrollIntoView();
}

// Main filtering loop - for every torrent:
let count = 0;
let torrents = document.querySelectorAll("tr.torrent");

for(let i = 0; i < torrents.length; i++) {
    let tagElement = torrents[i].querySelector("td > div.tags");

    if(tagElement === null || tagElement === undefined) {
        continue; // skip to next iteration if we can't get taglist,
                  // I've seen rows break on rare occasions in the source HTML
    }

    let russianRouletteBulletInChamber = false;
    if(nseRussianRouletteEnabled == true) {
        let randNum = Math.floor(Math.random() * 6) + 1; // 1/6 chance to fire
        if(randNum == 6) {
            russianRouletteBulletInChamber = true;
        }
    }

    let uploaderElement = torrents[i].querySelector("td.user > a");
    let titleElement;

    if(window.location.href.includes("collages.php")) {
        titleElement = torrents[i].querySelector("td > strong > a");
    } else {
        titleElement = torrents[i].querySelector("td > a");
    }

    // Add classes for right-click management, if enabled
    if(nseRightClickManagementEnabled) {
        titleElement.classList.add("nseTitleElement");
    }

    let currentHidden = false;
    let currentWhitelisted = false;
    let currentBypassWhitelist = false;
    let currentForceHide = false;
    let currentForceShow = false;

    // Check if we are adding the hide button
    if(nseIndividualUploadHidingEnabled) {
        let torrentIconContainer = torrents[i].querySelector("td > span.torrent_icon_container");

        let nseToggleHideElement = document.createElement("span");
        nseToggleHideElement.className = "icon";
        nseToggleHideElement.innerHTML = `
        <div class="icon_container">
            <div class="icon_stack">
                <i class="font_icon torrent_icons clickable">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAC6npUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7ZdtktwoDIb/c4ocAUkIieNgPqpygz1+XrDb0z2T3SS1+2urTdlggSX5fWR6Joy/vs/wDQeVzCGpeS45RxyppMIVA4/nUfaVYtrX84avOXq1h3uCYRL0ct5avdZX2PXjgUcMOl7twa8Z9ssR3Y73ISvyGvfnJGHn007pclTGOcjF7TnV43LUroU7letMd1pnt+7Di8GgUlcEEuYhJHFf/cxAzrMu+75CFYl7zEJhd493hSAvr/foY3wW6EXkxyh8Vv8efRKf62WXT1rmSyMMfjpB+skudxh+Dix3Rvw6YfJw9VXkObvPOc63qylD0XxV1BabHm6w8IDksh/LaIZTMbbdCprHGhuQ99jigdaoEEP9GShRp0qTxu4bNaSYeLChZ24AsmwuxoUbGJGk1WiySZEuDliNRxCBme9caMctO14jR+ROWMoEZ4RH/raFf5r8kxbmbEsiin5rhbx41TXSWOTWFasAhObFTbfAj3bhj0/1s0o1YdmS2fGCNR6ni0Ppo7ZkcxasU/TnJ0TB+uUAEiG2IhkUf6KYSZQyRWM2IujoAFSROUviAwRIlTuS5CSC/cjYecXGM0Z7LStnXmbsTQChksXApkgFrJQU9WPJUUNVRZOqZjX1oEVrlpyy5pwtr02umlgytWxmbsWqiydXz27uXrwWLoI9UEsuVryUUiuHikAVvirWV1gOPuRIhx75sMOPctSG8mmpacvNmrfSaucuHdtEz92699LroDCwU4w0dORhw0cZdaLWpsw0deZp02eZ9aZ2Uf3S/oAaXdR4k1rr7KYGazB7uKC1nehiBmKcCMRtEUBB82IWnVLiRW4xi4XxUSgjSV1sQqdFDAjTINZJN7sPcr/FLaj/Fjf+Fbmw0P0X5ALQfeX2E2p9/c61Tez8CpemUfD1YX54Dex1/ajVf9u/Hb0dvR29Hb0dvR29Hf0PHE388YB/YsMPGOidZZTdxfYAAAGFaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBiG37ZKpVYcLCLikKE6WRAVESetQhEqhFqhVQeTS/+gSUOS4uIouBYc/FmsOrg46+rgKgiCPyBOjk6KLlLid0mhRYx3HPfw3ve+3H0H+OtlppodY4CqWUYqERcy2VUh+IoQzX50Y0Zipj4nikl4jq97+Ph+F+NZ3nV/jh4lZzLAJxDPMt2wiDeIpzYtnfM+cYQVJYX4nHjUoAsSP3JddvmNc8FhP8+MGOnUPHGEWCi0sdzGrGioxJPEUUXVKN+fcVnhvMVZLVdZ8578heGctrLMdVpDSGARSxAhQEYVJZRhIUa7RoqJFJ3HPfyDjl8kl0yuEhg5FlCBCsnxg//B796a+YlxNykcBzpfbPtjGAjuAo2abX8f23bjBAg8A1day1+pA9OfpNdaWvQI6N0GLq5bmrwHXO4AA0+6ZEiOFKDlz+eB9zP6pizQdwuE1ty+Nc9x+gCkqVfJG+DgEBgpUPa6x7u72vv2b02zfz9/THKseNROhQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+QKChYVGrZwy10AAAF0SURBVDjL3dK/S9ZhFAXwj74ZvoXwllAKiSZYQ0uIQaND0BKUjQ1ODYIOBiKIEA1RNLWECIUQqIuL4BJFFoElmhjakk4a+YMgQYkIhVqu8PDw/gHRnZ7vufd7OPeew79WheR9ErcxF3g1zqMdF1CJPRyUIzqSvKvQiz94h5f4hvXoN6MeixjGC/wqR1qDFnxCX4IXQ91h3cAbvEZdTnIG27iCElbxAOcwH9/v0ZScpAc/Yn1wHNPoTIiPYgP34qcCurGLU8ncTXyIbXTgeabwetxjFgMJ/gjj2ewIbsECLmfNVdTiBL7iaeLsWjbbiqXKsLs1a37HReygAVdDWQEr2WxbuOxsWHo6aXZgM7lHETO4n5HUh5DGQ+BOHPdYMtSPn3iCwYjGOh5Hv4QtdKXJno1AjuFzqHmLqYhANT7ibhCV8BtfMAQVmdR2PMQ+XkWG1iLtTbiECYxiMl21okzCi3HoaxG22sB3QsGzMGMmbF/2f9dfX9xN/BNad7IAAAAASUVORK5CYII=" />
                </i>
            </div>
        </div>
        `;

        nseToggleHideElement.title = "Filter this torrent with NSE";
        nseToggleHideElement.classList.add("nseToggleHideButton");

        let actualIcon = nseToggleHideElement.querySelector("div > div > i");
        let torrentID = titleElement.href.match(/([0-9]+)/)[0];
        actualIcon.torrentID = torrentID;
        actualIcon.onclick = function() {
            let torrentParent = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

            if(torrentParent.getAttribute("isNSEHidden") == null) {
                torrentParent.setAttribute("isNSEHidden", "0");
            }

            if(torrentParent.getAttribute("isNSEHidden") === "1") {
                // Blacklisted, move to whitelist and unhide
                let currindex = nseIndividualUploadHidingBlacklist.indexOf(this.torrentID);
                if(currindex > -1) {
                    nseIndividualUploadHidingBlacklist.splice(currindex, 1);
                }

                currindex = nseIndividualUploadHidingWhitelist.indexOf(this.torrentID);
                if(currindex == -1) { // Only add if not already whitelisted to avoid duplicates
                    nseIndividualUploadHidingWhitelist.push(this.torrentID);
                }

                torrentParent.classList.toggle("hidden");
                torrentParent.setAttribute("isNSEHidden", "0");
                torrentParent.style.backgroundColor = null;

                adjustHiddenHeaderCount(-1);

                this.classList.add("nseIndividuallyWhitelisted");
                this.classList.remove("nseIndividuallyBlacklisted");
                this.classList.remove("nseIndividuallyUntouched");
            } else if(torrentParent.getAttribute("isNSEHidden") == "0") {
                // Not hidden or is whitelisted, move to blacklist and hide
                let currindex = nseIndividualUploadHidingWhitelist.indexOf(this.torrentID);
                if(currindex > -1) {
                    nseIndividualUploadHidingWhitelist.splice(currindex, 1);
                }

                currindex = nseIndividualUploadHidingBlacklist.indexOf(this.torrentID);
                if(currindex == -1) { // Only add if not already blacklisted to avoid duplicates
                    nseIndividualUploadHidingBlacklist.push(this.torrentID);
                }

                torrentParent.classList.toggle("hidden");
                torrentParent.setAttribute("isNSEHidden", "1");
                torrentParent.style.backgroundColor = "#AAF";

                adjustHiddenHeaderCount(1);

                this.classList.remove("nseIndividuallyWhitelisted");
                this.classList.remove("nseIndividuallyUntouched");
                this.classList.add("nseIndividuallyBlacklisted");
            }

            //Save lists immediately after manipulating them
            GM_setValue("nseIndividualUploadHidingBlacklist", nseIndividualUploadHidingBlacklist);
            GM_setValue("nseIndividualUploadHidingWhitelist", nseIndividualUploadHidingWhitelist);
        };

        torrentIconContainer.appendChild(nseToggleHideElement);

        // Check if torrent is black/whitelisted this way
        let currentBLIndex = nseIndividualUploadHidingBlacklist.indexOf(torrentID);
        if(currentBLIndex > -1) {
            if(russianRouletteBulletInChamber == false) {
                actualIcon.classList.add("nseIndividuallyBlacklisted");
                currentHidden = true;
                currentForceHide = true;
            }
        }

        let currentWLIndex = nseIndividualUploadHidingWhitelist.indexOf(torrentID);
        if(currentWLIndex > -1) {
            actualIcon.classList.add("nseIndividuallyWhitelisted");
            currentWhitelisted = true;
            currentForceShow = true;
        }

        if(currentForceHide == false && currentForceShow == false) {
            // Torrent not acted upon
            actualIcon.classList.add("nseIndividuallyUntouched");
        }
    }

    if(window.location.href.includes("top10.php")) {
        uploaderElement = torrents[i].querySelector("td:nth-child(10) > a");
    }

    if(nseObliviousModeEnabled == true) {
        tagElement.classList.add("hidden");
    }

    // Check if filtered via options
    if(nseHideReportedEnabled) {
        if(titleElement.querySelector("span.reported") !== null) {
            currentHidden = true;
        }
    }

    if(nseHideWarnedEnabled) {
        if(torrents[i].classList.contains("redbar")) {
            currentHidden = true;
        }
    }

    let torrentIconElement = torrents[i].querySelector("td > span.torrent_icon_container > span.icon > a > div.icon_container > div.icon_stack > i");

    if(torrentIconElement != null) {
        if(nseHideSnatchedEnabled) {
            if(torrentIconElement.classList.contains("snatched")) {
                currentHidden = true;

                if(nseBypassWhitelistsEnabled) {
                    currentBypassWhitelist = true;
                }
            }
        }

        if(nseHideSeedingEnabled) {
            if(torrentIconElement.classList.contains("seeding")) {
                currentHidden = true;

                if(nseBypassWhitelistsEnabled) {
                    currentBypassWhitelist = true;
                }
            }
        }

        if(nseHideGrabbedEnabled) {
            if(torrentIconElement.classList.contains("grabbed")) {
                currentHidden = true;

                if(nseBypassWhitelistsEnabled) {
                    currentBypassWhitelist = true;
                }
            }
        }

        if(nseHideLeechingEnabled) {
            if(torrentIconElement.classList.contains("leeching")) {
                currentHidden = true;

                if(nseBypassWhitelistsEnabled) {
                    currentBypassWhitelist = true;
                }
            }
        }
    }

    // Check uploaders
    if(window.location.href.includes("collages.php") === false) { // There's no uploaders on collage pages
        if(uploaderElement == null) { // If it is null, it's an anon upload
            if(nseHideAnonUploadsEnabled) {
                let anonName = torrents[i].querySelector("td > span.anon_name");
                if(anonName.innerHTML == "anon") {
                    currentHidden = true;
                    if(russianRouletteBulletInChamber == false) {
                        anonName.classList.add("nseHiddenUploader");
                    }
                }
            }
        } else { // Not an anon upload
            // Add class for right-click management if enabled
            if(nseRightClickManagementEnabled) {
                uploaderElement.classList.add("nseUploaderElement");
            }

            let uploader = uploaderElement.innerHTML.trim().toLowerCase();

            let hiddenByUploader = false;
            for(let l = 0; l < nseBlacklistUploaders.length; l++) {
                if(uploader == nseBlacklistUploaders[l].trim().toLowerCase()) {
                    hiddenByUploader = true;
                    currentHidden = true;
                    if(russianRouletteBulletInChamber == false) { uploaderElement.classList.add("nseHiddenUploader"); }
                }
            }

            // If hiddenByUploader is still false, that means no blacklisted uploader was found, check whitelist
            // If hiddenByUploader is true, blacklisted uploader was found, and since usernames are unique, skip check
            if(hiddenByUploader == false) {
                if(currentBypassWhitelist == false) {
                    for(let m = 0; m < nseWhitelistUploaders.length; m++) {
                        if(uploader == nseWhitelistUploaders[m].trim().toLowerCase()) {
                            currentWhitelisted = true;
                            uploaderElement.classList.add("nseWhitelistedUploader");
                        }
                    }
                }
            }
        }
    }

    // Scan title for nseBlacklistTitlePhrases
    // ...For every blacklisted phrase:
    for(let tblCount = 0; tblCount < nseBlacklistTitlePhrases.length; tblCount++) {
        let currentTBLPhrase = nseBlacklistTitlePhrases[tblCount].trim().toLowerCase();
        let torrentTitle = titleElement.innerHTML.trim().toLowerCase();

        if(currentTBLPhrase != "") {
            if(torrentTitle.includes(currentTBLPhrase)) {
                currentHidden = true;
                if(russianRouletteBulletInChamber == false) { titleElement.innerHTML = titleElement.innerHTML + ` <color class="nseHiddenTitle">(${currentTBLPhrase})</color>`; }
            }
        }
    }

    // Scan title for nseWhitelistTitlePhrases
    // ...For every whitelisted phrase:
    if(currentBypassWhitelist == false) {
        for(let tblCount = 0; tblCount < nseWhitelistTitlePhrases.length; tblCount++) {
            let currentTWLPhrase = nseWhitelistTitlePhrases[tblCount].trim().toLowerCase();
            let torrentTitle = titleElement.innerHTML.trim().toLowerCase();

            if(currentTWLPhrase != "") {
                if(torrentTitle.includes(currentTWLPhrase)) {
                    currentWhitelisted = true;
                    titleElement.innerHTML = titleElement.innerHTML + ` <color class="nseWhitelistedTitle">(${currentTWLPhrase})</color>`;
                }
            }
        }
    }

    let tagList = tagElement.querySelectorAll("a");

    // For every tag in the current torrent
    for(let k = 0; k < tagList.length; k++) {
        // Add classes for right-click management if enabled
        if(nseRightClickManagementEnabled) {
            tagList[k].classList.add("nseTagElement");
        }

        if(nseBlacklistTags.includes(tagList[k].innerHTML) === true) {
            currentHidden = true;
            if(russianRouletteBulletInChamber == false) { 
                tagList[k].classList.add("nseHiddenTag"); 
            }
        }

        if(currentBypassWhitelist == false) {
            if(nseWhitelistTags.includes(tagList[k].innerHTML) === true) {
                currentWhitelisted = true;
                tagList[k].classList.add("nseWhitelistedTag");
            }
        }
    }

    // If forcing through individual filtering, ignore results
    if(currentForceShow) {
        currentHidden = false;
        currentWhitelisted = true;
    } else if(currentForceHide) {
        currentHidden = true;
        currentWhitelisted = false;
    }

    if(currentWhitelisted === true) {
        torrents[i].classList.remove("hidden");
        torrents[i].setAttribute("isNSEHidden", "0");
    } else if(currentHidden === true) {
        if(russianRouletteBulletInChamber == false) {
            torrents[i].style.backgroundColor = "#AAF";
            torrents[i].classList.add("hidden");
            torrents[i].setAttribute("isNSEHidden", "1");
            count += 1;
        }
    }
}
// End of main filtering loop


// Event handler assignment section (+ and other minor tasks)
let headerNode = document.getElementById("nseHeaderText");

adjustHiddenHeaderCount(count);

headerNode.onclick = function() {
    if(headerNode.innerHTML.match(/([0-9]+)/) !== null) {
        toggleTorrents();
    }
};

document.getElementById("nseToggleOptionsNode").onclick = function() {
    document.getElementById("nseMainDiv").classList.toggle("hidden");
};

document.getElementById("nseCloseOptionsButton").onclick = function() { 
    document.getElementById("nseMainDiv").classList.add("hidden"); 
    document.getElementById("nseOuter").scrollIntoView();
};

document.getElementById("nseCheckCustomCSS").onclick = function() {
    if(this.checked) {
        document.getElementById("nseCustomCSSDiv").classList.remove("hidden");
    } else {
        document.getElementById("nseCustomCSSDiv").classList.add("hidden");
    }
};

document.getElementById("nseThemeDropdown").onchange = function() {
    let selectedTheme = this.options[this.selectedIndex].value;
    let descriptionNode = document.getElementById("nseThemeDescription");

    if(selectedTheme == "nseThemeCustom") {
        document.getElementById("nseCustomThemeDiv").classList.remove("hidden");
    } else {
        document.getElementById("nseCustomThemeDiv").classList.add("hidden");
    }

    if(selectedTheme == "nseThemeDefault") {
        descriptionNode.innerHTML = "White background with black text and blue accents";
    } else if(selectedTheme == "nseThemeLegacy") {
        descriptionNode.innerHTML = "Ye Olde Theme with a blue background and white text";
    } else if(selectedTheme == "nseThemeEdgy") {
        descriptionNode.innerHTML = "For the edgelord in all of us, red text on a black background";
    } else if(selectedTheme == "nseThemeBaked") {
        descriptionNode.innerHTML = "Ayyyy 420 blaze it &mdash; Green and purple";
    } else if(selectedTheme == "nseThemeCustom") {
        descriptionNode.innerHTML = "Define your own colors using the text boxes below";
    }
};

// We like to have fun around here 😏
{
    let now = new Date();
    if(nseEveryDayIsApril1st || (now.getMonth() == 3 && now.getDate() == 1)) {
        let emojiElements = document.getElementsByClassName("nseEmoji");
        let normieArray = new Array("😂","🤣","😆", "🍆", "🍑", "💦", "💯", "😭", "🙃", "💩", "👌", "😏", "🙄", "🥵", "😱", "👀", "🤡");
        for(let i = 0; i < emojiElements.length; i++) {
            let randNum = Math.floor(Math.random() * normieArray.length);
            emojiElements[i].innerHTML = normieArray[randNum];
        }
    }
}

let nseTextAreas = new Array("nseBlacklistTaglistArea","nseWhitelistTaglistArea","nseBlacklistTitleListArea","nseWhitelistTitleListArea","nseBlacklistUploadersArea","nseWhitelistUploadersArea");

for(let textAreaCounter = 0; textAreaCounter < nseTextAreas.length; textAreaCounter++) {
    document.getElementById(nseTextAreas[textAreaCounter]).addEventListener("keydown", function(e) {
        if ((window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)  && e.keyCode == 83) {
            e.preventDefault();
            saveData();
        }
     }, false);
}

let explanationTogglers = new Array("nseBLE", "nseWLE","nseTitleBLE", "nseTitleWLE", "nseUBLE", "nseUWLE");

for(let i = 0; i < explanationTogglers.length; i++) {
    let currentElement = explanationTogglers[i];
    document.getElementById(currentElement + "Toggler").onclick = function() {
        document.getElementById(this.id.substring(0, this.id.length - 7)).classList.toggle("hidden");
    };
};

if(nseRightClickManagementEnabled) {
    let allTagElements = document.querySelectorAll(".nseTagElement");
    for(let i = 0; i < allTagElements.length; i++) {
        allTagElements[i].addEventListener('contextmenu', function(ev) {
            ev.preventDefault();

            showRCMBox("tag", this.innerHTML.trim(), ev.pageX, ev.pageY);

            return false;
        }, false);
    }

    let allUploaderElements = document.querySelectorAll(".nseUploaderElement");
    for(let j = 0; j < allUploaderElements.length; j++) {
        allUploaderElements[j].addEventListener('contextmenu', function(ev) {
            ev.preventDefault();

            showRCMBox("uploader", this.innerHTML.trim(), ev.pageX, ev.pageY);

            return false;
        }, false);
    }

    let allTitleElements = document.querySelectorAll(".nseTitleElement");
    for(let k = 0; k < allTitleElements.length; k++) {
        allTitleElements[k].addEventListener('contextmenu', function(ev) {
            ev.preventDefault();

            // Strip already hidden title fragments, if any
            let currTitle = this.innerHTML;
            let colorIndex = currTitle.indexOf("<color");
            
            if(colorIndex != -1) {
                currTitle = currTitle.substring(0, colorIndex);
            }

            showRCMBox("title", currTitle.trim(), ev.pageX, ev.pageY);

            return false;
        }, false);
    }

    document.getElementById("nseRCMClose").onclick = function() {
        this.parentNode.classList.add("hidden");
    }
}

document.getElementById("nseExportButton").onclick = function() { exportSettings(); };
document.getElementById("nseImportFilePicker").onchange = function () { importSettings(event); };
document.getElementById("nseEraseDataButton").onclick = function () { resetSettings(); };
document.getElementById("nseSaveButton").onclick = function() { saveData(); };
document.getElementById("nseReloadButton").onclick = function() { location.reload(); };
// End event handler assignment section


// Function section
function toggleTorrents() {
    for(let k = 0; k < torrents.length; k++) {
        torrents[k].classList.toggle("hidden");
    }
}

function adjustHiddenHeaderCount(value) {
    let currNum = headerNode.innerHTML.match(/([0-9]+)/);
    
    if(currNum === null) {
        currNum = value;
    } else {
        currNum = currNum[0];
        currNum = Number(currNum) + value;
    }

    if(currNum === 0) {
        headerNode.innerHTML = "NoShitEmpornium";
        
        if(value !== 0) {
            toggleTorrents();
        }
    } else if(currNum === 1) {
        headerNode.innerHTML = "Toggle 1 hidden torrent";
    } else {
        headerNode.innerHTML = "Toggle " + currNum + " hidden torrents";
    }
}

function showRCMBox(boxType, elementValue, mouseX, mouseY) {
    let box = document.getElementById("nseRCMBox");
    let x = mouseX;
    let y = mouseY;

    // Make sure the box stays within page bounds
    if(x - 150 < 0) {
        x = 0;
    } else if(x + 320 > window.innerWidth) {
        x = window.innerWidth - 350;
    } else {
        x -= 150;
    }

    box.style.left = x + "px";
    box.style.top = y - 90 + "px";

    let nseRCMBoxInfoText = box.querySelector("#nseRCMBoxInfoText");
    if(boxType == "tag") {
        let infoText = "<b>Tag:</b> <span class=\"nseRCMMonospace\" id=\"nseRCMBoxTag\">" + elementValue + "</span><br /><br />";

        let currTagBlacklist = document.getElementById("nseBlacklistTaglistArea").value.split(" ");
        let currTagWhitelist = document.getElementById("nseWhitelistTaglistArea").value.split(" ");
        let nseRCMBoxChoices = document.getElementById("nseRCMBoxChoices");

        if(currTagBlacklist.includes(elementValue)) { // Current tag is in blacklist
            infoText = infoText + `This tag was found in your <span class="nseBlacklistIdentifier">blacklist</span>!`;

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxBLRemove">${nseEmojiEnabled ? '➖' : '-'} Remove from blacklist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxWLAdd">${nseEmojiEnabled ? '➕' : '+'} Move to whitelist</span><br />
            `;

            document.getElementById("nseRCMBoxBLRemove").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                removeItemFromList("nseBlacklistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxWLAdd").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                addItemToList("nseWhitelistTaglistArea", "nseBlacklistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };
        } else if(currTagWhitelist.includes(elementValue)) { // Current tag is in whitelist
            infoText = infoText + `This tag was found in your <span class="nseWhitelistIdentifier">whitelist</span>!`;

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxWLRemove">${nseEmojiEnabled ? '➖' : '-'} Remove from whitelist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxBLAdd">${nseEmojiEnabled ? '➕' : '+'} Move to blacklist</span><br />
            `;

            document.getElementById("nseRCMBoxWLRemove").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                removeItemFromList("nseWhitelistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxBLAdd").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                addItemToList("nseBlacklistTaglistArea", "nseWhitelistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };
        } else { // Current tag is in no list
            infoText = infoText + "This tag was not found in either of your taglists.";

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxBLAdd">${nseEmojiEnabled ? '➕' : '+'} Add to blacklist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxWLAdd">${nseEmojiEnabled ? '➕' : '+'} Add to whitelist</span><br />
            `;

            document.getElementById("nseRCMBoxBLAdd").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                addItemToList("nseBlacklistTaglistArea", "nseWhitelistTaglistArea", currTag)
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxWLAdd").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                addItemToList("nseWhitelistTaglistArea", "nseBlacklistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };
        }

        nseRCMBoxInfoText.innerHTML = infoText;
    } else if(boxType == "uploader") {
        let infoText = "<b>Uploader:</b> <span class=\"nseRCMMonospace\" id=\"nseRCMBoxUploader\">" + elementValue + "</span><br /><br />";

        let currUploaderBlacklist = document.getElementById("nseBlacklistUploadersArea").value.split(" ");
        let currUploaderWhitelist = document.getElementById("nseWhitelistUploadersArea").value.split(" ");
        let nseRCMBoxChoices = document.getElementById("nseRCMBoxChoices");

        if(currUploaderBlacklist.includes(elementValue)) { // Current uploader is in blacklist
            infoText = infoText + `This uploader was found in your <span class="nseBlacklistIdentifier">blacklist</span>!`;

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxBLRemove">${nseEmojiEnabled ? '➖' : '-'} Remove from blacklist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxWLAdd">${nseEmojiEnabled ? '➕' : '+'} Move to whitelist</span><br />
            `;

            document.getElementById("nseRCMBoxBLRemove").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                removeItemFromList("nseBlacklistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxWLAdd").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                addItemToList("nseWhitelistUploadersArea", "nseBlacklistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };
        } else if(currUploaderWhitelist.includes(elementValue)) { // Current uploader is in whitelist
            infoText = infoText + `This uploader was found in your <span class="nseWhitelistIdentifier">whitelist</span>!`;

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxWLRemove">${nseEmojiEnabled ? '➖' : '-'} Remove from whitelist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxBLAdd">${nseEmojiEnabled ? '➕' : '+'} Move to blacklist</span><br />
            `;

            document.getElementById("nseRCMBoxWLRemove").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                removeItemFromList("nseWhitelistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxBLAdd").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                addItemToList("nseBlacklistUploadersArea", "nseWhitelistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };
        } else { // Current uploader is in no list
            infoText = infoText + "This uploader was not found in either of your uploader lists.";

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxBLAdd">${nseEmojiEnabled ? '➕' : '+'} Add to blacklist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxWLAdd">${nseEmojiEnabled ? '➕' : '+'} Add to whitelist</span><br />
            `;

            document.getElementById("nseRCMBoxBLAdd").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                addItemToList("nseBlacklistUploadersArea", "nseWhitelistUploadersArea", currTag)
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxWLAdd").onclick = function() {
                let currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                addItemToList("nseWhitelistUploadersArea", "nseBlacklistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };
        }

        nseRCMBoxInfoText.innerHTML = infoText;
    } else if(boxType == "title") {
        let infoText = `Customize the title phrase you would like to filter in the text box below. You can use a semicolon <span class="nseRCMMonospace">;</span> to separate multiple phrases:<br /><br />
        <input type="text" style="width:95%;" id="nseRCMTitlePhraseText" value="${elementValue.replace(/"/g, '&quot;')}"></input><br />`;
        nseRCMBoxInfoText.innerHTML = infoText;

        let nseRCMBoxChoices = document.getElementById("nseRCMBoxChoices");

        nseRCMBoxChoices.innerHTML = `
            <span class="nseRCMButton" id="nseRCMBoxBLAdd">${nseEmojiEnabled ? '➕' : '+'} Add phrase(s) to title blacklist</span><br /><br />
            <span class="nseRCMButton" id="nseRCMBoxWLAdd">${nseEmojiEnabled ? '➕' : '+'} Add phrase(s) to title whitelist</span><br />
        `;

        document.getElementById("nseRCMBoxWLAdd").onclick = function() {
            let currTitlePhrase = document.getElementById("nseRCMTitlePhraseText").value;
            
            addItemToList("nseWhitelistTitleListArea", "nseBlacklistTitleListArea", currTitlePhrase);
            saveData();
            closeRCMBox();
        };

        document.getElementById("nseRCMBoxBLAdd").onclick = function() {
            let currTitlePhrase = document.getElementById("nseRCMTitlePhraseText").value;

            addItemToList("nseBlacklistTitleListArea", "nseWhitelistTitleListArea", currTitlePhrase);
            saveData();
            closeRCMBox();
        };
    }
    
    box.classList.remove("hidden");
    return false;
}

function closeRCMBox() {
    document.getElementById("nseRCMBox").classList.add("hidden");
}

function removeItemFromList(tagListAreaName, tagName) {
    let currList = document.getElementById(tagListAreaName).value.trim().split(" ");

    let index = currList.indexOf(tagName);
    if (index > -1) {
        currList.splice(index, 1);
    }

    document.getElementById(tagListAreaName).value = currList.join(" ");
    
    // Show the refresh button because we've done changes
    document.getElementById("nseDynamicRefreshNode").classList.remove("hidden");
}

function addItemToList(tagListAreaName, oppositeTagListAreaName, filterValue) {
    let splitChar = " ";
    if(tagListAreaName == "nseWhitelistTitleListArea" || tagListAreaName == "nseBlacklistTitleListArea") {
        splitChar = ";";
    } else {
        // Only do opposite removal for tags/uploaders
        removeItemFromList(oppositeTagListAreaName, filterValue);
    }

    let currList = document.getElementById(tagListAreaName).value.trim().split(splitChar);

    if(splitChar == ";") {
        // Since titles can include more than one phrase, iterate through an exploded array
        let titleArray = filterValue.split(splitChar);

        for(let l = 0; l < titleArray.length; l++) {
            let currPhrase = titleArray[l].trim();
            if(currPhrase != "") {
                currList.push(currPhrase);
            }
        }
    } else {
        currList.push(filterValue);    
    }
    
    document.getElementById(tagListAreaName).value = currList.join(splitChar).replace(/;/,';');

    // Show the refresh button because we did changes
    document.getElementById("nseDynamicRefreshNode").classList.remove("hidden");
}

function downloadFile(filename, text) {
    let element = document.createElement('a');
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
  
    element.click();
    document.body.removeChild(element);
}

function exportSettings() {
    saveData();

    let settingsNames = GM_listValues();
    let settings = {};

    for(let i = 0; i < settingsNames.length; i++) {
        settings[settingsNames[i]] = GM_getValue(settingsNames[i], null);
    }

    let jsonOutput = JSON.stringify(settings);
    let dateString = Date.now();

    downloadFile(`nseExport-${dateString}.json`, jsonOutput);
}

function importSettings(event) {
    let reader = new FileReader();
    reader.onload = function(){
        if(confirm("Are you sure you want to import this file? Your existing settings will be overwritten!")) {
            let settingsObject = JSON.parse(reader.result);

            for(let i = 0; i < Object.keys(settingsObject).length; i++) {
                GM_setValue(Object.keys(settingsObject)[i], settingsObject[Object.keys(settingsObject)[i]]);
            }

            location.reload();
        }
    };
    reader.readAsText(event.target.files[0]);
}

function resetSettings() {
    if(confirm("Are you sure you want to reset all blacklists, all whitelists, and all preferences in NSE? This cannot be undone!")) {
        let settingsNames = GM_listValues();

        for(let i = 0; i < settingsNames.length; i++) {
            GM_deleteValue(settingsNames[i]);
        }

        location.reload();
    }
};

function saveData() {
    GM_setValue("nseTaglist", document.getElementById("nseBlacklistTaglistArea").value); // Legacy name for BC
    GM_setValue("nseWhitelist", document.getElementById("nseWhitelistTaglistArea").value); // ^

    GM_setValue("nseBlacklistTitles", document.getElementById("nseBlacklistTitleListArea").value);
    GM_setValue("nseWhitelistTitles", document.getElementById("nseWhitelistTitleListArea").value);

    GM_setValue("nseUploaders", document.getElementById("nseBlacklistUploadersArea").value); // ^
    GM_setValue("nseWhitelistUploaders", document.getElementById("nseWhitelistUploadersArea").value);

    GM_setValue("nseObliviousModeEnabled", document.getElementById("nseCheckObliviousMode").checked);
    GM_setValue("nseRussianRouletteEnabled", document.getElementById("nseCheckRussianRouletteMode").checked);
    GM_setValue("nseHideAnonUploadsEnabled", document.getElementById("nseCheckHideAnonUploads").checked);
    GM_setValue("nseHideWarnedEnabled", document.getElementById("nseCheckHideWarned").checked);
    GM_setValue("nseHideReportedEnabled", document.getElementById("nseCheckHideReported").checked);
    GM_setValue("nseHideSnatchedEnabled", document.getElementById("nseCheckHideSnatched").checked);
    GM_setValue("nseHideSeedingEnabled", document.getElementById("nseCheckHideSeeding").checked);
    GM_setValue("nseHideLeechingEnabled", document.getElementById("nseCheckHideLeeching").checked);
    GM_setValue("nseHideGrabbedEnabled", document.getElementById("nseCheckHideGrabbed").checked);
    GM_setValue("nseBypassWhitelistsEnabled", document.getElementById("nseCheckBypassWhitelists").checked);
    GM_setValue("nseIndividualUploadHidingEnabled", document.getElementById("nseCheckIndividualHide").checked);
    GM_setValue("nseEnableGCDCompatibilityMode", document.getElementById("nseCheckGCDCompatibilityMode").checked);
    GM_setValue("nseRightClickManagementEnabled", document.getElementById("nseCheckRightClickManagementEnabled").checked);
    GM_setValue("nseEmojiEnabled", document.getElementById("nseCheckEmojiEnabled").checked);

    if(nseEnableApril1stOption) {
        GM_setValue("nseEveryDayIsApril1st", document.getElementById("nseCheckApril1stAllYear").checked);
    }
    
    GM_setValue("nseScrollToNSEEnabled", document.getElementById("nseCheckScrollToNSEEnabled").checked);


    let nseThemeDropdown = document.getElementById("nseThemeDropdown");
    GM_setValue("nseSelectedTheme", nseThemeDropdown.options[nseThemeDropdown.selectedIndex].value);


    if(nseThemeDropdown.options[nseThemeDropdown.selectedIndex].value == "nseThemeCustom") {
        // save custom colors
        nseCustomTheme = {
            backgroundColor: document.getElementById("nseCustomThemeBgCol").value,
            backgroundHighlightColor: document.getElementById("nseCustomThemeBgHighCol").value,
            foregroundColor: document.getElementById("nseCustomThemeForeCol").value,
            accentColor: document.getElementById("nseCustomThemeAccentCol").value,
            highlightColor: document.getElementById("nseCustomThemeHighCol").value
        };

        GM_setValue("nseCustomTheme", nseCustomTheme);
    }

    // We need to escape backslashes in the custom CSS as it will be included in a back-ticked CSS block
    let css = document.getElementById("nseCustomCSSArea").value;
    css = css.replace(/\\/gi, "\\\\");
    GM_setValue("nseCustomCSS", css);
    GM_setValue("nseCustomCSSEnabled", document.getElementById("nseCheckCustomCSS").checked);

    let time = new Date().toLocaleTimeString();
    document.getElementById("nseSaveDiv").innerHTML = "Saved at " + time + "!";
    document.getElementById("nseSaveDiv").classList.remove("hidden");
}

// End function section


// Start CSS section
GM_addStyle(`

.nseOuterDiv, #nseRCMBox {
    font-family: Helvetica;
    margin:auto;
    color: ${themes[nseSelectedTheme]["foregroundColor"]};
    padding: 10px;
    border: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
    background-color: ${themes[nseSelectedTheme]["backgroundColor"]} !important;
    border-radius: 20px;
}

.nseOuterDiv {
    width: 600px;
    margin-top: 10px;
}

p:not(:last-child) {
    margin: 0 0 20px;
}

section {
    display: none;
    padding: 20px 0 0;
    border-top: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
}

.nseRadioButton {
    display: none;
}

.nseLabel {
    display: inline-block;
    margin: 0 0 -1px;
    padding: 15px;
    font-weight: 600;
    text-align: center;
    color: ${themes[nseSelectedTheme]["accentColor"]};
    background-color: ${themes[nseSelectedTheme]["backgroundColor"]} !important;
    border: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
    margin-right: 5px;
}

.nseSettingsCheckbox {
    padding: 5px 10px;
}

a.nseLink, a.nseLink:visited {
    color: ${themes[nseSelectedTheme]["accentColor"]};
}

.nseSpanLink {
    color: ${themes[nseSelectedTheme]["accentColor"]};
    cursor: pointer;
}

.nseLabel:hover {
    color: ${themes[nseSelectedTheme]["highlightColor"]};
    background-color: ${themes[nseSelectedTheme]["backgroundHighlightColor"]} !important;
}

.nseRadioButton:checked + .nseLabel {
    color: ${themes[nseSelectedTheme]["accentColor"]};
    border: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
    border-top: 2px solid ${themes[nseSelectedTheme]["accentColor"]};
    border-bottom: 1px solid ${themes[nseSelectedTheme]["backgroundColor"]};
}

#nseTab1:checked ~ #nseContent1,#nseTab2:checked ~ #nseContent2,#nseTab3:checked ~ #nseContent3,#nseTab4:checked ~ #nseContent4 {
    display: block;
}

#nseSettingsTab1:checked ~ #nseSettingsContent1,#nseSettingsTab2:checked ~ #nseSettingsContent2,#nseSettingsTab3:checked ~ #nseSettingsContent3,#nseSettingsTab4:checked ~ #nseSettingsContent4 {
    display: block;
}

.nseExplanationSpan {
    font-size: 14px !important;
    color: ${themes[nseSelectedTheme]["accentColor"]};
}

.nseListHeader {
    font-size: 18px;
}

.nseImageButton {
    position: relative;
    color: ${themes[nseSelectedTheme]["foregroundColor"]};
    font-weight: bold;
}

.nseImageButton > a, .nseImageButton  > a:visited {
    color: ${themes[nseSelectedTheme]["foregroundColor"]};
    text-decoration: none;
    border: 0;
}

.nseImageButton:before {
    font-weight: normal;
    margin-right: 5px;
}

.nseExplanationBox, #nseCustomThemeDiv, #nseCustomCSSDiv, .nseNiceBox {
    width: 97%;
    margin-top: 10px;
    border: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
    padding: 10px;
    border-radius: 10px;
}

.nseNiceBox {
    width: 75%;
}

#nseHeader {
    width: 100%;
    margin: auto;
    text-align: center;
    font-size: 18px;
}

.nseExplanationToggler, #nseHeaderText, .nseNiceButton, .nseRCMButton, .nseLabel:hover {
    cursor: pointer;
}

#nseRCMBox {
    width: 300px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9001;
}

#nseRCMClose {
    float: right;
    cursor: pointer;
}

.nseRCMMonospace {
    font-family: Courier New;
    font-size: 18px;
}

.nseTextArea {
    width: 99%;
    max-width: 99%;
}

.nseFieldDiv, .nseExplanationNode, .nseExplanationBox, #nseCustomThemeDiv, #nseCustomCSSDiv, .nseOuterDiv {
    margin-bottom: 10px;
}

.nseHiddenUploader, .nseHiddenTag, .nseHiddenTitle, .nseBlacklistIdentifier {
    color: #F00 !important;
    font-weight: bold !important;
}

.nseWhitelistedUploader, .nseWhitelistedTag, .nseWhitelistedTitle, .nseWhitelistIdentifier {
    color: #0F0 !important;
    font-weight: bold !important;
}

.nseHiddenTag, .nseWhitelistedTag, .nseWhitelistedTitle, .nseHiddenTitle {
    display: inline;
}

.nseNiceButton, .nseRCMButton {
    background-color: ${themes[nseSelectedTheme]["backgroundColor"]} !important;
    color: ${themes[nseSelectedTheme]["foregroundColor"]} !important;
    border: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
    border-radius: 10px;
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 16px;
}

.nseNiceButton:hover, .nseRCMButton:hover {
    background-color: ${themes[nseSelectedTheme]["backgroundHighlightColor"]} !important;
}

.nseNiceButton, .nseRCMButton {
    padding-top: 7px;
}

#nseSaveDiv {
    margin-top: 20px;
    font-weight: bold;
}

#nseMainDiv {
    margin-top: 10px;
}

h3 {
    color: ${themes[nseSelectedTheme]["foregroundColor"]} !important;
}

.nseIndividuallyWhitelisted {
    border: 2px solid green;
    background-color: #CEF6D8;
}

.nseIndividuallyBlacklisted {
    border: 2px solid red;
    background-color: #F6CED8;
}

.nseIndividuallyUntouched {
    border: 2px solid gray;
    background-color: #EBEBEB;
}

.nseIndividuallyBlacklisted, .nseIndividuallyWhitelisted, .nseIndividuallyUntouched {
    border-radius: 5px;
}

.nseEmoji {
    display: ${nseEmojiEnabled ? 'inline-block' : 'none'};
}

${nseCustomCSSEnabled ? nseCustomCSS : ''}

`);
// End CSS section
