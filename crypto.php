<!DOCTYPE html>
<html lang="en">
<head>
    <title>Crypto Hra</title>
    <link rel="stylesheet" href="Style/crypto.css">
</head>
<body>
<div class="container">
    <button id="homepage-button">Uvodní obrazovka</button>
    <button id="crypto-button">Znovu načíst crypto</button>
    <button id="nuda-button">Kreslení</button>
</div>

<h1>Crypto hra!</h1>
<p>Datum a čas: <span id='date-time'></span>.</p>
<span id="countdown"></span>
<p>Zůstatek: <span id="balance"></span></p>
<p id="ownedCryptoElement"></p>
<hr class="line">
<table id="crypto-table">
    <thead>
    <tr>
        <th>Jméno</th>
        <th>Symbol</th>
        <th>Cena</th>
        <th>Změna za posledních 24h</th>
        <th>Prodat</th>
        <th>Koupit</th>
    </tr>
    </thead>
    <tbody>
    </tbody>
</table>
<script src="script/crypto.js"></script>
<script src="script/uvod.js"></script>
</body>
</html>
