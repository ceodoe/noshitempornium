// ==UserScript==
// @name         NoShitEmpornium
// @namespace    http://www.empornium.me/
// @version      1.3.1
// @description  Hides torrents with specified tags on Empornium
// @author       ceodoe
// @match        *://*.empornium.me/torrents.php*
// @match        *://*.empornium.me/top10.php*
// @match        *://*.empornium.me/collages.php*
// @match        *://*.empornium.sx/torrents.php*
// @match        *://*.empornium.sx/top10.php*
// @match        *://*.empornium.sx/collages.php*
// @exclude      *://*.empornium.me/torrents.php?id=*
// @exclude      *://*.empornium.me/torrents.php?type=uploaded*
// @exclude      *://*.empornium.sx/torrents.php?id=*
// @exclude      *://*.empornium.sx/torrents.php?type=uploaded*
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

//
// Changelog
// v1.3.1
// - Added matching of both .me and .sx domains
//
// v1.3
// - Major code restructuring and changes
// - Added in-page taglist management (click [Options]), no more need for manually editing the script
// - Removed ability to hide the toggle button, it is now required to manage tags
// - Button is now always visible on applicable pages to enable taglist management when no torrents were hidden
//
// v1.2.7
// - Added toggling the toggle button by changing the toggleButtonEnabled variable's value
// - Minor code changes
//
// v1.2.6
// - Now runs on individual collage pages
//
// v1.2.5
// - The script now also matches HTTPS, in case Emp ever implements SSL
// - Toggle button will now show "torrent" instead of "torrents" when there's only one hidden element
// - Starting with v1.2.5, changelog will be included with script

var illegalTaglist = GM_getValue("nseTaglist","!notags!");
var illegalTags;

if(illegalTaglist == "!notags!") {
    illegalTaglist = "enter.illegal.tags.here separated.by.spaces.only no.newlines scat puke blood";
    illegalTags = new Array("enter.illegal.tags.here", "separated.by.spaces.only", "no.newlines", "scat", "puke", "blood");
} else {
    illegalTags = illegalTaglist.split(" ");
}

var count = 0;
var torrents = document.querySelectorAll("tr.torrent");

// For every torrent
for(var i = 0; i < torrents.length; i++) {
    var tagElement = torrents[i].querySelector("td > div.tags");
    var currentHidden = false;

    // For every illegal tag
    for(var j = 0; j < illegalTags.length; j++) {
        var tagList = tagElement.querySelectorAll("a");

        // For every tag in the current torrent
        for(var k = 0; k < tagList.length; k++) {
            if(tagList[k].innerHTML == illegalTags[j]) {
                currentHidden = true;
                tagList[k].setAttribute("style","color: #F00 !important; font-weight: bold !important;");
            }
        }
    }

    if(currentHidden === true) {
        torrents[i].style.backgroundColor = "#AAF";
        torrents[i].classList.add("hidden");
        count += 1;
    }
}

var referenceNode = document.querySelector("div#filter_slidetoggle");

if(str_contains("top10.php", window.location.href) === true) {
    referenceNode = document.querySelector("#content > div > form");
} else if(str_contains("?action=notify", window.location.href) === true) {
    referenceNode = document.querySelector("#content > div > h2");
} else if(str_contains("collages.php?id=", window.location.href) === true) {
    referenceNode = document.querySelector("#content > div > div.main_column > div:nth-child(7)");
}

var toggleDivNode = document.createElement("div");
toggleDivNode.setAttribute("style", "color: #FFF; background-color: #00A; cursor: pointer; padding: 5px; border: 1px solid blue; border-radius: 10px; text-align: center; width: 100%; float: right; margin-bottom: 10px !important;");

var toggleSpanNode = document.createElement("span");
var innerHTMLText = "Toggle " + count + " hidden torrent";
toggleSpanNode.onclick = (function() { toggleTorrents(); });

if(count === 0) {
    innerHTMLText = "NoShitEmpornium";
    toggleSpanNode.onclickl = null;
} else if(count > 1) {
    innerHTMLText = innerHTMLText + "s";
}

toggleSpanNode.innerHTML = innerHTMLText;

var taglistTextAreaNode = document.createElement("textarea");
taglistTextAreaNode.setAttribute("style","margin-top: 10px;");
taglistTextAreaNode.rows = 10;
taglistTextAreaNode.cols = 100;
taglistTextAreaNode.id = "nseTaglistArea";

var taglistSaveNode = document.createElement("input");
taglistSaveNode.type = "button";
taglistSaveNode.value = "Save tags and reload";

var toggleOptionsNode = document.createElement("sup");
toggleOptionsNode.innerHTML = "[Options]";
toggleOptionsNode.setAttribute("style","margin-left: 5px;");

taglistTextAreaNode.innerHTML = illegalTaglist;

var optionsWrapperNode = document.createElement("div");
optionsWrapperNode.setAttribute("style","padding: 5px;");
optionsWrapperNode.classList.toggle("hidden");

toggleDivNode.appendChild(toggleSpanNode);
toggleDivNode.appendChild(toggleOptionsNode);
toggleDivNode.appendChild(optionsWrapperNode);
optionsWrapperNode.appendChild(taglistTextAreaNode);
optionsWrapperNode.appendChild(document.createElement("br"));
optionsWrapperNode.appendChild(taglistSaveNode);

referenceNode.parentNode.insertBefore(toggleDivNode, referenceNode.nextSibling);

toggleOptionsNode.onclick = (function() {
    optionsWrapperNode.classList.toggle("hidden");
});

taglistSaveNode.onclick = (function() {
    GM_setValue("nseTaglist", document.getElementById("nseTaglistArea").value);
    location.reload();
});

function toggleTorrents() {
    for(var k = 0; k < torrents.length; k++) {
        torrents[k].classList.toggle("hidden");
    }
}

function str_contains(needle, haystack) {
    if(haystack.indexOf(needle) > -1) {
        return true;
    } else {
        return false;
    }
}

