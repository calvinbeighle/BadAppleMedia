<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BAD APPLE MEDIA</title>
    <style>
        @font-face {
            font-family: 'Warbler Deck';
            src: url('/fonts/WarblerDisplayV1-Italic.otf') format('truetype');
            font-weight: normal;
            font-style: normal;
        }

        /* CSS styles */
        body {
            margin: 0;
            padding: 0;
            background-color: #111;
            color: #fff;
            font-family: 'Helvetica Neue', Arial, sans-serif;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }
        .header {
            position: fixed;
            top: 15vh;
            left: 0;
            right: 0;
            height: 1px;
            background-color: #fff;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .site-title {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-family: 'Origin', sans-serif;
            font-size: 5em;
            font-weight: bold;
            text-transform: uppercase;
            white-space: nowrap;
            z-index: 1001;
            transition: all 0.3s ease;
        }
        .left-half {
            width: 25%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding: 0;
            position: fixed;
            top: 0;
            bottom: 0;
            overflow: hidden;
        }
        .left-half::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 1px;
            background-color: #fff;
            opacity: var(--after-opacity, 0);
            transition: opacity 0.3s ease;
        }
        .right-half {
            width: 75%;
            margin-left: 25%;
            padding: 20px;
            padding-top: calc(15vh + 21px);
            overflow-y: auto;
            height: calc(100vh - 15vh - 41px);
        }
        .menu {
            list-style-type: none;
            padding: 0;
            margin: 0;
            text-align: center;
            width: 100%;
            position: absolute;
            top: 33%;
            transition: opacity 0.3s ease;
            opacity: 0;
        }
        .menu li {
            font-size: 16px;
            margin-bottom: 22px; /* Increased by 10% from 20px */
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .menu li strong {
            letter-spacing: 0.03em;
        }
        .menu li:hover {
            transform: scale(1.1);
        }
        .page {
            display: none;
            height: 300vh;
        }
        .page.active {
            display: block;
        }
        .shamelessly-rotten {
            position: fixed;
            top: 33.8%;
            left: 62.5%;
            transform: translate(-50%, -50%);
            font-family: 'Warbler Deck';
            font-size: 2.35em;
            color: #fff;
            opacity: 0;
            transition: opacity 0.8s ease;
            z-index: 1002;
            text-align: center;
            letter-spacing: 0.075em;
            font-style: italic;
            line-height: 1;
        }
        .contact-button {
            position: fixed;
            top: 45.5%;
            left: 62.5%;
            transform: translate(-50%, -50%);
            padding: 10px 20px;
            font-family: 'Origin', sans-serif;
            font-size: 0.9em;
            font-weight: bold;
            color: #fff;
            background-color: transparent;
            border: 2px solid #fff;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1002;
            border-radius: 25px;
            width: 120px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    </style>
</head>
<body>
    <!-- Site title -->
    <div class="site-title">BAD APPLE MEDIA</div>
    
    <!-- Horizontal line header -->
    <div class="header"></div>
    
    <!-- Left half of the page containing the menu -->
    <div class="left-half">
        <ul class="menu">
            <li data-page="page1"><strong style="letter-spacing: 0.03em;">TALK SHOP STUDIOS</strong></li>
            <li data-page="page2"><strong style="letter-spacing: 0.03em;">MEDIA</strong></li>
            <li data-page="page3"><strong style="letter-spacing: 0.03em;">PEOPLE</strong></li>
        </ul>
    </div>
    
    <!-- Right half of the page -->
    <div class="right-half">
        <!-- Content goes here -->
        <div id="page1" class="page active"></div>
        <div id="page2" class="page"></div>
        <div id="page3" class="page"></div>
    </div>
    
    <!-- Shamelessly Rotten text -->
    <div class="shamelessly-rotten">shamelessly rotten</div>
    
    <!-- Contact button -->
    <button class="contact-button">CONTACT</button>
    
    <script>
        // Select DOM elements
        const menu = document.querySelector('.menu');
        const rightHalf = document.querySelector('.right-half');
        const header = document.querySelector('.header');
        const leftHalf = document.querySelector('.left-half');
        const siteTitle = document.querySelector('.site-title');
        const contactButton = document.querySelector('.contact-button');
        const shamelesslyRotten = document.querySelector('.shamelessly-rotten');
        
        // Set the thresholds for when to show the menu and fade in the lines
        const startThreshold = 0.01; // 1%
        const endThreshold = 0.08; // 8%
        const menuFadeThreshold = 0.06; // 6%

        let lastScrollTop = 0;
        let ticking = false;

        function updateLayout(scrollTop) {
            // Calculate scroll percentage
            const scrollPercentage = scrollTop / (rightHalf.scrollHeight - rightHalf.clientHeight);
            
            // Calculate progress within the 1-8% range
            const progress = Math.min(Math.max((scrollPercentage - startThreshold) / (endThreshold - startThreshold), 0), 1);

            // Calculate menu fade progress
            const menuProgress = Math.min(Math.max((scrollPercentage - menuFadeThreshold) / (endThreshold - menuFadeThreshold), 0), 1);

            // Show or hide menu based on scroll position
            if (menuProgress > 0) {
                menu.style.opacity = menuProgress;
                contactButton.style.opacity = menuProgress;
                shamelesslyRotten.style.opacity = menuProgress;
            } else {
                menu.style.opacity = 0;
                contactButton.style.opacity = 0;
                shamelesslyRotten.style.opacity = 0;
            }

            // Fade in the lines
            header.style.opacity = progress;
            leftHalf.style.setProperty('--after-opacity', progress);

            // Move and resize the title
            const fontSize = 5 - (2.5 * progress); // From 5em to 2.5em
            const top = 50 - (45 * progress); // From 50% to 5%
            const left = 50 + (12.5 * progress); // From 50% to 62.5% (middle of the header)
            
            siteTitle.style.fontSize = `${fontSize}em`;
            siteTitle.style.top = `${top}%`;
            siteTitle.style.left = `${left}%`;
            siteTitle.style.transform = `translate(-50%, -${top}%)`;

            // Set final positions if scrolled beyond the end threshold
            if (scrollPercentage > endThreshold) {
                siteTitle.style.fontSize = '2.5em';
                siteTitle.style.top = '5vh';
                siteTitle.style.left = '62.5%';
                siteTitle.style.transform = 'translateX(-50%)';
                header.style.opacity = 1;
                leftHalf.style.setProperty('--after-opacity', 1);
                menu.style.opacity = 1;
                contactButton.style.opacity = 1;
                shamelesslyRotten.style.opacity = 1;
            }
        }

        function onScroll() {
            lastScrollTop = rightHalf.scrollTop;
            requestTick();
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(update);
            }
            ticking = true;
        }

        function update() {
            updateLayout(lastScrollTop);
            ticking = false;
        }

        // Add scroll event listener to the right half
        rightHalf.addEventListener('scroll', onScroll, { passive: true });

        // Add click event listeners to menu items
        const menuItems = document.querySelectorAll('.menu li');
        const pages = document.querySelectorAll('.page');

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const pageId = item.getAttribute('data-page');
                pages.forEach(page => {
                    page.classList.remove('active');
                });
                document.getElementById(pageId).classList.add('active');
                rightHalf.scrollTop = 0; // Reset scroll position when changing pages
            });
        });
    </script>
</body>
</html>
