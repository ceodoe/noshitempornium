// ==UserScript==
// @name         NoShitEmpornium
// @namespace    http://www.empornium.me/
// @version      2.2
// @description  Hides torrents with specified tags or by specified uploaders on Empornium
// @updateURL    https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js
// @downloadURL  https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js
// @author       ceodoe
// @include      /^https?://www\.empornium\.(me|sx)/torrents\.php*/
// @include      /^https?://www\.empornium\.(me|sx)/collages\.php.*id=*/
// @include      /^https?://www\.empornium\.(me|sx)/top10\.php*/
// @exclude      /^https?://www\.empornium\.(me|sx)/torrents\.php.*(\?|&)(type=|id=)/
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
var nseVersion = "v2.2"

// Load saved lists and options
var nseBlacklistTaglist = GM_getValue("nseTaglist",""); // 3 unchanged names to allow backwards comp
var nseBlacklistTags;

var nseWhitelistTaglist = GM_getValue("nseWhitelist",""); // ^
var nseWhitelistTags;

var nseBlacklistTitleList = GM_getValue("nseBlacklistTitles","");
var nseBlacklistTitleWords;

var nseWhitelistTitleList = GM_getValue("nseWhitelistTitles","");
var nseWhitelistTitleWords;

var nseBlacklistUploadersList = GM_getValue("nseUploaders",""); // ^
var nseBlacklistUploaders;

var nseWhitelistUploadersList = GM_getValue("nseWhitelistUploaders","");
var nseWhitelistUploaders;

var nseObliviousModeEnabled = GM_getValue("nseObliviousModeEnabled","");
var nseRussianRouletteEnabled = GM_getValue("nseRussianRouletteEnabled","");
var nseSelectedTheme = GM_getValue("nseSelectedTheme","");
var nseCustomTheme = GM_getValue("nseCustomTheme","");

var nseCustomCSSEnabled = GM_getValue("nseCustomCSSEnabled","");
var nseCustomCSS = GM_getValue("nseCustomCSS","");

// Initialize lists and options

// Initialize tag lists
if(nseBlacklistTaglist.trim() == "") {
    nseBlacklistTaglist = "enter.illegal.tags.here separated.by.spaces.only no.newlines scat puke blood";
    nseBlacklistTags = new Array("enter.illegal.tags.here", "separated.by.spaces.only", "no.newlines", "scat", "puke", "blood");
} else {
    nseBlacklistTags = nseBlacklistTaglist.split(" ");
}

if(nseWhitelistTaglist.trim() == "") {
    nseWhitelistTaglist = "whitelist.tags go.here";
    nseWhitelistTags = new Array("whitelist.tags", "go.here");
} else {
    nseWhitelistTags = nseWhitelistTaglist.split(" ");
}


// Initialize title lists
if(nseBlacklistTitleList.trim() == "") {
    nseBlacklistTitleList = "fillerword titleblacklist";
    nseBlacklistTitleWords = new Array("fillerword", "titleblacklist");
} else {
    nseBlacklistTitleWords = nseBlacklistTitleList.split(" ");
}

if(nseWhitelistTitleList.trim() == "") {
    nseWhitelistTitleList = "fillerword titlewhitelist";
    nseWhitelistTitleWords = new Array("fillerword", "titlewhitelist");
} else {
    nseWhitelistTitleWords = nseWhitelistTitleList.split(" ");
}


// Initialize uploader lists
if(nseBlacklistUploadersList.trim() == "") {
    nseBlacklistUploadersList = "putusernameshere separatedbyspacesonly nonewlines";
    nseBlacklistUploaders = new Array("putusernameshere", "separatedbyspacesonly", "nonewlines");
} else {
    nseBlacklistUploaders = nseBlacklistUploadersList.split(" ");
}

if(nseWhitelistUploadersList.trim() == "") {
    nseWhitelistUploadersList = "putusernameshere separatedbyspacesonly nonewlines";
    nseWhitelistUploaders = new Array("putusernameshere", "separatedbyspacesonly", "nonewlines");
} else {
    nseWhitelistUploaders = nseWhitelistUploadersList.split(" ");
}

