// ==UserScript==
// @name         NoShitEmpornium
// @namespace    http://www.empornium.me/
// @version      2.0a
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


// Load saved lists
var nseBlacklistTaglist = GM_getValue("nseTaglist","!notags!"); // 3 unchanged names to allow backwards comp
var nseBlacklistTags;

var nseWhitelistTaglist = GM_getValue("nseWhitelist","!nowhitelist!"); // ^
var nseWhitelistTags;

var nseBlacklistTitleList = GM_getValue("nseBlacklistTitles","!noTitleBL!");
var nseBlacklistTitleWords;

var nseWhitelistTitleList = GM_getValue("nseWhitelistTitles","!noTitleWL!");
var nseWhitelistTitleWords;

var nseBlacklistUploadersList = GM_getValue("nseUploaders","!nouploaders!"); // ^
var nseBlacklistUploaders;

var nseWhitelistUploadersList = GM_getValue("nseWhitelistUploaders","!noUploadersWL!");
var nseWhitelistUploaders;


// Initialize tag lists
if(nseBlacklistTaglist == "!notags!" || nseBlacklistTaglist.trim() == "") {
    nseBlacklistTaglist = "enter.illegal.tags.here separated.by.spaces.only no.newlines scat puke blood";
    nseBlacklistTags = new Array("enter.illegal.tags.here", "separated.by.spaces.only", "no.newlines", "scat", "puke", "blood");
} else {
    nseBlacklistTags = nseBlacklistTaglist.split(" ");
}

if(nseWhitelistTaglist == "!nowhitelist!" || nseWhitelistTaglist.trim() == "") {
    nseWhitelistTaglist = "whitelist.tags go.here";
    nseWhitelistTags = new Array("whitelist.tags", "go.here");
} else {
    nseWhitelistTags = nseWhitelistTaglist.split(" ");
}


// Initialize title lists
if(nseBlacklistTitleList == "!noTitleBL!" || nseBlacklistTitleList.trim() == "") {
    nseBlacklistTitleList = "fillerword titleblacklist";
    nseBlacklistTitleWords = new Array("fillerword", "titleblacklist");
} else {
    nseBlacklistTitleWords = nseBlacklistTitleList.split(" ");
}

if(nseWhitelistTitleList == "!noTitleWL!" || nseWhitelistTitleList.trim() == "") {
    nseWhitelistTitleList = "fillerword titlewhitelist";
    nseWhitelistTitleWords = new Array("fillerword", "titlewhitelist");
} else {
    nseWhitelistTitleWords = nseWhitelistTitleList.split(" ");
}


// Initialize uploader lists
if(nseBlacklistUploadersList == "!nouploaders!" || nseBlacklistUploadersList.trim() == "") {
    nseBlacklistUploadersList = "putusernameshere separatedbyspacesonly nonewlines";
    nseBlacklistUploaders = new Array("putusernameshere", "separatedbyspacesonly", "nonewlines");
} else {
    nseBlacklistUploaders = nseBlacklistUploadersList.split(" ");
}

if(nseWhitelistUploadersList == "!noUploadersWL!" || nseWhitelistUploadersList.trim() == "") {
    nseWhitelistUploadersList = "putusernameshere separatedbyspacesonly nonewlines";
    nseWhitelistUploaders = new Array("putusernameshere", "separatedbyspacesonly", "nonewlines");
} else {
    nseWhitelistUploaders = nseWhitelistUploadersList.split(" ");
}

// End of initialization


var count = 0;
var torrents = document.querySelectorAll("tr.torrent");

