'use strict';

let timerId,
    minutes = 0,
    seconds = 0,
    history = [];

function startStopwatch(interval, selector) {
    clearStopwatchInterval(selector);

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

function clearStopwatchInterval() {
    clearInterval(timerId);
}

function showStopwatch(selector) {
    let current = document.querySelector(selector);

    if (minutes >= 0 && minutes <= 9) {
        if (seconds >= 0 && seconds <= 9) {
            current.innerHTML = `<span class="app__minutes stopwatch">0${minutes}</span>:<span class="app__seconds stopwatch">0${seconds}</span>`;
        } else if (seconds >= 10 && seconds <= 59) {
            current.innerHTML = `<span class="app__minutes stopwatch">0${minutes}</span>:<span class="app__seconds stopwatch">${seconds}</span>`;
        }
    } else if (minutes >= 10 && minutes <= 59) {
        if (seconds >= 0 && seconds <= 9) {
            current.innerHTML = `<span class="app__minutes stopwatch">${minutes}</span>:<span class="app__seconds stopwatch">0${seconds}</span>`;
        } else if (seconds >= 10 && seconds <= 59) {
            current.innerHTML = `<span class="app__minutes stopwatch">${minutes}</span>:<span class="app__seconds stopwatch">${seconds}</span>`;
        }
    }
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

    if (list.children.length === 0) {
        list.innerHTML = `<li>The history is empty</li>`;
    }
}

function showElements(selector, activeClass) {
    const element = document.querySelector(selector);

    if (!element.classList.contains(activeClass)) {
        element.classList.add(activeClass);
    } else {
        element.classList.remove(activeClass);
    }
}

function changeColor(selector) {
    const input = document.querySelector(selector);
    document.documentElement.style.setProperty('--main-color', input.value);
}

document.addEventListener('click', e => {
    const target = e.target;
    if (target.classList.contains('app__palette') || target.classList.contains('fa-palette')) {
        showElements('.app__color', 'show-color');
    }

    if (target.classList.contains('app__start') || target.classList.contains('fa-play')) {
        startStopwatch(1000, '.app__current');
    }

    if (target.classList.contains('app__pause') || target.classList.contains('fa-pause')) {
        clearStopwatchInterval();
    }

    if (target.classList.contains('app__stop') || target.classList.contains('fa-stop')) {
        getStopwatchData('.app__current .stopwatch');
        clearStopwatchInterval();
        stopStopwatch('.app__minutes, .app__seconds');
    }

    if (target.classList.contains('app__reset') || target.classList.contains('fa-times')) {
        clearStopwatchInterval();
        resetStopwatch('.stopwatch', '.app__list', '.app__list li', 'show-list');
    }

    if (target.classList.contains('app__history')) {
        checkListLength('.app__list');
        showElements('.app__list', 'show-list');
    }

    if (target.classList.contains('fa-question-circle') || target.classList.contains('popup') || target.classList.contains('popup__close')) {
        showElements('.popup', 'show-popup');
    }
});

document.addEventListener('input', () => changeColor('.app__input'));