// Initialize options
if(nseObliviousModeEnabled == "") {
    nseObliviousModeEnabled = false;
}

if(nseRussianRouletteEnabled == "") {
    nseRussianRouletteEnabled = false;
}

if(nseSelectedTheme == "") {
    nseSelectedTheme = "nseThemeDefault";
}

if(nseCustomTheme == "") {
    nseCustomTheme = {
        backgroundColor: "#fff",
        backgroundHighlightColor: "#cfe7ff",
        foregroundColor: "#000",
        accentColor: "#0af",
        highlightColor: "#0071b0"
    }
}

if(nseCustomCSSEnabled == "") {
    nseCustomCSSEnabled = false;
}

// End of initialization


// Define themes;
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
    
    if(str_contains("collages.php", window.location.href) === true) {
        titleElement = torrents[i].querySelector("td > strong > a");
    } else {
        titleElement = torrents[i].querySelector("td > a");
    }

    if(str_contains("top10.php", window.location.href) === true) {
        uploaderElement = torrents[i].querySelector("td:nth-child(10) > a");
    }
    
    if(nseObliviousModeEnabled == true) {
        tagElement.classList.add("hidden");
    }

    var currentHidden = false;
    var currentWhitelisted = false;

    // Check uploaders
    if(uploaderElement !== null) { // If it is null, it's an anon upload
        var uploader = uploaderElement.innerHTML.trim().toLowerCase();
        
        for(var l = 0; l < nseBlacklistUploaders.length; l++) {
            if(uploader == nseBlacklistUploaders[l].trim().toLowerCase()) {
                currentHidden = true;
                if(russianRouletteBulletInChamber == false) { uploaderElement.classList.add("nseHiddenUploader"); }
            }
        }
        
        // If currentHidden is still false, that means no blacklisted uploader was found, check whitelist
        // If currentHidden is true, blacklisted uploader was found, and since usernames are unique, skip check
        if(currentHidden === false) {
            for(var m = 0; m < nseWhitelistUploaders.length; m++) {
                if(uploader == nseWhitelistUploaders[m].trim().toLowerCase()) {
                    currentWhitelisted = true;
                    uploaderElement.classList.add("nseWhitelistedUploader");
                }
            }
        }
    }
    
    // Scan title for nseBlacklistTitleWords
    // ...For every blacklisted word:
    for(var tblCount = 0; tblCount < nseBlacklistTitleWords.length; tblCount++) {
        var currentTBLWord = nseBlacklistTitleWords[tblCount].toLowerCase();
        var torrentTitle = titleElement.innerHTML.trim().toLowerCase();
        if(torrentTitle.includes(currentTBLWord)) {
            currentHidden = true;
            if(russianRouletteBulletInChamber == false) { titleElement.innerHTML = titleElement.innerHTML + ` <color class="nseHiddenTitle">(${currentTBLWord})</color>`; }
        }
    }
    
    // Scan title for nseWhitelistTitleWords
    // ...For every whitelisted word:
    for(var tblCount = 0; tblCount < nseWhitelistTitleWords.length; tblCount++) {
        var currentTWLWord = nseWhitelistTitleWords[tblCount].toLowerCase();
        var torrentTitle = titleElement.innerHTML.trim().toLowerCase();
        if(torrentTitle.includes(currentTWLWord)) {
            currentWhitelisted = true;
            titleElement.innerHTML = titleElement.innerHTML + ` <color class="nseWhitelistedTitle">(${currentTWLWord})</color>`;
        }
    }
    
    var tagList = tagElement.querySelectorAll("a");

    // For every tag in the current torrent
    for(var k = 0; k < tagList.length; k++) {
        if(nseBlacklistTags.includes(tagList[k].innerHTML) === true) {
                currentHidden = true;
                if(russianRouletteBulletInChamber == false) { tagList[k].classList.add("nseHiddenTag"); }
        }

        if(nseWhitelistTags.includes(tagList[k].innerHTML) === true) {
            currentWhitelisted = true;
            tagList[k].classList.add("nseWhitelistedTag");
        }
    }

    if(currentWhitelisted === true) {
        torrents[i].classList.remove("hidden");
    } else if(currentHidden === true) {
        if(russianRouletteBulletInChamber == false) {
            torrents[i].style.backgroundColor = "#AAF";
            torrents[i].classList.add("hidden");
            count += 1;
        }
    }
}
// End of main filtering loop


