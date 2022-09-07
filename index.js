let home = document.getElementById('home');
let guest = document.getElementById('guest');
let timer = document.getElementById('timer');
let oneTime = 15;
oneTime = addZero(oneTime);
let timeDuration = oneTime * 60 * 1000;
let timerState = 'off';

timer.textContent = `${oneTime}:00:00`;

function addScore(points, player) {
    let side = (player === 'home') ? home : guest;
    let score = +side.textContent;
    side.textContent = score + points;
    if (+home.textContent > +guest.textContent) {
        home.previousElementSibling.style.color = 'yellow';
        guest.previousElementSibling.style.color = '';
    } else if (+home.textContent < +guest.textContent) {
        home.previousElementSibling.style.color = '';
        guest.previousElementSibling.style.color = 'yellow';   
    } else {
        home.previousElementSibling.style.color = '';
        guest.previousElementSibling.style.color = '';       
    }
}

function resetScore() {
    home.textContent = 0;
    guest.textContent = 0;
    home.previousElementSibling.style.color = '';
    guest.previousElementSibling.style.color = ''; 
}
let minutes = oneTime, seconds = 0, sseconds = 0;
let interval, elapsedTime, startTime;
function playTimer(action) {
    if (timerState == 'off') {
        startTime = Date.now() + timeDuration;
    } else if (timerState == 'stopped') {
        startTime = Date.now() + elapsedTime;
    }
    if (action === 'start' && timerState != 'on') {
        timerState = 'on';
        interval = setInterval(function() {
            elapsedTime = startTime - Date.now();
            minutes = Math.floor(elapsedTime / 1000 / 60);
            seconds = Math.floor((elapsedTime - minutes * 1000 * 60) / 1000);
            sseconds = Math.floor((elapsedTime - minutes * 1000 * 60 - seconds * 1000) / 10);
            minutes = addZero(minutes);
            seconds = addZero(seconds);
            sseconds = addZero(sseconds);
            if (elapsedTime <= 0) {
                timerState = 'off';
                minutes = '00';
                seconds = '00';
                sseconds = '00';
                clearInterval(interval);
            }
            timer.textContent = `${minutes}:${seconds}:${sseconds}`;
        }, 10);
    }
    if (action == 'stop' && timerState == 'on') {
        timerState = 'stopped';
        elapsedTime = startTime - Date.now();
        clearInterval(interval);
    }
    if (action == 'reset') {
        minutes = oneTime;
        seconds = 0;
        sseconds = 0;
        timer.textContent = `${oneTime}:00:00`;
        timerState = 'off';
        clearInterval(interval);
    }
}

function addZero(num) {
    if (num < 10) {
        num = '0' + num.toString();
    }
    return num;
}