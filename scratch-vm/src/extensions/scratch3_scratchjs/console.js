const html = require('./htm.js');
require('@fortawesome/fontawesome-free/js/fontawesome');
require('@fortawesome/fontawesome-free/js/solid');
const Draggabilly = require('draggabilly');

const consoleStyles = html`
<style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');

    :root {
        --margin: 1rem;
        --console-width: 500px;
        --console-height: 300px;
    }

    .console {
        position: absolute !important;
        width: var(--console-width);
        height: var(--console-height);
        z-index: 101;
        left: 0;
        top: 3rem;
        background: #fff;
        border: 4px solid hsla(0, 100%, 100%, 0.25);
        padding: 0;
        outline: none;
        font-family: 'JetBrains Mono', monospace;
        overflow-y: auto;
        overflow-wrap: break-word;
        border-radius: 0.5rem;
        box-shadow: 1px 1px 3px #000;
    }

    .console-icon {
        color: #fff;
        margin-right: 0.35rem;
    }

    .console > header {
        position: fixed;
        background: #29beb8;
        font-family: Helvetica, Arial, sans-serif;
        height: 3.125rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        cursor: move;
        color: #fff;
        width: calc(var(--console-width) - 8px);
        border-radius: inherit;
    }

    .console > header > .console-right-block {
        display: flex;
        flex-direction: row;
        position: absolute;
        right: var(--margin);
        align-items: center;
    }

    .console > header > .console-right-block > .console-clear {
        margin-right: var(--margin);
        background: #daffff;
        color: #3aa8a4;
        border-radius: 1rem;
        padding: 0.5rem;
        cursor: pointer;
    }

    .console > header > .console-right-block > .console-close {
        border-radius: 50%;
        background: #3aa8a4;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .console > header > .console-title {
        margin-left: var(--margin);
    }

    .console > .console-content {
        width: 100%;
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: calc(3.125rem + var(--margin));
    }

</style>
`;

const consoleElem = html`
<div class="console" hidden>
    <header class="console-header">
        <div class="console-title">
            <i class="console-icon fa-solid fa-terminal"></i>
            Console
        </div>
        <div class="console-right-block">
            <div class="console-clear">Clear</div>
            <div class="console-close">
                <i class="fa-solid fa-xmark" aria-label="Close" tabindex=0></i>
            </div>
        </div>
    </header>
    <ul class="console-content"></ul>
</div>
`;

const consoleContent = consoleElem.querySelector('.console-content');

// eslint-disable-next-line no-new
new Draggabilly(consoleElem, {
    handle: '.console-header',
    containment: '.gui_body-wrapper_-N0sA'
});

const menubarElem = html`
<div aria-label="Console" class="menu-bar_menu-bar-item_oLDa- menu-bar_hoverable_c6WFB">
    <i class="console-icon fa-solid fa-terminal"></i>
    <span>Console</span>
</div>
`;

const SJSconsole = {
    log (text) {
        const elem = document.createElement('li');
        elem.textContent = text;
        if (text === '') {
            elem.style.color = '#777';
            elem.style.fontStyle = 'italic';
            elem.textContent = '(empty string)';
        }
        consoleContent.appendChild(elem);
    },

    clear () {
        consoleContent.innerHTML = '<li style="color: #777; font-style: italic;">(console cleared)</li>';
    }
};

menubarElem.addEventListener('click', () => {
    consoleElem.toggleAttribute('hidden');
});

(consoleElem.querySelector('.console-close')).addEventListener('click', () => {
    consoleElem.toggleAttribute('hidden');
});

(consoleElem.querySelector('.console-clear')).addEventListener('click', SJSconsole.clear);

const createMenubarDivider = () => {
    const divider = document.createElement('div');
    divider.classList.add('divider_divider_1_Adi', 'menu-bar_divider_2VFCm');
    return divider;
};

const insertMenubarElem = () => {
    document.querySelector('div.menu-bar_main-menu_3wjWH').insertBefore(
        createMenubarDivider(),
        document.querySelector('.menu-bar_growable_1sHWN')
    );
    document.querySelector('div.menu-bar_main-menu_3wjWH').insertBefore(
        menubarElem,
        document.querySelector('.menu-bar_growable_1sHWN')
    );
    document.querySelector('div.menu-bar_main-menu_3wjWH').insertBefore(
        createMenubarDivider(),
        document.querySelector('.menu-bar_growable_1sHWN')
    );
};

const insertConsoleElem = () => {
    document.body.appendChild(consoleElem);
};

const loadConsoleCSS = () => {
    document.head.appendChild(consoleStyles);
};

module.exports = {
    SJSconsole,
    insertConsoleElem,
    insertMenubarElem,
    loadConsoleCSS
};
