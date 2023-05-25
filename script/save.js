window.addEventListener("load", function () { // Načtení obrázku po F5
    var dataURL = localStorage.getItem("drawing"); // do proměnné dataUrl nahraje save s názvem drawing
    var img = new Image(); // Nový image
    img.src = dataURL; // do image nahraje data z dataUrl, kde byl obrázek uložen
    img.onload = function () {
        ctx.drawImage(img, 0, 0); // Nakrestlí uložený obrázek
    };
});

var loadBtn = document.getElementById("loadBtn"); // Získání tlačítka pro načtení uloženého obrázku

loadBtn.addEventListener("click", function () { // Přidání posluchače události na kliknutí na tlačítko
    var dataURL = localStorage.getItem("drawing"); // Do proměnné dataUrl nahraje uložený obrázek s názvem drawing
    if (dataURL) { // Pokud je uložený obrázek nalezen v local storage
        var img = new Image(); // Vytvoření nového image
        img.src = dataURL; // Do image nahraje data z dataUrl, kde byl obrázek uložen
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Vyčištění canvasu
            ctx.drawImage(img, 0, 0); // Nakreslení uloženého obrázku
        };
    }
});


var saveBtn = document.getElementById("saveBtn"); // Zavolání tlačítka

saveBtn.addEventListener("click", function() {
    localStorage.setItem("drawing", canvas.toDataURL()); // Získání dat obrázku
});

