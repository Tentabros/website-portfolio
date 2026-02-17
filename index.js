function updateClockAndGreeting() {
            let now = new Date();
            let hour = now.getHours();
            let minutes = now.getMinutes();
            let seconds = now.getSeconds();

            
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            // HH:MM:SS
            let timeString = hour + ':' + minutes + ':' + seconds;

           
            let greeting;
            if (hour >= 5 && hour < 12) {
                greeting = 'Good Morning!';
            } else if (hour >= 12 && hour < 18) {
                greeting = 'Good Afternoon!';
            } else if (hour >= 18 && hour < 22) {
                greeting = 'Good Evening!';
            } else {
                greeting = 'Good Night!';
            }

            document.getElementById('greeting').textContent = greeting;
            document.getElementById('live-clock').textContent = timeString;
        }
        updateClockAndGreeting();
        setInterval(updateClockAndGreeting, 1000);


        document.querySelectorAll('.about-me-img i').forEach(icon => {
                icon.addEventListener('click', () => {
                icon.classList.remove('spinning');

                // Force reflow so the animation restarts even if clicked again quickly
                void icon.offsetWidth;

                icon.classList.add('spinning');

                icon.addEventListener('animationend', () => {
                    icon.classList.remove('spinning');
                }, { once: true });
            });
        });

// ===================================================
//DVD OVERLAY
const dvdColors = [
    '#97ab5d', '#c8d4c1', '#e07b7b', '#7bbce0',
    '#e0c97b', '#b07be0', '#7be0c0', '#e0a07b'
];

// Build overlay DOM
const overlay = document.createElement('div');
overlay.id = 'dvd-overlay';
overlay.innerHTML = `
    <div id="dvd-clock">
        <span id="dvd-greeting"></span>
        <span id="dvd-time"></span>
        <span id="dvd-hint">click anywhere to close</span>
    </div>
`;
document.body.appendChild(overlay);

const dvdClock    = document.getElementById('dvd-clock');
const dvdGreeting = document.getElementById('dvd-greeting');
const dvdTime     = document.getElementById('dvd-time');


let dvdX, dvdY, dvdVX, dvdVY, dvdColorIndex, dvdAnimId, dvdTickId;
const SPEED = 2.2; 

function pickNextColor() {
    dvdColorIndex = (dvdColorIndex + 1) % dvdColors.length;
    const c = dvdColors[dvdColorIndex];
    dvdClock.style.color = c;
    dvdClock.classList.remove('dvd-flash');
    void dvdClock.offsetWidth; 
    dvdClock.classList.add('dvd-flash');
}

function dvdLoop() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const cW = dvdClock.offsetWidth;
    const cH = dvdClock.offsetHeight;

    dvdX += dvdVX;
    dvdY += dvdVY;

    let bounced = false;

    if (dvdX <= 0) {
        dvdX = 0;
        dvdVX = Math.abs(dvdVX);
        bounced = true;
    } else if (dvdX + cW >= W) {
        dvdX = W - cW;
        dvdVX = -Math.abs(dvdVX);
        bounced = true;
    }

    if (dvdY <= 0) {
        dvdY = 0;
        dvdVY = Math.abs(dvdVY);
        bounced = true;
    } else if (dvdY + cH >= H) {
        dvdY = H - cH;
        dvdVY = -Math.abs(dvdVY);
        bounced = true;
    }

    if (bounced) pickNextColor();

    dvdClock.style.left = dvdX + 'px';
    dvdClock.style.top  = dvdY + 'px';

    dvdAnimId = requestAnimationFrame(dvdLoop);
}

function dvdUpdateTime() {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    dvdTime.textContent = h + ':' + m + ':' + s;

    if      (h >= 5  && h < 12) dvdGreeting.textContent = 'Good Morning!';
    else if (h >= 12 && h < 18) dvdGreeting.textContent = 'Good Afternoon!';
    else if (h >= 18 && h < 22) dvdGreeting.textContent = 'Good Evening!';
    else                         dvdGreeting.textContent = 'Good Night!';
}

function openDvdOverlay() {
    overlay.classList.add('active');


    dvdX = (window.innerWidth  / 2) - (dvdClock.offsetWidth  / 2);
    dvdY = (window.innerHeight / 2) - (dvdClock.offsetHeight / 2);

    const angle = Math.random() * 2 * Math.PI;
    dvdVX = Math.cos(angle) * SPEED;
    dvdVY = Math.sin(angle) * SPEED;

    dvdColorIndex = 0;
    dvdClock.style.color = dvdColors[0];

    dvdUpdateTime();
    dvdTickId = setInterval(dvdUpdateTime, 1000);
    dvdAnimId = requestAnimationFrame(dvdLoop);
}

function closeDvdOverlay() {
    overlay.classList.remove('active');
    cancelAnimationFrame(dvdAnimId);
    clearInterval(dvdTickId);
}

// Open on nav-clock click
document.querySelector('.nav-clock').addEventListener('click', openDvdOverlay);

// Close on overlay click
overlay.addEventListener('click', closeDvdOverlay);

// Also close with Escape key
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeDvdOverlay();
});