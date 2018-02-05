// ==UserScript==
// @name         NoShitEmpornium
// @namespace    http://www.empornium.me/
// @version      1.4.2
// @description  Hides torrents with specified tags or by specified uploaders on Empornium
// @author       ceodoe
// @include      /^https?://www\.empornium\.(me|sx)/torrents\.php*/
// @include      /^https?://www\.empornium\.(me|sx)/collages\.php\?(id|page)/
// @include      /^https?://www\.empornium\.(me|sx)/top10\.php*/
// @exclude      /^https?://www\.empornium\.(me|sx)/torrents\.php\?id=*/
// @exclude      /^https?://www\.empornium\.(me|sx)/torrents\.php\?type=(seeding|leeching)/
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

var illegalTaglist = GM_getValue("nseTaglist","!notags!");
var illegalTags;

var illegalUploadersList = GM_getValue("nseUploaders","!nouploaders!");
var illegalUploaders;

if(illegalTaglist == "!notags!") {
    illegalTaglist = "enter.illegal.tags.here separated.by.spaces.only no.newlines scat puke blood";
    illegalTags = new Array("enter.illegal.tags.here", "separated.by.spaces.only", "no.newlines", "scat", "puke", "blood");
} else {
    illegalTags = illegalTaglist.split(" ");
}

if(illegalUploadersList == "!nouploaders!") {
    illegalUploadersList = "putusernameshere separatedbyspacesonly nonewlines";
    illegalUploaders = new Array("putusernameshere", "separatedbyspacesonly", "nonewlines");
} else {
    illegalUploaders = illegalUploadersList.split(" ");
}

var count = 0;
var torrents = document.querySelectorAll("tr.torrent");

// For every torrent
for(var i = 0; i < torrents.length; i++) {
    var tagElement = torrents[i].querySelector("td > div.tags");
    var uploaderElement = torrents[i].querySelector("td.user > a");

    if(str_contains("top10.php", window.location.href) === true) {
        uploaderElement = torrents[i].querySelector("td:nth-child(10) > a");
    }

    var currentHidden = false;

    if(uploaderElement !== null) {
        // For every illegal uploader
        for(var l = 0; l < illegalUploaders.length; l++) {
            var uploader = uploaderElement.innerHTML;
            if(uploader == illegalUploaders[l]) {
                currentHidden = true;
                uploaderElement.setAttribute("style","color: #F00 !important; font-weight: bold !important;");
            }
        }
    }

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
} else if(str_contains("collages.php?", window.location.href) === true) {
    referenceNode = document.querySelector("#content > div > div.main_column > div:nth-child(7)");
}

var toggleDivNode = document.createElement("div");
toggleDivNode.setAttribute("style",
                           "color: #FFF;"
                         + "background-color: #009;"
                         + "padding: 5px;"
                         + "border: 1px solid blue;"
                         + "border-radius: 10px;"
                         + "text-align: center;"
                         + "margin-bottom: 5px !important;"
                         + "margin-top: 5px !important;"
                         + "margin: auto;");

var toggleSpanNode = document.createElement("span");
var innerHTMLText = "Toggle " + count + " hidden torrent";
toggleSpanNode.setAttribute("style","cursor: pointer;");
toggleSpanNode.onclick = (function() { toggleTorrents(); });

if(count === 0) {
    innerHTMLText = "NoShitEmpornium";
    toggleSpanNode.onclick = null;
} else if(count > 1) {
    innerHTMLText = innerHTMLText + "s";
}

toggleSpanNode.innerHTML = innerHTMLText;


var taglistTextAreaExplanationNode = document.createElement("span");
taglistTextAreaExplanationNode.innerHTML = "Specify illegal tags here, space separated (example: big.tits scat puke water.sports):";
taglistTextAreaExplanationNode.setAttribute("style","font-weight: bold;");

var taglistTextAreaNode = document.createElement("textarea");
taglistTextAreaNode.rows = 10;
taglistTextAreaNode.cols = 100;
taglistTextAreaNode.id = "nseTaglistArea";

var uploaderTextAreaExplanationNode = document.createElement("span");
uploaderTextAreaExplanationNode.innerHTML = "Specify illegal uploader names here, space separated, case sensitive (example: SuperUploader2017 m3gad1ckZ):";
uploaderTextAreaExplanationNode.setAttribute("style","font-weight: bold;");

var uploaderTextAreaNode = document.createElement("textarea");
uploaderTextAreaNode.rows = 5;
uploaderTextAreaNode.cols = 100;
uploaderTextAreaNode.id = "nseUploaderArea";

var taglistSaveNode = document.createElement("input");
taglistSaveNode.type = "button";
taglistSaveNode.value = "Save and reload page";

var toggleOptionsNode = document.createElement("input");
toggleOptionsNode.type = "button";
toggleOptionsNode.value = "Options";
toggleOptionsNode.setAttribute("style","margin-left: 5px !important;");

taglistTextAreaNode.innerHTML = illegalTaglist;
uploaderTextAreaNode.innerHTML = illegalUploadersList;

var optionsWrapperNode = document.createElement("div");
optionsWrapperNode.setAttribute("style","padding: 5px;");
optionsWrapperNode.classList.toggle("hidden");

toggleDivNode.appendChild(toggleSpanNode);
toggleDivNode.appendChild(toggleOptionsNode);
toggleDivNode.appendChild(optionsWrapperNode);
optionsWrapperNode.appendChild(taglistTextAreaExplanationNode);
optionsWrapperNode.appendChild(document.createElement("br"));
optionsWrapperNode.appendChild(taglistTextAreaNode);
optionsWrapperNode.appendChild(document.createElement("br"));
optionsWrapperNode.appendChild(document.createElement("br"));
optionsWrapperNode.appendChild(uploaderTextAreaExplanationNode);
optionsWrapperNode.appendChild(document.createElement("br"));
optionsWrapperNode.appendChild(uploaderTextAreaNode);
optionsWrapperNode.appendChild(document.createElement("br"));
optionsWrapperNode.appendChild(taglistSaveNode);

referenceNode.parentNode.insertBefore(toggleDivNode, referenceNode.nextSibling);

toggleOptionsNode.onclick = (function() {
    optionsWrapperNode.classList.toggle("hidden");
});

taglistSaveNode.onclick = (function() {
    GM_setValue("nseTaglist", document.getElementById("nseTaglistArea").value);
    GM_setValue("nseUploaders", document.getElementById("nseUploaderArea").value);
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

