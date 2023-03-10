let control_id = 1;

function HTTPGetData(urlStr, callback = undefined) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", urlStr, true);
    // Content-Type header is not required
    // This the server specific
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            ret = rawFile.responseText;
            if (callback == undefined) return;
            callback(ret);
        }
    };
    rawFile.send();
}
/*
    Stackoverflow
    Link: https://stackoverflow.com/questions/14258787/add-event-listener-on-elements-created-dynamically
    This is a master handler, set different class name to create handler script for different purpose
    Only the element is dynamically added or remove
    Scripts are all predefined. 
*/
function handler(event) {
    // watch for the class name of target control
    if (event.target.classList.contains("remove")) {
        const container = document.getElementById("container");
        const target_id = event.target.id.replace("btn-", "div-"); 
        const children = container.childNodes;
        // reduce function is undefined
        // const childnode = children.reduce( node => node.id == target_id );
        // container.removeChild(childnode);
        for (let i = 0; i < children.length; i++) {
            if (children[i].id == target_id) {
                container.removeChild(children[i]);
                break;
            }
        }
    }
}

function add() {
    // Capture container div
    const container = document.getElementById("container");
    // Limit to 4, just a constant. No magic
    if (container.children.length == 4) {
        alert(
            "REACH MAXIMUM LIMIT, PLEASE REMOVE PICTURE TO ADD NEW"
        );
        return;
    }
    // Prepare unique_id
    // Access global variable
    control_id += 1;
    const i = control_id;
    // Generate Image element
    const img = document.createElement("img");
    img.id = `img-${i}`;
    // img.src will be assigned after 
    // Generate Button element
    const button = document.createElement("button");
    document.create;
    button.id = `btn-${i}`;
    button.innerHTML = "remove";
    button.setAttribute("class", "remove");
    button.addEventListener("click", handler);
    // Generate div element
    const child = document.createElement("div");
    child.id = `div-${i}`;
    //
    child.appendChild(img);
    child.appendChild(button);
    container.appendChild(child);
    // Access public api
    const api = "https://dog.ceo/api/breeds/image/random";
    HTTPGetData(api, response => {
        const json = JSON.parse(response);
        const img_url = json.message;
        // set src of target img element
        document.getElementById(`img-${i}`).setAttribute("src", img_url);
    }); // callback function
}