// Main loop - for every torrent:
for(var i = 0; i < torrents.length; i++) {
    var tagElement = torrents[i].querySelector("td > div.tags");
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

    var currentHidden = false;
    var currentWhitelisted = false;

    // Check uploaders first
    if(uploaderElement !== null) {
        var uploader = uploaderElement.innerHTML.trim().toLowerCase();
        
        for(var l = 0; l < nseBlacklistUploaders.length; l++) {
            if(uploader == nseBlacklistUploaders[l].trim().toLowerCase()) {
                currentHidden = true;
                uploaderElement.classList.add("nseHiddenUploader");
            }
        }
        
        // If currentHidden is still false, that means no blacklisted uploader was found, check whitelist
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
            titleElement.innerHTML = titleElement.innerHTML + ` <color class="nseHiddenTitle">(${currentTBLWord})</color>`;
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

    // For every illegal tag
    for(var j = 0; j < nseBlacklistTags.length; j++) {
        var tagList = tagElement.querySelectorAll("a");

        // For every tag in the current torrent
        for(var k = 0; k < tagList.length; k++) {
            if(tagList[k].innerHTML == nseBlacklistTags[j]) {
                currentHidden = true;
                tagList[k].classList.add("nseHiddenTag");
            }

            if(nseWhitelistTags.includes(tagList[k].innerHTML) === true) {
                currentWhitelisted = true;
                tagList[k].classList.add("nseWhitelistedTag");
            }
        }
    }

    if(currentHidden === true && currentWhitelisted === false) {
        torrents[i].style.backgroundColor = "#AAF";
        torrents[i].classList.add("hidden");
        count += 1;
    } else if(currentWhitelisted === true) {
        torrents[i].classList.remove("hidden");
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
		<textarea class="nseTextArea" id="nseBlacklistTaglistArea" rows=10></textarea>
	</div>
    <div class="nseFieldDiv">
      <span class="nseImageButton nseListHeader" id="nseTagWhitelistHeader">Tag whitelist</span><sup class="nseExplanationToggler" id="nseWLEToggler">[?]</sup><br />
      <div id="nseWLE" class="nseExplanationBox hidden">
		  
	  </div>
		<textarea class="nseTextArea" id="nseWhitelistTaglistArea" rows=10></textarea>
    </div>
  </section>

  <section id="nseContent2">
    <div class="nseFieldDiv">
	  <span class="nseImageButton nseListHeader" id="nseTitleBlacklistHeader">Title blacklist</span><sup class="nseExplanationToggler" id="nseTitleBLEToggler">[?]</sup><br />
	  <div id="nseTitleBLE" class="nseExplanationBox hidden">
        
	  </div>
		<textarea class="nseTextArea" id="nseBlacklistTitleListArea" rows=10></textarea>
	</div>
    <div class="nseFieldDiv">
      <span class="nseImageButton nseListHeader" id="nseTitleWhitelistHeader">Title whitelist</span><sup class="nseExplanationToggler" id="nseTitleWLEToggler">[?]</sup><br />
      <div id="nseTitleWLE" class="nseExplanationBox hidden">
		 
	  </div>
		<textarea class="nseTextArea" id="nseWhitelistTitleListArea" rows=10></textarea>
    </div>
  </section>

  <section id="nseContent3">
    <div class="nseFieldDiv">
	  <span class="nseImageButton nseListHeader" id="nseUploaderBlacklistHeader">Uploader blacklist</span><sup class="nseExplanationToggler" id="nseUBLEToggler">[?]</sup><br />
	  <div id="nseUBLE" class="nseExplanationBox hidden">
		  
	  </div>
		<textarea class="nseTextArea" id="nseBlacklistUploadersArea" rows=10></textarea>
	</div>
    <div class="nseFieldDiv">
      <span class="nseImageButton nseListHeader" id="nseUploaderWhitelistHeader">Uploader whitelist</span><sup class="nseExplanationToggler" id="nseUWLEToggler">[?]</sup><br />
      <div id="nseUWLE" class="nseExplanationBox hidden">
		  
	  </div>
		<textarea class="nseTextArea" id="nseWhitelistUploadersArea" rows=10></textarea>
    </div>
  </section>

  <section id="nseContent4">
    <p>Coming soon!</p>
    <h3>About</h3>
	  <p>
		  NoShitEmpornium was made with <span style="color: #F00;">❤</span> by <a href="https://www.empornium.me/user.php?id=508194">ceodoe</a> of Empornium.
	  </p>
	  <p>
	    <span class="nseImageButton" id="nseGithub"> <a href="https://github.com/ceodoe/noshitempornium" target="_blank">Visit the project's GitHub page</a></span><br />
	    <span class="nseImageButton" id="nseChangelog"> <a href="https://github.com/ceodoe/noshitempornium/blob/master/CHANGELOG.md" target="_blank">See the changelog</a></span><br />
	    <span class="nseImageButton" id="nseEmpoThread"> <a href="https://www.empornium.me/forum/thread/44258?postid=956045#post956045" target="_blank">Official forum thread</a></span><br />
	  </p>
	</section>
	
	<div style="text-align: center;">
		<span id="nseSaveButton" class="nseNiceButton">Save</span> 
		<span id="nseReloadButton" class="nseNiceButton">Reload page and apply changes</span> 
	</div>
	
	<div style="text-align: center;" id="nseSaveDiv" class="hidden">
		
	</div>
</div>
`

// Perform actual insertion of our HTML UI element
referenceNode.parentNode.insertBefore(htmlContent, referenceNode.nextSibling);

// Populate text areas with saved data
document.getElementById("nseBlacklistTaglistArea").innerHTML = nseBlacklistTaglist;
document.getElementById("nseWhitelistTaglistArea").innerHTML = nseWhitelistTaglist;

document.getElementById("nseBlacklistTitleListArea").innerHTML = nseBlacklistTitleList;
document.getElementById("nseWhitelistTitleListArea").innerHTML = nseWhitelistTitleList;

document.getElementById("nseBlacklistUploadersArea").innerHTML = nseBlacklistUploadersList;
document.getElementById("nseWhitelistUploadersArea").innerHTML = nseWhitelistUploadersList;

// Assign event handlers
var headerNode = document.getElementById("nseHeaderText");
headerNode.innerHTML = "<sup><small>[NSE]</small></sup> Toggle " + count + " hidden torrent";
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

document.getElementById("nseSaveButton").onclick = (function() {
    GM_setValue("nseTaglist", document.getElementById("nseBlacklistTaglistArea").value); // Legacy name for BC
    GM_setValue("nseWhitelist", document.getElementById("nseWhitelistTaglistArea").value); // ^
    
    GM_setValue("nseBlacklistTitles", document.getElementById("nseBlacklistTitleListArea").value);
    GM_setValue("nseWhitelistTitles", document.getElementById("nseWhitelistTitleListArea").value);
    
    GM_setValue("nseUploaders", document.getElementById("nseBlacklistUploadersArea").value); // ^
    GM_setValue("nseWhitelistUploaders", document.getElementById("nseWhitelistUploadersArea").value);

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

<div class="nseExplanationNode">Example:<br /><pre>SuperUploader2007 LowQualityUploadsIncorporated whyevenexpendtheeffort</pre></div>
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
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

.nseOuterDiv {
    font:14px/1.5,sans-serif;
    color:#345;
    max-width: 800px;
    padding: 20px;
    border: 1px solid rgba(0,0,0,.2);
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,.1);
}

p:not(:last-child) {
     margin: 0 0 20px;
}

section {
     display: none;
     padding: 20px 0 0;
     border-top: 1px solid #abc;
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
     color: #abc;
     background-color: #fff !important;
     border: 1px solid blue;
     margin-right: 5px;
}

.settingsCheckbox {
     padding: 5px 10px;
}

.nseLabel:before {
     font-family: fontawesome;
     font-weight: normal;
     margin-right: 10px;
     margin-left: 10px;
}

.nseLabel[for*='1']:before {
    content: '\\f02c';
}

.nseLabel[for*='2']:before {
    content: '\\f02d';
}

.nseLabel[for*='3']:before {
    content: '\\f007';
}

.nseLabel[for*='4']:before {
    content: '\\f013';
}

.nseLabel:hover {
     color: #789;
     cursor: pointer;
}

.nseRadioButton:checked + .nseLabel {
     color: #0af;
     border: 1px solid #abc;
     border-top: 2px solid #0af;
     border-bottom: 1px solid #fff;
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
     color: #AAA;
}

.nseListHeader {
     font-size: 20px;
}

.nseImageButton {
       position: relative;
       color: #000;
       font-weight: bold;
}

.nseImageButton > a, .nseImageButton  > a:visited {
     color: #000;
     text-decoration: none;
     border: 0;
}

.nseImageButton:before {
     font-family: fontawesome;
     font-weight: normal;
     margin-right: 5px;
 }

#nseGithub:before {
     content: "\\f09b";
 }

#nseEmpoThread:before {
     content: "\\f0e6";
 }

#nseChangelog:before {
     content: "\\f1ea";
}

#nseTagBlacklistHeader:before {
     content: "\\f165";
}

#nseTagWhitelistHeader:before {
     content: "\\f164";
}

#nseTitleBlacklistHeader:before {
     content: "\\f165";
}

#nseTitleWhitelistHeader:before {
     content: "\\f164";
}

#nseUploaderBlacklistHeader:before {
     content: "\\f165";
}

#nseUploaderWhitelistHeader:before {
     content: "\\f164";
}

.nseExplanationBox {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid black;
    padding: 10px;
    border-radius: 10px;
}

#nseHeader {
   width: 100%;
    margin: auto;
    text-align: center;
    font-size: 22px;
    cursor: pointer;
}

.nseOuterDiv {
    margin:auto;
    padding:20px;
    background-color: #FFF !important;
    border: 1px solid gray;
    border-radius: 20px;
}

.nseExplanationToggler {
    cursor: pointer;
}

.nseTextArea {
   width: 100%;
    max-width: 100%;
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
    background-color: #fff !important;
    color: #000 !important;
    border: 1px solid gray;
    border-radius: 10px;
    cursor: pointer;
    padding: 5px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 16px;
}

#nseSaveDiv {
    margin-top: 20px;
    font-weight: bold;
}

`);
// End CSS section    
