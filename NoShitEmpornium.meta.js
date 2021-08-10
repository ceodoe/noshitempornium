// ==UserScript==
// @name         NoShitEmpornium
// @namespace    http://www.empornium.me/
// @version      2.6.4
// @description  Fully featured torrent filtering solution for Empornium
// @updateURL    https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.meta.js
// @downloadURL  https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js
// @supportURL   https://github.com/ceodoe/noshitempornium/issues
// @homepageURL  https://github.com/ceodoe/noshitempornium/
// @author       ceodoe
// @include      /^https?://www\.empornium\.(me|sx|is)/torrents\.php*/
// @include      /^https?://www\.empornium\.(me|sx|is)/collages\.php.*id=*/
// @include      /^https?://www\.empornium\.(me|sx|is)/top10\.php*/
// @include      /^https?://www\.empornium\.(me|sx|is)/user\.php\?action=notify/
// @exclude      /^https?://www\.empornium\.(me|sx|is)/top10\.php.*(\?|&)(type=(users|tags|taggers))/
// @exclude      /^https?://www\.empornium\.(me|sx|is)/torrents\.php.*(\?|&)(id=)/
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_addStyle
// ==/UserScript==
