let $table = document.createElement("table");
let $counter = document.createElement("span");
$counter.classList.add("counter");
document.body.appendChild($counter);

function getCounter() {
    return localStorage.getItem("counter") || "0";
}

function updateCounter() {
    $counter.textContent = getCounter();
}

function incrementCounter() {
    localStorage.setItem("counter", (parseInt(getCounter()) + 1).toString());
}

updateCounter();

const burst_img = "images/bubble1.jpg";
const burst_selector = `img[src="${burst_img}"]`;
const bubble_img = "images/bubble0.jpg";
const bubble_selector = `img[src="${bubble_img}"]`;
const sounds = ["sounds/bubble1.mp3", "sounds/bubble2.mp3", "sounds/bubble3.mp3"];

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
    if ($img.getAttribute("burst"))
        return;
    $img.src = burst_img;
    $img.setAttribute("burst", "true");
    let $audio = document.createElement("audio");
    let choice = Math.min(Math.round(Math.random() * sounds.length), sounds.length - 1);
    $audio.controls = false;
    $audio.autoplay = true;
    $audio.src = sounds[choice];
    $audio.addEventListener("ended", () => $audio.remove());
    document.body.appendChild($audio);
    incrementCounter();
    updateCounter();
}

document.body.addEventListener("keypress", event => {
    if(event.key.toLowerCase() === "b") {
        let bubbles = document.body.querySelectorAll(bubble_selector);
        if(bubbles.length === 0)
            return;
        let choice = Math.min(Math.round(Math.random() * bubbles.length), bubbles.length - 1);
        burst(bubbles[choice]);
    } else if (event.key.toLowerCase() === "r") {
        resetAll();
    }
});
