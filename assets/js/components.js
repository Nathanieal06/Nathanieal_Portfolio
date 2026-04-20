/**
 * components.js — Shared Nav + Footer Injector
 * Reads `data-root` and `data-page` from <body> to build correct links and active states.
 * Uses DOMContentLoaded so the body and placeholders exist when this runs.
 */
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const body = document.body;
    const root = body.dataset.root || '';   // '' for index.html, '../' for pages/
    const page = body.dataset.page || '';   // 'projects', 'achievements', etc.

    const pageTitles = {
        '':                 'Portfolio',
        'projects':         'Projects',
        'achievements':     'Achievements',
        'certificates':     'Certificates',
        'college-results':  'GTU Results',
        'school-results':   'School Results',
        'feedback':         'Contact',
        'extra-curricular': 'Extra Curricular'
    };

    // Returns class="nav-active" when the current page matches
    function act(p) {
        return page === p ? ' class="nav-active"' : '';
    }

    // Home link — scrolls on index, navigates on sub-pages
    const homeHref = (page === '') ? '#parallax-container' : root + 'index.html';
    const title = pageTitles[page] || 'Portfolio';

    // ── Build Nav HTML ────────────────────────────────────────────────────────
    const navHTML = `
<nav class="portfolio-nav visible" id="main-nav">
    <div class="nav-container">
        <a href="${root}index.html" class="nav-brand">NATHANIEAL &nbsp;<em>/</em>&nbsp; ${title}</a>
        <ul class="nav-menu">
            <li><a href="${homeHref}">Home</a></li>

            <li class="has-dropdown">
                <a href="${root}index.html#backstory-section">Background <span class="nav-arrow">&#9660;</span></a>
                <ul class="nav-dropdown-menu">
                    <li><a href="${root}pages/college-results.html"${act('college-results')}>College Results</a></li>
                    <li><a href="${root}pages/school-results.html"${act('school-results')}>School Results</a></li>
                </ul>
            </li>

            <li class="has-dropdown">
                <a href="${root}pages/certificates.html"${act('certificates')}>Certificates <span class="nav-arrow">&#9660;</span></a>
                <ul class="nav-dropdown-menu">
                    <li><a href="${root}pages/certificates.html#cert1">Game Dev</a></li>
                    <li><a href="${root}pages/certificates.html#cert4">Game Jam</a></li>
                    <li><a href="${root}pages/certificates.html#cert5">Foundation Course</a></li>
                    <li><a href="${root}pages/certificates.html#cert2">SAP Analytics</a></li>
                    <li><a href="${root}pages/certificates.html#cert6">Fashion Show</a></li>
                    <li><a href="${root}pages/certificates.html#cert7">BIS Poster</a></li>
                    <li><a href="${root}pages/certificates.html#cert8">Chess</a></li>
                    <li><a href="${root}pages/certificates.html#cert3">Badminton</a></li>
                </ul>
            </li>

            <li class="has-dropdown">
                <a href="${root}pages/achievements.html"${act('achievements')}>Achievements <span class="nav-arrow">&#9660;</span></a>
                <ul class="nav-dropdown-menu">
                    <li><a href="${root}pages/achievements.html#ach-gamejam">Game Jam 2nd</a></li>
                    <li><a href="${root}pages/achievements.html#ach-volleyball">Volleyball Win</a></li>
                    <li><a href="${root}pages/achievements.html#ach-chess">Chess Runner-Up</a></li>
                    <li><a href="${root}pages/achievements.html#ach-quiz">Quiz Runner-Up</a></li>
                    <li><a href="${root}pages/achievements.html#ach-bis">BIS Poster 3rd</a></li>
                </ul>
            </li>

            <li class="has-dropdown">
                <a href="${root}pages/projects.html"${act('projects')}>Projects <span class="nav-arrow">&#9660;</span></a>
                <ul class="nav-dropdown-menu">
                    <li><a href="${root}pages/projects.html#proj-secretbook">The Secret Book</a></li>
                    <li><a href="${root}pages/projects.html#proj-sharpshooter">Sharp Shooter</a></li>
                    <li><a href="${root}pages/projects.html#proj-royalrun">Royal Run</a></li>
                    <li><a href="${root}pages/projects.html#proj-galaxystrike">Galaxy Strike</a></li>
                    <li><a href="${root}pages/projects.html#proj-rocketboost">Rocket Boost</a></li>
                </ul>
            </li>

            <li><a href="${root}pages/feedback.html"${act('feedback')}>Contact</a></li>
        </ul>
    </div>
</nav>`;

    // ── Build Simple Footer HTML ──────────────────────────────────────────────
    const footerHTML = `
<footer class="portfolio-footer">
    <div class="footer-content">
        <span>&copy; 2026 Nathanieal</span>
    </div>
</footer>`;

    // ── Inject Nav ────────────────────────────────────────────────────────────
    const navSlot = document.getElementById('site-nav');
    if (navSlot) {
        navSlot.outerHTML = navHTML;
    }

    // ── Inject Footer ─────────────────────────────────────────────────────────
    const footerSlot = document.getElementById('site-footer');
    if (footerSlot) {
        footerSlot.outerHTML = footerHTML;
    }
});
