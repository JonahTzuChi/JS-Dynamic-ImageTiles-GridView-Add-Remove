function HTTPGetData(urlStr, callback = undefined) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", urlStr, true);
    rawFile.setRequestHeader("Content-type", "application/json");
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            ret = rawFile.responseText;
            if (callback == undefined) return;
            callback(ret);
        }
    };
    rawFile.send();
}

function handler(event) {
    if (event.target.classList.contains("remove")) {
        const container = document.getElementById("container");
        const target_id = event.target.id.replace("btn-", "div-");
        let child = undefined;
        const children = container.childNodes;
        console.log("before");
        console.log(children.length);
        for (let i = 0; i < children.length; i++) {
            console.log("child " + children[i].id);
            if (children[i].id == target_id) {
                child = children[i];
                container.removeChild(child);
                console.log("after");
                console.log(container.children.length);
                break;
            }
        }
    }
}

function add() {
    //const file_src = document.getElementById("filename").value;
    const container = document.getElementById("container");
    if (container.children.length == 4) {
        alert(
            "REACH MAXIMUM LIMIT, PLEASE REMOVE PICTURE TO ADD NEW"
        );
        return;
    }
    const i = container.children.length + 1;

    const img = document.createElement("img");
    //img.src = `/images/${file_src}`;
    //img.src = file_src;
    img.id = `img-${i}`;

    const button = document.createElement("button");
    document.create;
    button.id = `btn-${i}`;
    button.innerHTML = "add";
    button.setAttribute("class", "remove");
    button.addEventListener("click", handler);
    const child = document.createElement("div");
    child.id = `div-${i}`;
    child.appendChild(img);
    child.appendChild(button);
    container.appendChild(child);

    const api = "https://dog.ceo/api/breeds/image/random";
    HTTPGetData(api, response => {
        const json = JSON.parse(response);
        const img_url = json.message;
        document.getElementById(`img-${i}`).setAttribute("src", img_url);
    });
}