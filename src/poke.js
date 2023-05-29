/** @type {HTMLCanvasElement} **/
let $canvas = document.getElementById("pokeball");
$canvas.width = $canvas.getBoundingClientRect().width;
$canvas.height = $canvas.getBoundingClientRect().height;
let ctx = $canvas.getContext("2d");
ctx.translate(25, 25);
ctx.strokeStyle = "black";
ctx.fillStyle = "red";
ctx.lineWidth = 10;
ctx.beginPath();
ctx.arc(100, 100, 100, 0, - Math.PI, true);
ctx.fill();
ctx.fillStyle = "white";
ctx.beginPath();
ctx.arc(100, 100, 100, 0, Math.PI, false);
ctx.fill();
ctx.beginPath();
ctx.arc(100, 100, 35, 0, 2 * Math.PI, false);
ctx.fill();
ctx.strokeStyle = "black";
ctx.beginPath();
ctx.arc(100, 100, 100, 0, 2 * Math.PI, false);
ctx.stroke();
ctx.beginPath();
ctx.arc(100, 100, 35, 0, 2 * Math.PI, false);
ctx.stroke();

/** @type {HTMLElement | null} **/
let $message = null;

$canvas.addEventListener("click", async () => {
    let promise = fetch("poke.json").then(r => r.json());
    let json_array = await promise;
    let choice = Math.min(Math.round(Math.random() * json_array.length), json_array.length - 1);
    let pokemon = json_array[choice];
    let selections = sessionStorage.getItem("selections");
    selections = (selections === null) ? 1 : parseInt(selections) + 1;
    sessionStorage.setItem("selections", selections);
    if($message) $message.remove();
    $message = document.createElement("div");
    $message.classList.add("message");
    $message.innerHTML =
        `<p>${pokemon.name}, I choose you! (${selections} selections)</p>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <ul>
            <li>Level: ${pokemon.level}</li>
            <li>Abilities: ${pokemon.ability}</li>
        </ul>
`;
    $canvas.insertAdjacentElement("afterend", $message);
});
