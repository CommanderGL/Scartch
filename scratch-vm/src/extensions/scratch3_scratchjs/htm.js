const htm = require('htm').default;

const appendChild = (parent, child) => {
    if (Array.isArray(child)) {
        child.forEach(nestedChild => appendChild(parent, nestedChild));
        return;
    }
    parent.append(child.nodeType ? child : document.createTextNode(child));
};

const createElement = (type, props, ...children) => {
    const elem = document.createElement(type);

    children.forEach(child => {
        appendChild(elem, child);
    });

    Object.entries(props || {}).forEach(([prop, value]) => {
        elem.setAttribute(prop, value);
    });

    return elem;
};

const htmBinding = htm.bind(createElement);

const html = (strings, ...values) => {
    const htmUsage = htmBinding(strings, ...values);
    if (Array.isArray(htmUsage)) {
        const divWrapper = document.createElement('div');
        htmUsage.forEach(usage => {
            divWrapper.append(usage);
        });

        return divWrapper;
    }

    return htmUsage;
};

module.exports = html;
