'use strict';

let timerId,
    minutes = 0,
    seconds = 0,
    history = [];

function startStopwatch(interval, selector) {
    clearInterval(timerId);

    timerId = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
            }
        }
        showStopwatch(selector);
    }, interval);
}

function showStopwatch(selector) {
    let current = document.querySelector(selector);
    let minutesString = minutes.toString().padStart(2, '0');
    let secondsString = seconds.toString().padStart(2, '0');

    current.innerHTML = `<span class="app__minutes stopwatch">${minutesString}</span>:<span class="app__seconds stopwatch">${secondsString}</span>`;
}

function getStopwatchData(selector) {
    let stopwatches = document.querySelectorAll(selector),
        min = stopwatches[0].textContent,
        sec = stopwatches[1].textContent;

    updateLastStopwatch('.app__last', min, sec);
}

function updateLastStopwatch(selector, min, sec) {
    const lastStopwatch = document.querySelector(selector);
    lastStopwatch.innerHTML = `Last time: <span class="stopwatch">${min}</span>:<span class="stopwatch">${sec}</span>`;

    showHistory('.app__list', min, sec);
}

function showHistory(selector, min, sec) {
    const ulList = document.querySelector(selector);
    history.push(`${min}:${sec}`);
    ulList.textContent = '';

    history.map((item, index) => {
        const liItem = document.createElement('li');
        liItem.innerHTML = `Time #${index + 1} ${item}`;
        ulList.append(liItem);
    });
}

function stopStopwatch(selector) {
    const stopwatches = document.querySelectorAll(selector);
    stopwatches.forEach(stopwatch => stopwatch.textContent = '00');
    minutes = 0;
    seconds = 0;
}

function resetStopwatch(selector, list, item, classActive) {
    let stopwatches = document.querySelectorAll(selector),
        items = document.querySelectorAll(item);
    list = document.querySelector(list);
    stopwatches.forEach(stopwatch => stopwatch.textContent = '00');
    items.forEach(item => item.remove());
    list.classList.remove(classActive);
    history = [];
    minutes = 0;
    seconds = 0;
}

function checkListLength(selector) {
    const list = document.querySelector(selector);
    list.children.length === 0 ? list.innerHTML = `<li>The history is empty</li>` : false;
}

function toggleClassElement(selector, activeClass) {
    const element = document.querySelector(selector);
    element.classList.contains(activeClass) ? element.classList.remove(activeClass) : element.classList.add(activeClass);
}

function changeColor(selector) {
    const input = document.querySelector(selector);
    document.documentElement.style.setProperty('--main-color', input.value);
}

document.querySelector('.app__input').addEventListener('input', () => changeColor('.app__input'));
document.querySelector('.fa-palette').addEventListener('click', () => toggleClassElement('.app__color', 'show-color'));
document.querySelector('.fa-question-circle').addEventListener('click', () => toggleClassElement('.popup', 'show-popup'));
document.querySelector('.fa-play').addEventListener('click', () => startStopwatch(1000, '.app__current'));
document.querySelector('.fa-pause').addEventListener('click', () => clearInterval(timerId));
document.querySelector('.fa-stop').addEventListener('click', () => {
    getStopwatchData('.app__current .stopwatch');
    stopStopwatch('.app__minutes, .app__seconds');
    clearInterval(timerId);
});
document.querySelector('.fa-times').addEventListener('click', () => {
    resetStopwatch('.stopwatch', '.app__list', '.app__list li', 'show-list');
    clearInterval(timerId);
});
document.querySelector('.app__history').addEventListener('click', () => {
    checkListLength('.app__list');
    toggleClassElement('.app__list', 'show-list');
});
document.querySelector('.popup').addEventListener('click', e => {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close')) {
        toggleClassElement('.popup', 'show-popup');
    }
});