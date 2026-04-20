/**
 * results.js — Shared script for college-results.html and school-results.html
 * Handles: animated counters, semester/class tab switching, row IntersectionObserver
 * Each page configures its own counters via data-* attributes on the counter elements.
 */
(function () {
    'use strict';

    // ── Animated Number Counter ───────────────────────────────────────────────
    // Usage: animCount(element, targetNumber, durationMs, suffix)
    window.animCount = function (el, target, duration, suffix) {
        if (!el) return;
        suffix = suffix || '';
        let cur = 0;
        const step = target / (duration / 16);
        const timer = setInterval(function () {
            cur += step;
            if (cur >= target) {
                cur = target;
                clearInterval(timer);
            }
            el.textContent = cur.toFixed(2) + suffix;
        }, 16);
    };

    // ── Semester / Class Tab Switching ────────────────────────────────────────
    const tabs     = document.querySelectorAll('.res-tab');
    const sections = document.querySelectorAll('.res-sem');

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (t) { t.classList.remove('active'); });
            sections.forEach(function (s) { s.classList.remove('active'); });

            tab.classList.add('active');

            const sec = document.getElementById(tab.dataset.sem);
            if (!sec) return;
            sec.classList.add('active');

            // Stagger row entrance animation for the newly shown section
            sec.querySelectorAll('.res-row').forEach(function (row, i) {
                row.classList.remove('vis');
                setTimeout(function () { row.classList.add('vis'); }, i * 55);
            });
        });
    });

    // ── IntersectionObserver — row entrance on first scroll into view ─────────
    const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('vis');
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('.res-row').forEach(function (r) { io.observe(r); });

})();
