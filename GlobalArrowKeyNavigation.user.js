// ==UserScript==
// @name         Empornium GlobalArrowKeyNavigation
// @namespace    http://www.empornium.me/
// @version      0.2
// @description  Companion script to NoShitEmpornium, adds arrow key navigation to all paginated content on the site
// @updateURL    https://github.com/ceodoe/noshitempornium/raw/master/GlobalArrowKeyNavigation.meta.js
// @downloadURL  https://github.com/ceodoe/noshitempornium/raw/master/GlobalArrowKeyNavigation.user.js
// @supportURL   https://github.com/ceodoe/noshitempornium/issues
// @homepageURL  https://github.com/ceodoe/noshitempornium/
// @author       ceodoe
// @include      /^https?://www\.empornium\.(me|sx|is)/*/
// @run-at       document-end
// ==/UserScript==
//
// Copyright © 2015-2021 ceodoe
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

document.onkeydown = function(event) {
    if(event.target.nodeName !== "TEXTAREA" && event.target.nodeName !== "INPUT") {
        if (event.code == "ArrowLeft") {
            let prevLink = document.getElementsByClassName("pager_prev")[0];
            if(prevLink) {
                event.preventDefault();
                prevLink.click();
            } else {
                let firstLink = document.getElementsByClassName("pager_first")[0];
                if(firstLink) {
                    event.preventDefault();
                    firstLink.click();
                }
            }
        } else if (event.code == "ArrowRight") {
            let nextLink = document.getElementsByClassName("pager_next")[0];
            if(nextLink) {
                event.preventDefault();
                nextLink.click();
            } else {
                let lastLink = document.getElementsByClassName("pager_last")[0];
                if(lastLink) {
                    event.preventDefault();
                    lastLink.click();
                }
            }
        }
    }
};