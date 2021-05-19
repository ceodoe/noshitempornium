// ==UserScript==
// @name         Empornium GlobalArrowKeyNavigation
// @namespace    http://www.empornium.me/
// @version      0.1
// @description  Companion script to NoShitEmpornium, adds arrow key navigation to all paginated content on the site
// @author       ceodoe
// @include      /^https?://www\.empornium\.(me|sx|is)/*/
// @run-at       document-end
// ==/UserScript==

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