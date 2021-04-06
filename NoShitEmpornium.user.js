// ==UserScript==
// @name         NoShitEmpornium
// @namespace    http://www.empornium.me/
// @version      2.4.0
// @description  Hides torrents with specified tags or by specified uploaders on Empornium
// @updateURL    https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js
// @downloadURL  https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js
// @author       ceodoe
// @include      /^https?://www\.empornium\.(me|sx|is)/torrents\.php*/
// @include      /^https?://www\.empornium\.(me|sx|is)/collages\.php.*id=*/
// @include      /^https?://www\.empornium\.(me|sx|is)/top10\.php*/
// @exclude      /^https?://www\.empornium\.(me|sx|is)/torrents\.php.*(\?|&)(type=|id=)/
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
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

var nseVersion = "v2.4.0"

// Store the hide icon as text to dodge CSP
var nseHideIconString = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAC6npUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7ZdtktwoDIb/c4ocAUkIieNgPqpygz1+XrDb0z2T3SS1+2urTdlggSX5fWR6Joy/vs/wDQeVzCGpeS45RxyppMIVA4/nUfaVYtrX84avOXq1h3uCYRL0ct5avdZX2PXjgUcMOl7twa8Z9ssR3Y73ISvyGvfnJGHn007pclTGOcjF7TnV43LUroU7letMd1pnt+7Di8GgUlcEEuYhJHFf/cxAzrMu+75CFYl7zEJhd493hSAvr/foY3wW6EXkxyh8Vv8efRKf62WXT1rmSyMMfjpB+skudxh+Dix3Rvw6YfJw9VXkObvPOc63qylD0XxV1BabHm6w8IDksh/LaIZTMbbdCprHGhuQ99jigdaoEEP9GShRp0qTxu4bNaSYeLChZ24AsmwuxoUbGJGk1WiySZEuDliNRxCBme9caMctO14jR+ROWMoEZ4RH/raFf5r8kxbmbEsiin5rhbx41TXSWOTWFasAhObFTbfAj3bhj0/1s0o1YdmS2fGCNR6ni0Ppo7ZkcxasU/TnJ0TB+uUAEiG2IhkUf6KYSZQyRWM2IujoAFSROUviAwRIlTuS5CSC/cjYecXGM0Z7LStnXmbsTQChksXApkgFrJQU9WPJUUNVRZOqZjX1oEVrlpyy5pwtr02umlgytWxmbsWqiydXz27uXrwWLoI9UEsuVryUUiuHikAVvirWV1gOPuRIhx75sMOPctSG8mmpacvNmrfSaucuHdtEz92699LroDCwU4w0dORhw0cZdaLWpsw0deZp02eZ9aZ2Uf3S/oAaXdR4k1rr7KYGazB7uKC1nehiBmKcCMRtEUBB82IWnVLiRW4xi4XxUSgjSV1sQqdFDAjTINZJN7sPcr/FLaj/Fjf+Fbmw0P0X5ALQfeX2E2p9/c61Tez8CpemUfD1YX54Dex1/ajVf9u/Hb0dvR29Hb0dvR29Hf0PHE388YB/YsMPGOidZZTdxfYAAAGFaUNDUElDQyBwcm9maWxlAAB4nH2RPUjDQBiG37ZKpVYcLCLikKE6WRAVESetQhEqhFqhVQeTS/+gSUOS4uIouBYc/FmsOrg46+rgKgiCPyBOjk6KLlLid0mhRYx3HPfw3ve+3H0H+OtlppodY4CqWUYqERcy2VUh+IoQzX50Y0Zipj4nikl4jq97+Ph+F+NZ3nV/jh4lZzLAJxDPMt2wiDeIpzYtnfM+cYQVJYX4nHjUoAsSP3JddvmNc8FhP8+MGOnUPHGEWCi0sdzGrGioxJPEUUXVKN+fcVnhvMVZLVdZ8578heGctrLMdVpDSGARSxAhQEYVJZRhIUa7RoqJFJ3HPfyDjl8kl0yuEhg5FlCBCsnxg//B796a+YlxNykcBzpfbPtjGAjuAo2abX8f23bjBAg8A1day1+pA9OfpNdaWvQI6N0GLq5bmrwHXO4AA0+6ZEiOFKDlz+eB9zP6pizQdwuE1ty+Nc9x+gCkqVfJG+DgEBgpUPa6x7u72vv2b02zfz9/THKseNROhQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+QKChYVGrZwy10AAAF0SURBVDjL3dK/S9ZhFAXwj74ZvoXwllAKiSZYQ0uIQaND0BKUjQ1ODYIOBiKIEA1RNLWECIUQqIuL4BJFFoElmhjakk4a+YMgQYkIhVqu8PDw/gHRnZ7vufd7OPeew79WheR9ErcxF3g1zqMdF1CJPRyUIzqSvKvQiz94h5f4hvXoN6MeixjGC/wqR1qDFnxCX4IXQ91h3cAbvEZdTnIG27iCElbxAOcwH9/v0ZScpAc/Yn1wHNPoTIiPYgP34qcCurGLU8ncTXyIbXTgeabwetxjFgMJ/gjj2ewIbsECLmfNVdTiBL7iaeLsWjbbiqXKsLs1a37HReygAVdDWQEr2WxbuOxsWHo6aXZgM7lHETO4n5HUh5DGQ+BOHPdYMtSPn3iCwYjGOh5Hv4QtdKXJno1AjuFzqHmLqYhANT7ibhCV8BtfMAQVmdR2PMQ+XkWG1iLtTbiECYxiMl21okzCi3HoaxG22sB3QsGzMGMmbF/2f9dfX9xN/BNad7IAAAAASUVORK5CYII=";

