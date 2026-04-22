// ==UserScript==
// @name         NoShitEmpornium
// @namespace    http://www.empornium.me/
// @version      2.8.2
// @license      GPLv3
// @description  Fully featured torrent filtering solution for Empornium
// @updateURL    https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.meta.js
// @downloadURL  https://github.com/ceodoe/noshitempornium/raw/master/NoShitEmpornium.user.js
// @supportURL   https://github.com/ceodoe/noshitempornium/issues
// @homepageURL  https://github.com/ceodoe/noshitempornium/
// @icon         https://www.google.com/s2/favicons?domain=empornium.sx
// @author       ceodoe
// @include      /^https://www\.empornium\.(me|sx|is)/torrents\.php*/
// @include      /^https://www\.empornium\.(me|sx|is)/collage\/*
// @include      /^https://www\.empornium\.(me|sx|is)/top10\.php*/
// @include      /^https://www\.empornium\.(me|sx|is)/user\.php\?action=notify/
// @include      /^https://www\.empornium\.(me|sx|is)/requests\.php/
// @exclude      /^https://www\.empornium\.(me|sx|is)/top10\.php.*(\?|&)(type=(users|tags|taggers))/
// @include      /^https://emparadise\.rs/torrents\.php*/
// @include      /^https://emparadise\.rs/collage\/*
// @include      /^https://emparadise\.rs/top10\.php*/
// @include      /^https://emparadise\.rs/user\.php\?action=notify/
// @include      /^https://emparadise\.rs/requests\.php/
// @exclude      /^https://emparadise\.rs/top10\.php.*(\?|&)(type=(users|tags|taggers))/
// @run-at       document-end
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_addStyle
// ==/UserScript==