// Set up reference node to place our html
var referenceNode = document.querySelector("div#filter_slidetoggle");

if(str_contains("top10.php", window.location.href) === true) {
    referenceNode = document.querySelector("#content > div > form");
} else if(str_contains("?action=notify", window.location.href) === true) {
    referenceNode = document.querySelector("#content > div > h2");
} else if(str_contains("collages.php?", window.location.href) === true) {
    referenceNode = document.querySelector("div.clear:nth-child(6)");
}

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
        <label class="nseLabel" for="nseTab1">Tags</label>

        <input class="nseRadioButton" id="nseTab2" type="radio" name="tabs">
        <label class="nseLabel" for="nseTab2">Titles</label>

        <input class="nseRadioButton" id="nseTab3" type="radio" name="tabs">
        <label class="nseLabel" for="nseTab3">Uploaders</label>

        <input class="nseRadioButton" id="nseTab4" type="radio" name="tabs">
        <label class="nseLabel" for="nseTab4">Options</label>

        <section id="nseContent1">
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTagBlacklistHeader">Tag blacklist</span><sup class="nseExplanationToggler" id="nseBLEToggler">[?]</sup><br />
                <div id="nseBLE" class="nseExplanationBox hidden">
                    
                </div>
                <textarea class="nseTextArea" id="nseBlacklistTaglistArea" rows=10>${nseBlacklistTaglist}</textarea>
            </div>
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTagWhitelistHeader">Tag whitelist</span><sup class="nseExplanationToggler" id="nseWLEToggler">[?]</sup><br />
                <div id="nseWLE" class="nseExplanationBox hidden">
                    
                </div>
                <textarea class="nseTextArea" id="nseWhitelistTaglistArea" rows=10>${nseWhitelistTaglist}</textarea>
            </div>
        </section>

        <section id="nseContent2">
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTitleBlacklistHeader">Title blacklist</span><sup class="nseExplanationToggler" id="nseTitleBLEToggler">[?]</sup><br />
                <div id="nseTitleBLE" class="nseExplanationBox hidden">
                
                </div>
                <textarea class="nseTextArea" id="nseBlacklistTitleListArea" rows=10>${nseBlacklistTitleList}</textarea>
            </div>
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseTitleWhitelistHeader">Title whitelist</span><sup class="nseExplanationToggler" id="nseTitleWLEToggler">[?]</sup><br />
                <div id="nseTitleWLE" class="nseExplanationBox hidden">
                    
                </div>
                <textarea class="nseTextArea" id="nseWhitelistTitleListArea" rows=10>${nseWhitelistTitleList}</textarea>
            </div>
        </section>

        <section id="nseContent3">
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseUploaderBlacklistHeader">Uploader blacklist</span><sup class="nseExplanationToggler" id="nseUBLEToggler">[?]</sup><br />
                <div id="nseUBLE" class="nseExplanationBox hidden">
                    
                </div>
                <textarea class="nseTextArea" id="nseBlacklistUploadersArea" rows=10>${nseBlacklistUploadersList}</textarea>
            </div>
            <div class="nseFieldDiv">
                <span class="nseImageButton nseListHeader" id="nseUploaderWhitelistHeader">Uploader whitelist</span><sup class="nseExplanationToggler" id="nseUWLEToggler">[?]</sup><br />
                <div id="nseUWLE" class="nseExplanationBox hidden">
                    
                </div>
                <textarea class="nseTextArea" id="nseWhitelistUploadersArea" rows=10>${nseWhitelistUploadersList}</textarea>
            </div>
        </section>

        <section id="nseContent4">
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
                    NoShitEmpornium ${nseVersion} was made with 💕 by <a class="nseLink" href="https://www.empornium.me/user.php?id=508194">ceodoe</a> of Empornium.
                </p>
                <p>
                    <span class="nseImageButton" id="nseGithub"> <a class="nseLink" href="https://github.com/ceodoe/noshitempornium" target="_blank">Visit the project's GitHub page</a></span><br />
                    <span class="nseImageButton" id="nseChangelog"> <a class="nseLink" href="https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG.md" target="_blank">See the changelog</a></span><br />
                    <span class="nseImageButton" id="nseEmpoThread"> <a class="nseLink" href="https://www.empornium.me/forum/thread/44258?postid=956045#post956045" target="_blank">Read the official forum thread</a></span>
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
`

// Perform actual insertion of our HTML UI element
referenceNode.parentNode.insertBefore(htmlContent, referenceNode.nextSibling);

// Assign event handlers
var headerNode = document.getElementById("nseHeaderText");
headerNode.innerHTML = "Toggle " + count + " hidden torrent";
headerNode.onclick = (function() { toggleTorrents(); });

if(count === 0) {
    headerNode.innerHTML = "NoShitEmpornium";
    headerNode.onclick = null;
} else if(count > 1) {
    headerNode.innerHTML = headerNode.innerHTML + "s";
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

// Save function
document.getElementById("nseSaveButton").onclick = (function() {
    GM_setValue("nseTaglist", document.getElementById("nseBlacklistTaglistArea").value); // Legacy name for BC
    GM_setValue("nseWhitelist", document.getElementById("nseWhitelistTaglistArea").value); // ^
    
    GM_setValue("nseBlacklistTitles", document.getElementById("nseBlacklistTitleListArea").value);
    GM_setValue("nseWhitelistTitles", document.getElementById("nseWhitelistTitleListArea").value);
    
    GM_setValue("nseUploaders", document.getElementById("nseBlacklistUploadersArea").value); // ^
    GM_setValue("nseWhitelistUploaders", document.getElementById("nseWhitelistUploadersArea").value);
    
    GM_setValue("nseObliviousModeEnabled", document.getElementById("nseCheckObliviousMode").checked);
    GM_setValue("nseRussianRouletteEnabled", document.getElementById("nseCheckRussianRouletteMode").checked);
    
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
});

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
    <b>TL;DR</b>: <i>If any of these words are in the title, hide the torrent</i>
</div>

<div class="nseExplanationNode">This is where you specify title words you want to filter on. This is useful for hiding untagged content with a recurring theme (for example specific JAV series you don't care about, or re-encoded content). Character case does not matter.
</div>

<div class="nseExplanationNode">Example:<br /><pre>sdmm hikr reencode re-encode</pre></div>
`;