// Load saved lists and options
var nseBlacklistTaglist = GM_getValue("nseTaglist", "enter.illegal.tags.here separated.by.spaces.only no.newlines scat puke blood"); // 3 unchanged names to allow backwards comp
var nseBlacklistTags;

var nseWhitelistTaglist = GM_getValue("nseWhitelist", "whitelist.tags go.here"); // ^
var nseWhitelistTags;

var nseBlacklistTitleList = GM_getValue("nseBlacklistTitles", "this is a title phrase;this is another title phrase");
var nseBlacklistTitlePhrases;

var nseWhitelistTitleList = GM_getValue("nseWhitelistTitles", "this is a title phrase;this is another title phrase");
var nseWhitelistTitlePhrases;

var nseBlacklistUploadersList = GM_getValue("nseUploaders", "putusernameshere separatedbyspacesonly nonewlines"); // ^
var nseBlacklistUploaders;

var nseWhitelistUploadersList = GM_getValue("nseWhitelistUploaders", "putusernameshere separatedbyspacesonly nonewlines");
var nseWhitelistUploaders;

var nseObliviousModeEnabled = GM_getValue("nseObliviousModeEnabled", false);
var nseRussianRouletteEnabled = GM_getValue("nseRussianRouletteEnabled", false);
var nseHideAnonUploadsEnabled = GM_getValue("nseHideAnonUploadsEnabled", false);
var nseHideWarnedEnabled = GM_getValue("nseHideWarnedEnabled", false);
var nseHideReportedEnabled = GM_getValue("nseHideReportedEnabled", false);
var nseHideSnatchedEnabled = GM_getValue("nseHideSnatchedEnabled", false);
var nseHideSeedingEnabled = GM_getValue("nseHideSeedingEnabled", false);
var nseHideGrabbedEnabled = GM_getValue("nseHideGrabbedEnabled", false);
var nseHideLeechingEnabled = GM_getValue("nseHideLeechingEnabled", false);
var nseBypassWhitelistsEnabled = GM_getValue("nseBypassWhitelistsEnabled", false);
var nseRightClickManagementEnabled = GM_getValue("nseRightClickManagementEnabled", true);

var nseSelectedTheme = GM_getValue("nseSelectedTheme", "nseThemeDefault");
var nseCustomTheme = GM_getValue("nseCustomTheme", {
    backgroundColor: "#fff",
    backgroundHighlightColor: "#cfe7ff",
    foregroundColor: "#000",
    accentColor: "#0af",
    highlightColor: "#0071b0"
});

var nseCustomCSSEnabled = GM_getValue("nseCustomCSSEnabled", false);
var nseCustomCSS = GM_getValue("nseCustomCSS", "/* With great power comes great responsibility */");

var nseIndividualUploadHidingEnabled = GM_getValue("nseIndividualUploadHidingEnabled", new Array(0));
var nseIndividualUploadHidingBlacklist = GM_getValue("nseIndividualUploadHidingBlacklist", new Array(0));
var nseIndividualUploadHidingWhitelist = GM_getValue("nseIndividualUploadHidingWhitelist", new Array(0));

var nseEnableGCDCompatibilityMode = GM_getValue("nseEnableGCDCompatibilityMode", false);


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
var themes = {
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
            var iconContainers = document.querySelectorAll("span.torrent_icon_container");
            for(var a = 0; a < iconContainers.length; a++) {
                iconContainers[a].style.display = "flex";
            }

            // Hide all comment icons GCD creates
            var commentElements = document.querySelectorAll("a.comment");
            for(var b = 0; b < commentElements.length; b++) {
                commentElements[b].style.display = "none";
            }

            // Bring all eyes to the front of the z-index as they are obscured by the div.version element
            var allEyes = document.querySelectorAll(".nseToggleHideButton");
            for(var c = 0; c < allEyes.length; c++) {
                allEyes[c].style.zIndex = "1";
            }
        },1500); // This should be enough time for any modern-ish machine to run through GCD's code before we look for its elements
    }
}


// Main loop - for every torrent:
var count = 0;
var torrents = document.querySelectorAll("tr.torrent");

