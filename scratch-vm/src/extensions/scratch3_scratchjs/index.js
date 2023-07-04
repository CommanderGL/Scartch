/* eslint-disable no-invalid-this */
/* eslint-disable camelcase */
const {SJSconsole, insertConsoleElem, insertMenubarElem, loadConsoleCSS} = require('./console.js');

class ScratchJS {
    constructor (runtime) {
        this.runtime = runtime;
        loadConsoleCSS();
        insertConsoleElem();
        insertMenubarElem();
        // eslint-disable-next-line no-console
        console.log('ScratchJS Initialized!');
    }

    getInfo () {
        return {
            id: 'scratchjs',
            name: 'ScratchJS',
            blocks: [
                {
                    opcode: 'eval_cmd',
                    blockType: 'command',
                    text: 'eval [code]',
                    arguments: {
                        code: {
                            type: 'string',
                            defaultValue: 'alert("Hello, World!");'
                        }
                    }
                },
                {
                    opcode: 'eval_rep',
                    blockType: 'reporter',
                    text: 'eval [code]',
                    arguments: {
                        code: {
                            type: 'string',
                            defaultValue: 'alert("Hello, World!");'
                        }
                    }
                },
                {
                    opcode: 'fetch',
                    blockType: 'reporter',
                    text: 'fetch [url]',
                    arguments: {
                        url: {
                            type: 'string',
                            defaultValue: 'https://api.weather.gov/points/37.4268,-122.0806'
                        }
                    }
                },
                {
                    opcode: 'alert',
                    blockType: 'command',
                    text: 'alert [text]',
                    arguments: {
                        text: {
                            type: 'string',
                            defaultValue: 'Hello, World!'
                        }
                    }
                },
                {
                    opcode: 'log',
                    blockType: 'command',
                    text: 'console log [text]',
                    arguments: {
                        text: {
                            type: 'string',
                            defaultValue: 'Hello, World!'
                        }
                    }
                },
                {
                    opcode: 'clear',
                    blockType: 'command',
                    text: 'clear console'
                }
            ]
        };
    }

    eval_cmd = this.eval;
    eval_rep = this.eval;

    eval ({code}) {
        // eslint-disable-next-line no-eval
        return JSON.stringify(eval(code));
    }

    async fetch ({url}) {
        return await fetch(url).then(res => res.text());
    }

    alert ({text}) {
        // eslint-disable-next-line no-alert
        alert(text);
    }

    log ({text}) {
        SJSconsole.log(text);
    }

    clear () {
        SJSconsole.clear();
    }
}

module.exports = ScratchJS;