document.getElementById("nseTitleWLE").innerHTML = `
<div class="nseExplanationNode">
    <b>TL;DR</b>: <i>If any of these words are in the title, ignore all other rules</i>
</div>

<div class="nseExplanationNode">This is where you specify title words you want to show regardless of other rules. Character case does not matter.
</div>

<div class="nseExplanationNode">Example:<br /><pre>minipack sdmm moist</pre></div>
`;

document.getElementById("nseUBLE").innerHTML = `
<div class="nseExplanationNode">
    <b>TL;DR</b>: <i>If this torrent is uploaded by any of these users, hide it</i>
</div>

<div class="nseExplanationNode">This is where you specify the names of uploaders you want to hide all uploads from, unless overriden by a whitelist rule. Uploader names will be highlighted in <span style="color:#f00"><b>red</b></span> when viewing hidden torrents. Character case does not matter.
</div>

<div class="nseExplanationNode">Example:<br /><pre>SuperUploader2007 LowQualityUploadsIncorporated</pre></div>
`;

document.getElementById("nseUWLE").innerHTML = `
<div class="nseExplanationNode">
    <b>TL;DR</b>: <i>If this torrent is uploaded by any of these users, show it regardless of any other rules</i>
</div>

<div class="nseExplanationNode">This is where you specify the names of uploaders you want to show all uploads from, regardless of any blacklist rules. Uploader names will be highlighted in <span style="color:#0f0"><b>green</b></span>. Character case does not matter.
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

.nseOuterDiv {
    font-family: Helvetica;
    margin:auto;
    color: ${themes[nseSelectedTheme]["foregroundColor"]};
    width: 600px;
    padding: 10px;
    border: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
    background-color: ${themes[nseSelectedTheme]["backgroundColor"]} !important;
    border-radius: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
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
    padding: 15px 25px;
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

.nseLabel:before {
    font-weight: normal;
    margin-right: 10px;
    margin-left: 10px;
}

.nseLabel[for*='1']:before {
    content: '🏷️';
    margin-right: 5px;
}

.nseLabel[for*='2']:before {
    content: '📚';
    margin-right: 5px;
}

.nseLabel[for*='3']:before {
    content: '👥';
    margin-right: 5px;
}

.nseLabel[for*='4']:before {
    content: '⚙️';
    margin-right: 5px;
}

a.nseLink, a.nseLink:visited {
    color: ${themes[nseSelectedTheme]["accentColor"]};
}

.nseLabel:hover {
    color: ${themes[nseSelectedTheme]["highlightColor"]};
    background-color: ${themes[nseSelectedTheme]["backgroundHighlightColor"]} !important;
    cursor: pointer;
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

.nseLabel:before {
    margin: 0;
    font-size: 18px;
}

.nseLabel {
    padding: 15px;
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

#nseGithub:before {
    content: "🐙";
 }

#nseEmpoThread:before {
    content: "🧵";
 }

#nseChangelog:before {
    content: "📋";
}

#nseTagBlacklistHeader:before {
    content: "👎";
}

#nseTagWhitelistHeader:before {
    content: "👍";
}

#nseTitleBlacklistHeader:before {
    content: "👎";
}

#nseTitleWhitelistHeader:before {
    content: "👍";
}

#nseUploaderBlacklistHeader:before {
    content: "👎";
}

#nseUploaderWhitelistHeader:before {
    content: "👍";
}

.nseExplanationBox, #nseCustomThemeDiv, #nseCustomCSSDiv {
    width: 97%;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
    padding: 10px;
    border-radius: 10px;
}

#nseHeader {
    width: 100%;
    margin: auto;
    text-align: center;
    font-size: 18px;
    cursor: pointer;
}

.nseExplanationToggler {
    cursor: pointer;
}

.nseTextArea {
    width: 99%;
    max-width: 99%;
}

.nseFieldDiv {
    margin-bottom:10px;
}

.nseExplanationNode {
    margin-bottom: 10px;
}

.nseHiddenUploader, .nseHiddenTag, .nseHiddenTitle {
    color: #F00 !important; 
    font-weight: bold !important;   
}

.nseWhitelistedUploader, .nseWhitelistedTag, .nseWhitelistedTitle { 
    color: #0F0 !important; 
    font-weight: bold !important;    
}

.nseHiddenTag, .nseWhitelistedTag, .nseWhitelistedTitle, .nseHiddenTitle {
    display: inline;
}

.nseNiceButton {
    background-color: ${themes[nseSelectedTheme]["backgroundColor"]} !important;
    color: ${themes[nseSelectedTheme]["foregroundColor"]} !important;
    border: 1px solid ${themes[nseSelectedTheme]["accentColor"]};
    border-radius: 10px;
    cursor: pointer;
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 16px;
}

.nseNiceButton:hover {
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

${nseCustomCSSEnabled ? nseCustomCSS : ''}

`);
// End CSS section    
