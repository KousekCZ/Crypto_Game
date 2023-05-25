var canvas = document.getElementById("myCanvas"); // Získání Canvas z html
var ctx = canvas.getContext("2d"); // Nastavení na 2D
var clearBtn = document.getElementById("clearBtn"); // Získání tlačítka clear
var isDrawing = false; // Podmínka jestli user kreslí
var lastX = 0; // Poslední pozice myši osy X
var lastY = 0; // Poslední pozice myši osy Y
var hue = 0; // nastavení odstínu, sytosti a světlosti
var selectedColor = "rgb"; // První barva je rgb

canvas.width = window.innerWidth * 0.9; // Umístění X a Y barvy vůči velikosti okna a canvasu
canvas.height = window.innerHeight * 0.9; // --||--

ctx.lineJoin = "round"; // Smooth
ctx.lineCap = "round"; // Smooth
ctx.lineWidth = 10; // Velikost kreslící tužky

clearBtn.addEventListener("click", function () { // Vyčištění celého canvasu
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousedown", function (e) { // Stisknuté tlačítko na myši = kreslení na ano
    isDrawing = true;
    lastX = e.clientX; // Nahraje aktuální pozici myši X
    lastY = e.clientY; // Nahraje aktuální pozici myši Y
});

canvas.addEventListener("mouseup", function () { // Nestisknuté tlačítko na myši = už nekreslí
    isDrawing = false;
});

canvas.addEventListener("mouseout", function () { // Pokud myš vyjede z canvas = už nekreslí
    isDrawing = false;
});

canvas.addEventListener("mousemove", function (e) {
    if (!isDrawing) return;
    ctx.strokeStyle = getSelectedColor(); // nastavení požadované barvy, sytost(100%) a světlost(50%)
    ctx.beginPath(); // Zahajuje novou cestu kreslení
    ctx.moveTo(lastX, lastY); // určuje počáteční body kreslení
    ctx.lineTo(e.clientX, e.clientY); // určuje koncový bod cesty, stále updatované, kde se zrovna nachází
    ctx.stroke(); // vykresluje cestu
    lastX = e.clientX;// Nahraje aktuální pozici myši X
    lastY = e.clientY; // Nahraje aktuální pozici myši Y
    hue++; // zvětšování odstínu
});

function getSelectedColor() {
    if (selectedColor === "rgb") { //vybrání barvy
        return `hsl(${hue}, 100%, 50%)`; // Plynulé rgb
    } else {
        return selectedColor; // Vybraná barva
    }
}

// Nastavení vybrané barvy na RGB
document.getElementById("rgbBtn").addEventListener("click", function() {
    selectedColor = "rgb";
});

// Nastavení vybrané barvy na Red
document.getElementById("colorBtnRed").addEventListener("click", function() {
    selectedColor = "red";
});

// Nastavení vybrané barvy na Green
document.getElementById("colorBtnGreen").addEventListener("click", function() {
    selectedColor = "greenyellow";
});

// Nastavení vybrané barvy na Blue
document.getElementById("colorBtnBlue").addEventListener("click", function() {
    selectedColor = "blue";
});

var opacityRange = document.getElementById("opacityRange"); // získání posuvníku

opacityRange.addEventListener("input", function () { // přidání posluchače události na změnu hodnoty posuvníku
    ctx.globalAlpha = opacityRange.value; // nastavení průhlednosti kreslení podle hodnoty posuvníku
});

