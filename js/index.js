window.onload = function () {

    const YOUTUBE_CHANNEL = 'https://www.youtube.com/c/QuickTipsbyzain';

    // --------------------------------------------------
    // Add Click Function to Hamburger
    var hamburger = document.querySelector('.hamburger');
    const NAVBAR = document.querySelector('.nav-links');
    const NAVBAR_CONTAINER = document.querySelector('.navbar');
    hamburger.onclick = function () {
        if (NAVBAR.classList.contains('active')) {
            NAVBAR.classList.remove('active');
            if (!window.scrollY > 0) {
                NAVBAR_CONTAINER.classList.remove('scroll');
            }
        } else {
            NAVBAR.classList.add('active');
            if (!NAVBAR_CONTAINER.classList.contains('scroll')) {
                NAVBAR_CONTAINER.classList.add('scroll');
            }
        }
    }

    window.onscroll = function () {
        if (!NAVBAR.classList.contains('active')) {
            if (window.scrollY > 0) {
                NAVBAR_CONTAINER.classList.add('scroll');
            } else {
                NAVBAR_CONTAINER.classList.remove('scroll');
            }
        }
    }

    // --------------------------------------------------
    // Add Click Function to NavLinks
    const NAVBAR_LINKS = document.querySelectorAll('.nav-link');
    var underlines = document.querySelectorAll('.nav-link span');
    const HOME_PAGE = document.querySelector('.home');
    const VIDEO_PAGE = document.querySelector('.videos');

    var removeUnderline = function () {
        underlines.forEach((link) => link.classList.remove('underline'));
    }

    for (let i = 0; i < NAVBAR_LINKS.length; i++) {
        let link = NAVBAR_LINKS[i];
        link.onclick = function () {
            removeUnderline();
            underlines[i].classList.add('underline');
            homeFab.click();

            if (link.innerText == 'Home') {

                HOME_PAGE.classList.remove('inactive-page');
                VIDEO_PAGE.classList.remove('current-page');
                newsletterFab.style.height = "50px";
                newsletterFab.style.width = "50px";
                document.title = "QuickTips | Home";

            } else if (link.innerText == 'Videos') {

                HOME_PAGE.classList.add('inactive-page');
                VIDEO_PAGE.classList.add('current-page');
                newsletterFab.style.height = "0px";
                newsletterFab.style.width = "0px";
                document.title = "QuickTips | Videos";

            } else {
                // Extensions Button is clicked
                document.title = "QuickTips | Extensions";
            }

            if (NAVBAR.classList.contains('active')) {
                hamburger.click();
            }
        }
    }

    // --------------------------------------------------
    // Add Click Function to contact buttons 
    var contactOptions = document.querySelectorAll('.social-contact-icon');

    const SOCIAL_LINKS = [
        'https://web.facebook.com/groups/1105102589835321',
        'https://www.youtube.com/channel/UCSSQg8iowZRTSP4kCypUYdw',
        'https://t.me/zainulhassan',
        'https://twitter.com/zain96970099'
    ]

    for (let i = 0; i < SOCIAL_LINKS.length; i++) {
        contactOptions[i].onclick = function () {
            window.open(SOCIAL_LINKS[i]);
        }
    }

    // --------------------------------------------------
    // Add Click function to Visit Channel Btn
    var visitChannelBtn = document.querySelector('.visit-channel-btn');
    visitChannelBtn.onclick = function () {
        window.open(YOUTUBE_CHANNEL);
    }

    // Floating Action Buttons 
    var contactFab = document.querySelector('.contact-fab');
    var homeFab = document.querySelector('.home-fab');
    var newsletterFab = document.querySelector('.newsletter-fab');

    const CONACT_SECTION = document.querySelector('#contact');
    const NEWSLETTER_SECTION = document.querySelector('#newsletter');
    const HEADER_SECTION = document.querySelector('#header');

    homeFab.onclick = function () {
        window.scrollTo(0, 0);
    }

    contactFab.onclick = function () {
        window.scrollTo(0, CONACT_SECTION.offsetTop);
    }

    newsletterFab.onclick = function () {
        window.scrollTo(0, NEWSLETTER_SECTION.offsetTop - NEWSLETTER_SECTION.offsetHeight / 4);
    }

    fetchRecords();
}