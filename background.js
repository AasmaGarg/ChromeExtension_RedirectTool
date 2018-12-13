
let mappings;

function handler(tab) {
    let url = tab.url;
    if (Object.keys(mappings).length) {
        Object.keys(mappings).some((key) => {
            if (url.match(key)) {
                url = url.replace(key, mappings[key]);
                chrome.tabs.update({url: url});
                return true;
            }
        });
    }
}

function redirect() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", chrome.extension.getURL("/mappings.json"), true);
    xhr.onload = () => {
        mappings = JSON.parse(xhr.responseText);
        chrome.browserAction.onClicked.addListener(handler);
    };
    xhr.send();
}

redirect();
