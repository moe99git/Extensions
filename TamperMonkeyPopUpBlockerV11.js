// ==UserScript==
// @name         ExamTopics Ghost Cloak
// @namespace    http://tampermonkey.net/
// @version      11.0
// @description  Hides popups without deleting them to prevent re-rendering loops
// @author       You
// @match        *://*.examtopics.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.innerHTML = `
        /* 1. Make all popups/modals invisible but keep them in the DOM */
        .modal, .modal-backdrop, [class*="overlay"], [class*="popup"], [id*="modal"] {
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
            z-index: -1 !important;
        }

        /* 2. Force the background content to stay interactive */
        body, html {
            overflow: auto !important;
            position: relative !important;
            height: auto !important;
            pointer-events: auto !important;
        }

        /* 3. Unblur and reveal solution text automatically */
        .reveal-solution-content, .answer-content, .correct-answer {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            color: #000 !important;
        }
        
        /* 4. Kill the gray 'haze' */
        * { filter: none !important; backdrop-filter: none !important; }
    `;
    document.documentElement.appendChild(style);

    // Keep the "Reveal Solution" buttons working
    setInterval(() => {
        document.querySelectorAll('a, button').forEach(btn => {
            if (btn.innerText.includes('Reveal Solution')) {
                btn.style.pointerEvents = 'auto';
                btn.style.cursor = 'pointer';
            }
        });
    }, 500);
})();