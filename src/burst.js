let $table = document.createElement("table");

const burst_img = "images/bubble1.jpg";
const burst_selector = `img[src="${burst_img}"]`;
const bubble_img = "images/bubble0.jpg";
const bubble_selector = `img[src="${bubble_img}"]`;

function appendRow() {
    let $tr = document.createElement("tr");
    for(let j = 0;j<10;j++) {
        let $td = document.createElement("td");
        let $img = document.createElement("img");
        $td.addEventListener("click", () => burst($img));
        $img.src = bubble_img;
        $img.width = 60;
        $td.appendChild($img);
        $tr.appendChild($td);
    }
    $table.appendChild($tr);
}

function reset() {
    $table.firstElementChild.remove();
    appendRow();
}

function resetAll() {
    let burst = document.body.querySelectorAll(burst_selector);
    if(burst.length === 0)
        return;
    reset();
    setTimeout(resetAll, 500);
}

for(let i = 0;i<6;i++) {
    appendRow();
}

document.body.appendChild($table);

function burst($img) {
    if ($img.src === burst_img)
        return;
    $img.src = burst_img;
}

document.body.addEventListener("keypress", event => {
    if(event.key.toLowerCase() === "b") {
        let bubbles = document.body.querySelectorAll(bubble_selector);
        if(bubbles.length === 0)
            return;
        let choice = Math.min(Math.round(Math.random() * bubbles.length), bubbles.length - 1);
        bubbles[choice].src = burst_img;
    } else if (event.key.toLowerCase() === "r") {
        resetAll();
    }
});