for(var i = 0; i < torrents.length; i++) {
    var tagElement = torrents[i].querySelector("td > div.tags");

    if(tagElement === null) {
        continue; // skip to next iteration if we can't get taglist,
                  // I've seen rows break on rare occasions in the source HTML
    }

    var russianRouletteBulletInChamber = false;
    if(nseRussianRouletteEnabled == true) {
        var randNum = Math.floor(Math.random() * 6) + 1; // 1/6 chance to fire
        if(randNum == 6) {
            russianRouletteBulletInChamber = true;
        }
    }

    var uploaderElement = torrents[i].querySelector("td.user > a");
    var titleElement;

    if(window.location.href.includes("collages.php")) {
        titleElement = torrents[i].querySelector("td > strong > a");
    } else {
        titleElement = torrents[i].querySelector("td > a");
    }

    var currentHidden = false;
    var currentWhitelisted = false;
    var currentBypassWhitelist = false;
    var currentForceHide = false;
    var currentForceShow = false;

    // Check if we are adding the hide button
    if(nseIndividualUploadHidingEnabled) {
        var iconDaddy = torrents[i].querySelector("td > span.torrent_icon_container");

        var nseToggleHideElement = document.createElement("span");
        nseToggleHideElement.className = "icon";
        nseToggleHideElement.innerHTML = `
        <div class="icon_container">
            <div class="icon_stack">
                <i class="font_icon torrent_icons clickable">
                    <img src="${nseHideIconString}" />
                </i>
            </div>
        </div>
        `;

        nseToggleHideElement.title = "Filter this torrent with NSE";
        nseToggleHideElement.classList.add("nseToggleHideButton");

        var actualIcon = nseToggleHideElement.querySelector("div > div > i")
        var torrentID = titleElement.href.match(/([0-9]+)/)[0];
        actualIcon.torrentID = torrentID;
        actualIcon.onclick = function() {
            var torrentDad = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

            if(torrentDad.getAttribute("isNSEHidden") == null) {
                torrentDad.setAttribute("isNSEHidden", "0");
            }

            if(torrentDad.getAttribute("isNSEHidden") === "1") {
                // Blacklisted, move to whitelist and unhide
                var currindex = nseIndividualUploadHidingBlacklist.indexOf(this.torrentID);
                if(currindex > -1) {
                    nseIndividualUploadHidingBlacklist.splice(currindex, 1);
                }

                currindex = nseIndividualUploadHidingWhitelist.indexOf(this.torrentID);
                if(currindex == -1) { // Only add if not already whitelisted to avoid duplicates
                    nseIndividualUploadHidingWhitelist.push(this.torrentID);
                }

                torrentDad.classList.toggle("hidden");
                torrentDad.setAttribute("isNSEHidden", "0");
                torrentDad.style.backgroundColor = null;

                var nseHeaderNode = document.querySelector("#nseHeaderText");

                var currNum = nseHeaderNode.innerHTML.match(/([0-9]+)/)[0];
                currNum = Number(currNum) - 1;

                if(currNum == 0) {
                    nseHeaderNode.innerHTML = "NoShitEmpornium";
                } else {
                    nseHeaderNode.innerHTML = `Toggle ${currNum} hidden torrents`;
                }

                this.classList.add("nseIndividuallyWhitelisted");
                this.classList.remove("nseIndividuallyBlacklisted");
                this.classList.remove("nseIndividuallyUntouched");
            } else if(torrentDad.getAttribute("isNSEHidden") == "0") {
                // Not hidden or is whitelisted, move to blacklist and hide
                var currindex = nseIndividualUploadHidingWhitelist.indexOf(this.torrentID);
                if(currindex > -1) {
                    nseIndividualUploadHidingWhitelist.splice(currindex, 1);
                }

                currindex = nseIndividualUploadHidingBlacklist.indexOf(this.torrentID);
                if(currindex == -1) { // Only add if not already blacklisted to avoid duplicates
                    nseIndividualUploadHidingBlacklist.push(this.torrentID);
                }

                torrentDad.classList.toggle("hidden");
                torrentDad.setAttribute("isNSEHidden", "1");
                torrentDad.style.backgroundColor = "#AAF";

                var nseHeaderNode = document.querySelector("#nseHeaderText");

                if(nseHeaderNode.innerHTML != "NoShitEmpornium") {
                    var currNum = nseHeaderNode.innerHTML.match(/([0-9]+)/)[0];
                    currNum = Number(currNum) + 1;
                    nseHeaderNode.innerHTML = `Toggle ${currNum} hidden torrents`;
                } else {
                    nseHeaderNode.innerHTML = `Toggle 1 hidden torrent`;
                }

                this.classList.remove("nseIndividuallyWhitelisted");
                this.classList.remove("nseIndividuallyUntouched");
                this.classList.add("nseIndividuallyBlacklisted");
            }

            //Save lists immediately after manipulating them
            GM_setValue("nseIndividualUploadHidingBlacklist", nseIndividualUploadHidingBlacklist);
            GM_setValue("nseIndividualUploadHidingWhitelist", nseIndividualUploadHidingWhitelist);
        };

        iconDaddy.appendChild(nseToggleHideElement);

        // Check if torrent is black/whitelisted this way
        var currentBLIndex = nseIndividualUploadHidingBlacklist.indexOf(torrentID);
        if(currentBLIndex > -1) {
            actualIcon.classList.add("nseIndividuallyBlacklisted");
            currentHidden = true;
            currentForceHide = true;
        }

        var currentWLIndex = nseIndividualUploadHidingWhitelist.indexOf(torrentID);
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

    var torrentIconElement = torrents[i].querySelector("td > span.torrent_icon_container > span.icon > a > div.icon_container > div.icon_stack > i");

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
                var anonName = torrents[i].querySelector("td > span.anon_name");
                if(anonName.innerHTML == "anon") {
                    currentHidden = true;
                    if(russianRouletteBulletInChamber == false) { anonName.classList.add("nseHiddenUploader"); }
                }
            }
        } else { // Not an anon upload
            // Add class for right-click management if enabled
            if(nseRightClickManagementEnabled) {
                uploaderElement.classList.add("nseUploaderElement");
            }

            var uploader = uploaderElement.innerHTML.trim().toLowerCase();

            var hiddenByUploader = false;
            for(var l = 0; l < nseBlacklistUploaders.length; l++) {
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
                    for(var m = 0; m < nseWhitelistUploaders.length; m++) {
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
    for(var tblCount = 0; tblCount < nseBlacklistTitlePhrases.length; tblCount++) {
        var currentTBLPhrase = nseBlacklistTitlePhrases[tblCount].trim().toLowerCase();
        var torrentTitle = titleElement.innerHTML.trim().toLowerCase();

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
        for(var tblCount = 0; tblCount < nseWhitelistTitlePhrases.length; tblCount++) {
            var currentTWLPhrase = nseWhitelistTitlePhrases[tblCount].trim().toLowerCase();
            var torrentTitle = titleElement.innerHTML.trim().toLowerCase();

            if(currentTWLPhrase != "") {
                if(torrentTitle.includes(currentTWLPhrase)) {
                    currentWhitelisted = true;
                    titleElement.innerHTML = titleElement.innerHTML + ` <color class="nseWhitelistedTitle">(${currentTWLPhrase})</color>`;
                }
            }
        }
    }

    var tagList = tagElement.querySelectorAll("a");

    // For every tag in the current torrent
    for(var k = 0; k < tagList.length; k++) {
        // Add classes for right-click management if enabled
        if(nseRightClickManagementEnabled) {
            tagList[k].classList.add("nseTagElement");
        }

        if(nseBlacklistTags.includes(tagList[k].innerHTML) === true) {
                currentHidden = true;
                if(russianRouletteBulletInChamber == false) { tagList[k].classList.add("nseHiddenTag"); }
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


// Set up reference node to place our html
var referenceNode = document.querySelector("div#filter_slidetoggle");

if(window.location.href.includes("top10.php")) {
    referenceNode = document.querySelector("#content > div > form");
} else if(window.location.href.includes("action=notify")) {
    referenceNode = document.querySelector("#content > div > h2");
} else if(window.location.href.includes("collages.php?")) {
    referenceNode = document.querySelector("div.clear:nth-child(6)");
}

function toggleTorrents() {
    for(var k = 0; k < torrents.length; k++) {
        torrents[k].classList.toggle("hidden");
    }
}

// Start HTML section
var htmlContent = document.createElement("div");
htmlContent.innerHTML = `
<div id="nseOuter" class="nseOuterDiv">
    <div id="nseHeader">
        <span id="nseHeaderText">NoShitEmpornium</span>
        <span id="nseToggleOptionsNode" class="nseNiceButton">Options</span>
    </div>
    <div id="nseMainDiv" class="nseMainBox hidden">
        <input class="nseRadioButton" id="nseTab1" type="radio" name="tabs" checked>
        <label class="nseLabel" for="nseTab1">🏷️ Tags</label>

        <input class="nseRadioButton" id="nseTab2" type="radio" name="tabs">
        <label class="nseLabel" for="nseTab2">📚 Titles</label>

        <input class="nseRadioButton" id="nseTab3" type="radio" name="tabs">
        <label class="nseLabel" for="nseTab3">👥 Uploaders</label>

        <input class="nseRadioButton" id="nseTab4" type="radio" name="tabs">
        <label class="nseLabel" for="nseTab4">⚙️ Settings</label>

        <section id="nseContent1">
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTagBlacklistHeader">👎 Tag blacklist <small>(space-separated)</small></span><sup class="nseExplanationToggler" id="nseBLEToggler">[?]</sup><br />
                <div id="nseBLE" class="nseExplanationBox hidden">

                </div>
                <textarea class="nseTextArea" id="nseBlacklistTaglistArea" rows=10>${nseBlacklistTaglist}</textarea>
            </div>
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTagWhitelistHeader">👍 Tag whitelist <small>(space-separated)</small></span><sup class="nseExplanationToggler" id="nseWLEToggler">[?]</sup><br />
                <div id="nseWLE" class="nseExplanationBox hidden">

                </div>
                <textarea class="nseTextArea" id="nseWhitelistTaglistArea" rows=10>${nseWhitelistTaglist}</textarea>
            </div>
        </section>

        <section id="nseContent2">
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTitleBlacklistHeader">👎 Title blacklist <small>(semicolon-separated)</small></span><sup class="nseExplanationToggler" id="nseTitleBLEToggler">[?]</sup><br />
                <div id="nseTitleBLE" class="nseExplanationBox hidden">

                </div>
                <textarea class="nseTextArea" id="nseBlacklistTitleListArea" rows=10>${nseBlacklistTitleList}</textarea>
            </div>
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTitleWhitelistHeader">👍 Title whitelist <small>(semicolon-separated)</small></span><sup class="nseExplanationToggler" id="nseTitleWLEToggler">[?]</sup><br />
                <div id="nseTitleWLE" class="nseExplanationBox hidden">

                </div>
                <textarea class="nseTextArea" id="nseWhitelistTitleListArea" rows=10>${nseWhitelistTitleList}</textarea>
            </div>
        </section>

        <section id="nseContent3">
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseUploaderBlacklistHeader">👎 Uploader blacklist <small>(space-separated)</small></span><sup class="nseExplanationToggler" id="nseUBLEToggler">[?]</sup><br />
                <div id="nseUBLE" class="nseExplanationBox hidden">

                </div>
                <textarea class="nseTextArea" id="nseBlacklistUploadersArea" rows=10>${nseBlacklistUploadersList}</textarea>
            </div>
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseUploaderWhitelistHeader">👍 Uploader whitelist <small>(space-separated)</small></span><sup class="nseExplanationToggler" id="nseUWLEToggler">[?]</sup><br />
                <div id="nseUWLE" class="nseExplanationBox hidden">

                </div>
                <textarea class="nseTextArea" id="nseWhitelistUploadersArea" rows=10>${nseWhitelistUploadersList}</textarea>
            </div>
        </section>

        <section id="nseContent4">
            <h3>Filtering</h3>
            <p>
                <b>Individual uploads</b><br />
                <input type="checkbox" id="nseCheckIndividualHide"${nseIndividualUploadHidingEnabled ? ' checked' : ''} />
                <label for="nseCheckIndividualHide" class="settingsCheckbox">
                    👁️ Enable individual upload filtering
                </label><br />
                <span class="explanationSpan" style="margin-left: 60px;">(Click the eye icon next to the torrent name to blacklist/whitelist uploads</span><br />
                <span class="explanationSpan" style="margin-left: 60px;">individually, ignoring <b>all</b> other rules. These filters are automatically saved)</span><br /><br />

                <input type="checkbox" id="nseCheckGCDCompatibilityMode"${nseEnableGCDCompatibilityMode ? ' checked' : ''} />
                <label for="nseCheckGCDCompatibilityMode" class="settingsCheckbox">
                    📃 Enable support for individual filtering when using <i>Gazelle Collapse Duplicates</i>
                </label><br />
                <span class="explanationSpan" style="margin-left: 60px;">(This is experimental and might not work as expected, you have been warned.</span><br />
                <span class="explanationSpan" style="margin-left: 60px;">Interoperability with other scripts cannot be guaranteed)</span><br /><br />

                <b>List management</b><br />
                <input type="checkbox" id="nseCheckRightClickManagementEnabled"${nseRightClickManagementEnabled ? ' checked' : ''} />
                <label for="nseCheckRightClickManagementEnabled" class="settingsCheckbox">
                    👤 Enable Right-Click Management
                </label><br />
                <span class="explanationSpan" style="margin-left: 60px;">(Right-click a tag or uploader in the torrent list to add/remove from your lists)</span><br /><br />

                <b>Torrent site status</b><br />
                <input type="checkbox" id="nseCheckHideAnonUploads"${nseHideAnonUploadsEnabled ? ' checked' : ''} />
                <label for="nseCheckHideAnonUploads" class="settingsCheckbox">
                    👤 Hide all anonymous uploads
                </label>
                <span class="explanationSpan">(Will still be overridden by whitelist rules)</span><br />

                <input type="checkbox" id="nseCheckHideReported"${nseHideReportedEnabled ? ' checked' : ''} />
                <label for="nseCheckHideReported" class="settingsCheckbox">
                    ⛔ Hide reported uploads
                </label>
                <span class="explanationSpan">(Hide torrents with active reports, whitelists will override)</span><br />

                <input type="checkbox" id="nseCheckHideWarned"${nseHideWarnedEnabled ? ' checked' : ''} />
                <label for="nseCheckHideWarned" class="settingsCheckbox">
                    ⚔️ Hide warned uploads
                </label>
                <span class="explanationSpan">(Hide torrents with active warning, whitelists will override)</span><br /><br />

                <b>Torrent personal status</b><br />
                <input type="checkbox" id="nseCheckHideGrabbed"${nseHideGrabbedEnabled ? ' checked' : ''} />
                <label for="nseCheckHideGrabbed" class="settingsCheckbox">
                    💾 Hide grabbed uploads
                </label>
                <span class="explanationSpan">(Hide torrents you have previously grabbed)</span><br />

                <input type="checkbox" id="nseCheckHideLeeching"${nseHideLeechingEnabled ? ' checked' : ''} />
                <label for="nseCheckHideLeeching" class="settingsCheckbox">
                    ⏬ Hide leeching uploads
                </label>
                <span class="explanationSpan">(Hide torrents you are currently leeching)</span><br />

                <input type="checkbox" id="nseCheckHideSeeding"${nseHideSeedingEnabled ? ' checked' : ''} />
                <label for="nseCheckHideSeeding" class="settingsCheckbox">
                    ⏫ Hide seeding uploads
                </label>
                <span class="explanationSpan">(Hide torrents you are currently seeding)</span><br />

                <input type="checkbox" id="nseCheckHideSnatched"${nseHideSnatchedEnabled ? ' checked' : ''} />
                <label for="nseCheckHideSnatched" class="settingsCheckbox">
                    💽 Hide snatched uploads
                </label>
                <span class="explanationSpan">(Hide torrents you have already downloaded/snatched)</span><br /><br />

                <input type="checkbox" id="nseCheckBypassWhitelists"${nseBypassWhitelistsEnabled ? ' checked' : ''} />
                <label for="nseCheckBypassWhitelists" class="settingsCheckbox">
                    💫 Bypass whitelists for personal status filtering
                </label><br />
                <span class="explanationSpan" style="margin-left: 60px;">(Ignore all whitelists when filtering grabbed/leeching/seeding/snatched torrents)</span><br />
            </p>
            <h3>Cosmetic</h3>
            <p>
                <input type="checkbox" id="nseCheckObliviousMode"${nseObliviousModeEnabled ? ' checked' : ''} />
                <label for="nseCheckObliviousMode" class="settingsCheckbox">
                    ❓ Oblivious
                </label>
                <span class="explanationSpan">(Hide torrent tag lists)</span><br />

                <input type="checkbox" id="nseCheckCustomCSS"${nseCustomCSSEnabled ? ' checked' : ''} />
                <label for="nseCheckCustomCSS" class="settingsCheckbox">
                    📜 Custom CSS
                </label>
                <span class="explanationSpan">(Define your own CSS rules)</span>
                <div id="nseCustomCSSDiv" ${nseCustomCSSEnabled ? '' : 'class="hidden"'}>
                    Define your custom CSS below. Note that this code is injected at the very end of the built-in CSS, so use the !important tag liberally to overwrite existing rules. Do not escape backslashes, it will be done automatically.
                    <textarea class="nseTextArea" id="nseCustomCSSArea" rows=10>${nseCustomCSS.replace(/\\\\/gi,"\\")}</textarea>
                </div>
            </p>
            <p>
                Theme:<br />
                <select name="nseThemeDropdown" id="nseThemeDropdown">
                    <option value="nseThemeDefault" ${nseSelectedTheme=="nseThemeDefault" ? "selected='selected'" : ''}>Default</option>
                    <option value="nseThemeLegacy" ${nseSelectedTheme=="nseThemeLegacy" ? "selected='selected'" : ''}>Legacy</option>
                    <option value="nseThemeEdgy" ${nseSelectedTheme=="nseThemeEdgy" ? "selected='selected'" : ''}>Edgy</option>
                    <option value="nseThemeBaked" ${nseSelectedTheme=="nseThemeBaked" ? "selected='selected'" : ''}>Baked</option>
                    <option value="nseThemeCustom" ${nseSelectedTheme=="nseThemeCustom" ? "selected='selected'" : ''}>Custom</option>
                </select>
                <span id="nseThemeDescription" class="explanationSpan">${nseSelectedTheme=="nseThemeDefault" ? "White background with black text and blue accents" : ''}${nseSelectedTheme=="nseThemeLegacy" ? "Ye Olde Theme with a blue background and white text" : ''}${nseSelectedTheme=="nseThemeEdgy" ? "For the edgelord in all of us, red text on a black background" : ''}${nseSelectedTheme=="nseThemeBaked" ? "Ayyyy 420 blaze it &mdash; Green and purple" : ''}${nseSelectedTheme=="nseThemeCustom" ? "Define your own colors using the text boxes below" : ''}</span>

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

                    <p>Remember to click "Save" to save your changes!</p>
                </div>
            </p>

            <h3>Fun</h3>
                <p>
                    <input type="checkbox" id="nseCheckRussianRouletteMode"${nseRussianRouletteEnabled ? ' checked' : ''} />
                    <label for="nseCheckRussianRouletteMode" class="settingsCheckbox">
                        🎲 Russian Roulette
                    </label>
                    <span class="explanationSpan">(Randomly and silently show filtered torrents)</span>
                </p>

            <h3>About</h3>
                <p>
                    Copyright &copy; 2015-2021 ceodoe. NoShitEmpornium ${nseVersion} was made with 💕 by <a class="nseLink" href="/user.php?id=508194">ceodoe</a> of Empornium, and its code is licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.txt" target="_blank">GNU General Public License v3.0</a>.
                </p>
                <p>
                    <span class="nseImageButton" id="nseGithub"><a class="nseLink" href="https://github.com/ceodoe/noshitempornium" target="_blank">🐙 Report a bug or view commit history on GitHub</a></span><br />
                    <span class="nseImageButton" id="nseChangelog"><a class="nseLink" href="https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG.md" target="_blank">📋 Read the NSE changelog</a></span><br />
                    <span class="nseImageButton" id="nseEmpoThread"><a class="nseLink" href="/forum/thread/44258?postid=956045#post956045" target="_blank">🧵 Read the official forum thread on Emp</a></span>
                </p>
        </section>

        <div style="text-align: center;">
            <span id="nseSaveButton" class="nseNiceButton">💾 Save</span>
            <span id="nseReloadButton" class="nseNiceButton">🔃 Reload page and apply changes</span>
        </div>

        <div style="text-align: center;" id="nseSaveDiv" class="hidden">

        </div>
    </div>
</div>

<div id="nseRCMBox" class="hidden">
    <div id="nseRCMClose">❌</div>
    <p id="nseRCMBoxInfoText">Tag/uploader placeholder text</p>
    <p id="nseRCMBoxChoices">

    </p>
    <p><small>Your settings will be automatically saved when you choose one of the above options. Your changes will reflect in the torrent list once the page is <span class="nseSpanLink" onclick="location.reload();"><b>reloaded</b></a>.</small></p>
</div>
`

// Perform actual insertion of our HTML UI element
referenceNode.parentNode.insertBefore(htmlContent, referenceNode.nextSibling);

// Assign event handlers and other tidbits
var headerNode = document.getElementById("nseHeaderText");

if(count === 0) {
    headerNode.innerHTML = "NoShitEmpornium";
} else if(count === 1) {
    headerNode.innerHTML = "Toggle 1 hidden torrent";
} else if(count > 1) {
    headerNode.innerHTML = "Toggle " + count + " hidden torrents";
}

if(count > 0) {
    headerNode.onclick = (function() { toggleTorrents(); });
}

document.getElementById("nseToggleOptionsNode").onclick = (function() {
    document.getElementById("nseMainDiv").classList.toggle("hidden");
});

document.getElementById("nseCheckCustomCSS").onclick = (function() {
    if(this.checked) {
        document.getElementById("nseCustomCSSDiv").classList.remove("hidden");
    } else {
        document.getElementById("nseCustomCSSDiv").classList.add("hidden");
    }
});

document.getElementById("nseThemeDropdown").onchange = (function() {
    var selectedTheme = this.options[this.selectedIndex].value;
    var descriptionNode = document.getElementById("nseThemeDescription");

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
});

// Create event handlers for right-click management
if(nseRightClickManagementEnabled) {
    var allTagElements = document.querySelectorAll(".nseTagElement");
    for(var i = 0; i < allTagElements.length; i++) {
        allTagElements[i].addEventListener('contextmenu', function(ev) {
            ev.preventDefault();

            showRCMBox("tag", this.innerHTML.trim(), ev.pageX, ev.pageY);

            return false;
        }, false);
    }

    var allUploaderElements = document.querySelectorAll(".nseUploaderElement");
    for(var j = 0; j < allUploaderElements.length; j++) {
        allUploaderElements[j].addEventListener('contextmenu', function(ev) {
            ev.preventDefault();

            showRCMBox("uploader", this.innerHTML.trim(), ev.pageX, ev.pageY);

            return false;
        }, false);
    }

    document.getElementById("nseRCMClose").onclick = function() {
        this.parentNode.classList.add("hidden");
    }
}

function showRCMBox(boxType, elementValue, mouseX, mouseY) {
    var box = document.getElementById("nseRCMBox");
    var x = mouseX;
    var y = mouseY;

    if(x - 150 < 0) {
        x = 0;
    } else if(x + 320 > window.innerWidth) {
        x = window.innerWidth - 350;
    } else {
        x -= 150;
    }

    box.style.left = x + "px";
    box.style.top = y - 90 + "px";

    var nseRCMBoxInfoText = box.querySelector("#nseRCMBoxInfoText");
    if(boxType == "tag") {
        var infoText = "<b>Tag:</b> <span class=\"nseRCMMonospace\" id=\"nseRCMBoxTag\">" + elementValue + "</span><br /><br />";

        var currTagBlacklist = document.getElementById("nseBlacklistTaglistArea").value.split(" ");
        var currTagWhitelist = document.getElementById("nseWhitelistTaglistArea").value.split(" ");
        var nseRCMBoxChoices = document.getElementById("nseRCMBoxChoices");

        if(currTagBlacklist.includes(elementValue)) { // Current tag is in blacklist
            infoText = infoText + `This tag was found in your <span class="nseBlacklistIdentifier">blacklist</span>!`;

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxBLRemove">➖ Remove from blacklist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxWLAdd">➕ Move to whitelist</span><br />
            `;

            document.getElementById("nseRCMBoxBLRemove").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                removeItemFromList("nseBlacklistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxWLAdd").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                addItemToList("nseWhitelistTaglistArea", "nseBlacklistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };
        } else if(currTagWhitelist.includes(elementValue)) { // Current tag is in whitelist
            infoText = infoText + `This tag was found in your <span class="nseWhitelistIdentifier">whitelist</span>!`;

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxWLRemove">➖ Remove from whitelist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxBLAdd">➕ Move to blacklist</span><br />
            `;

            document.getElementById("nseRCMBoxWLRemove").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                removeItemFromList("nseWhitelistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxBLAdd").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                addItemToList("nseBlacklistTaglistArea", "nseWhitelistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };
        } else { // Current tag is in no list
            infoText = infoText + "This tag was not found in either of your taglists.";

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxBLAdd">➕ Add to blacklist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxWLAdd">➕ Add to whitelist</span><br />
            `;

            document.getElementById("nseRCMBoxBLAdd").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                addItemToList("nseBlacklistTaglistArea", "nseWhitelistTaglistArea", currTag)
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxWLAdd").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxTag").innerHTML;
                addItemToList("nseWhitelistTaglistArea", "nseBlacklistTaglistArea", currTag);
                saveData();
                closeRCMBox();
            };
        }

        nseRCMBoxInfoText.innerHTML = infoText;
    } else if(boxType == "uploader") {
        var infoText = "<b>Uploader:</b> <span class=\"nseRCMMonospace\" id=\"nseRCMBoxUploader\">" + elementValue + "</span><br /><br />";

        var currUploaderBlacklist = document.getElementById("nseBlacklistUploadersArea").value.split(" ");
        var currUploaderWhitelist = document.getElementById("nseWhitelistUploadersArea").value.split(" ");
        var nseRCMBoxChoices = document.getElementById("nseRCMBoxChoices");

        if(currUploaderBlacklist.includes(elementValue)) { // Current uploader is in blacklist
            infoText = infoText + `This uploader was found in your <span class="nseBlacklistIdentifier">blacklist</span>!`;

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxBLRemove">➖ Remove from blacklist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxWLAdd">➕ Move to whitelist</span><br />
            `;

            document.getElementById("nseRCMBoxBLRemove").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                removeItemFromList("nseBlacklistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxWLAdd").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                addItemToList("nseWhitelistUploadersArea", "nseBlacklistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };
        } else if(currUploaderWhitelist.includes(elementValue)) { // Current uploader is in whitelist
            infoText = infoText + `This uploader was found in your <span class="nseWhitelistIdentifier">whitelist</span>!`;

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxWLRemove">➖ Remove from whitelist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxBLAdd">➕ Move to blacklist</span><br />
            `;

            document.getElementById("nseRCMBoxWLRemove").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                removeItemFromList("nseWhitelistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxBLAdd").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                addItemToList("nseBlacklistUploadersArea", "nseWhitelistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };
        } else { // Current uploader is in no list
            infoText = infoText + "This uploader was not found in either of your uploader lists.";

            nseRCMBoxChoices.innerHTML = `
                <span class="nseRCMButton" id="nseRCMBoxBLAdd">➕ Add to blacklist</span><br /><br />
                <span class="nseRCMButton" id="nseRCMBoxWLAdd">➕ Add to whitelist</span><br />
            `;

            document.getElementById("nseRCMBoxBLAdd").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                addItemToList("nseBlacklistUploadersArea", "nseWhitelistUploadersArea", currTag)
                saveData();
                closeRCMBox();
            };

            document.getElementById("nseRCMBoxWLAdd").onclick = function() {
                var currTag = document.getElementById("nseRCMBoxUploader").innerHTML;
                addItemToList("nseWhitelistUploadersArea", "nseBlacklistUploadersArea", currTag);
                saveData();
                closeRCMBox();
            };
        }

        nseRCMBoxInfoText.innerHTML = infoText;
    }

    box.classList.remove("hidden");
    return false;
}

function closeRCMBox() {
    document.getElementById("nseRCMBox").classList.add("hidden");
}

function removeItemFromList(tagListAreaName, tagName) {
    var currList = document.getElementById(tagListAreaName).value.trim().split(" ");

    var index = currList.indexOf(tagName);
    if (index > -1) {
        currList.splice(index, 1);
    }

    document.getElementById(tagListAreaName).value = currList.join(" ");
}

function addItemToList(tagListAreaName, oppositeTagListAreaName, tagName) {
    removeItemFromList(oppositeTagListAreaName, tagName);

    var currList = document.getElementById(tagListAreaName).value.trim().split(" ");
    currList.push(tagName);
    document.getElementById(tagListAreaName).value = currList.join(" ");
}

// Save function
document.getElementById("nseSaveButton").onclick = function() { saveData(); };

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
    GM_setValue("nseEnableGCDCompatibilityMode", document.getElementById("nseCheckGCDCompatibilityMode").checked)
    GM_setValue("nseRightClickManagementEnabled", document.getElementById("nseCheckRightClickManagementEnabled").checked)

    var nseThemeDropdown = document.getElementById("nseThemeDropdown");
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
    var css = document.getElementById("nseCustomCSSArea").value
    css = css.replace(/\\/gi, "\\\\");
    GM_setValue("nseCustomCSS", css);
    GM_setValue("nseCustomCSSEnabled", document.getElementById("nseCheckCustomCSS").checked);

    var time = new Date().toLocaleTimeString();
    document.getElementById("nseSaveDiv").innerHTML = "Saved at " + time + "!";
    document.getElementById("nseSaveDiv").classList.remove("hidden");
}

document.getElementById("nseReloadButton").onclick = (function() {
    location.reload();
});
// End HTML section


// Explanation section
// This could be incorporated into above HTML chunk, but is kept down here so I can easily change it if needed
var explanationTogglers = new Array("nseBLE", "nseWLE", "nseTitleBLE", "nseTitleWLE", "nseUBLE", "nseUWLE");

for(var i = 0; i < explanationTogglers.length; i++) {
    var currentElement = explanationTogglers[i];
    document.getElementById(currentElement + "Toggler").onclick = function() {
        document.getElementById(this.id.substring(0, this.id.length - 7)).classList.toggle("hidden");
    };
};

document.getElementById("nseBLE").innerHTML = `
<div class="nseExplanationNode">
    <b>TL;DR</b>: <i>If any of these tags exist, hide the torrent</i>
</div>

<div class="nseExplanationNode">This is where you specify tags you don't want to see. Any torrent matching any of these tags will be hidden unless overridden by any of the whitelist rules. The correct format for this field is the same used for tags on Empornium itself: Tags are separated by spaces, and uses a period between words within a tag. Character case does not matter. Blacklisted tags will be highlighted in <span style="color:#f00"><b>red</b></span> when viewing hidden torrents.
</div>

<div class="nseExplanationNode">Example:<br /><pre>scat piss.drinking jerk.off.instruction non.nude</pre></div>
`;

document.getElementById("nseWLE").innerHTML = `
<div class="nseExplanationNode">
    <b>TL;DR</b>: <i>If any of these tags exist, ignore all other rules</i>
</div>

<div class="nseExplanationNode">This is where you specify tags you want to show regardless of all other rules. In other words, no matter if the torrent matches on tags, title or uploader blacklists &mdash; if it contains any of these whitelisted tags, it will be shown regardless. The correct format for this field is the same used for tags on Empornium itself: Tags are separated by spaces, and uses a period between words within a tag. Character case does not matter. Whitelisted tags will be highlighted in <span style="color:#0f0"><b>green</b></span>.
</div>

<div class="nseExplanationNode">Example:<br /><pre>sasha.grey huge.ass gianna.michaels femdom</pre></div>
`;

document.getElementById("nseTitleBLE").innerHTML = `
<div class="nseExplanationNode">
    <b>TL;DR</b>: <i>If any of these phrases are in the title, hide the torrent</i>
</div>

<div class="nseExplanationNode">This is where you specify title phrases you want to filter on. This is useful for hiding untagged content with a recurring theme (for example specific JAV series you don't care about, or re-encoded content). Character case does not matter. <b>Title phrases are separated by semicolons (;) &mdash; not spaces like tags or uploaders!</b>
</div>

<div class="nseExplanationNode">Example:<br /><pre>sdmm;hikr;princess peach;reencode</pre></div>
`;

document.getElementById("nseTitleWLE").innerHTML = `
<div class="nseExplanationNode">
    <b>TL;DR</b>: <i>If any of these words are in the title, ignore all other rules</i>
</div>

<div class="nseExplanationNode">This is where you specify title phrases you want to show regardless of other rules. Character case does not matter. <b>Title phrases are separated by semicolons (;) &mdash; not spaces like tags or uploaders!</b>
</div>

<div class="nseExplanationNode">Example:<br /><pre>minipack;super mario;sdmm;moist</pre></div>
`;

document.getElementById("nseUBLE").innerHTML = `
<div class="nseExplanationNode">
    <b>TL;DR</b>: <i>If this torrent is uploaded by any of these users, hide it</i>
</div>

<div class="nseExplanationNode">This is where you specify the names of uploaders you want to hide all uploads from, unless overriden by a whitelist rule. Uploader names will be highlighted in <span style="color:#f00"><b>red</b></span> when viewing hidden torrents. Character case does not matter. Note that filtering based on usernames will not function on collage pages, as torrent uploaders are not exposed on those pages.
</div>

<div class="nseExplanationNode">Example:<br /><pre>SuperUploader2007 LowQualityUploadsIncorporated</pre></div>
`;

document.getElementById("nseUWLE").innerHTML = `
<div class="nseExplanationNode">
    <b>TL;DR</b>: <i>If this torrent is uploaded by any of these users, show it regardless of any other rules</i>
</div>

<div class="nseExplanationNode">This is where you specify the names of uploaders you want to show all uploads from, regardless of any blacklist rules. Uploader names will be highlighted in <span style="color:#0f0"><b>green</b></span>. Character case does not matter. Note that filtering based on usernames will not function on collage pages, as torrent uploaders are not exposed on those pages.
</div>

<div class="nseExplanationNode">Example:<br /><pre>NobelPrizeWinningUploads ActuallyGreatUploader69 ceodoe</pre></div>
`;
// End explanation section


// Start CSS section
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
};

addGlobalStyle(`

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

.settingsCheckbox {
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

.explanationSpan {
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

.nseExplanationBox, #nseCustomThemeDiv, #nseCustomCSSDiv {
    width: 97%;
    margin-top: 10px;
    border: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
    padding: 10px;
    border-radius: 10px;
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

${nseCustomCSSEnabled ? nseCustomCSS : ''}

`);
// End CSS section
