<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="Style/nuda.css">
    <title>Kresli si!</title>
</head>
<body>

<canvas id="myCanvas"></canvas>
<br>
<button id="rgbBtn">RGB</button>
<button id="colorBtnRed">Červená</button>
<button id="colorBtnGreen">Zelená</button>
<button id="colorBtnBlue">Modrá</button>
<button id="loadBtn">Načíst uložený obrázek</button>
<button id="saveBtn">Uložit</button>
<button id="clearBtn">Vymazat</button>

<label id="pruhlednost" for="opacityRange">Průhlednost:</label>
<input type="range" min="0" max="1" step="0.1" value="1" id="opacityRange">

<button id="homepage-button">Uvodní obrazovka</button>
<button id="crypto-button">Hrát hru!</button>
<button id="nuda-button">Kreslení</button>

<script src="script/nuda.js"></script>
<script src="script/save.js"></script>
<script src="script/uvod.js"></script>
</body>
</html>