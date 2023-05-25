const apiUrl = 'https://api.coinranking.com/v2/coins';
const apiKey = 'coinrankingeb9b74a5ccd6bfbc4f234e1c2411899cee95ead421603535';
const updateInterval = 60000; // 60 seconds

let userDollars = Math.floor(Math.random() * 901) + 100; // Generování náhodného počtu dolarů od 100 do 1000
let ownedCrypto = {};

function updateBalance() {
    localStorage.setItem('userDollars', userDollars);

    const balanceElement = document.getElementById('balance');
    balanceElement.textContent = `Zůstatek: ${userDollars} $`;
}

function buyCrypto(symbol, price, amount) {
    const totalCost = price * amount;

    if (totalCost <= userDollars) {
        userDollars -= totalCost;
        if (ownedCrypto.hasOwnProperty(symbol)) {
            ownedCrypto[symbol] += amount;
        } else {
            ownedCrypto[symbol] = amount;
        }
        alert(`Koupil jste ${amount} kusů kryptoměny ${symbol}.`);
        localStorage.setItem('ownedCrypto', JSON.stringify(ownedCrypto));
        updateBalance();
        displayOwnedCrypto();
    } else {
        alert('Nemáte dostatek prostředků.');
    }
}

function sellCrypto(symbol, price, amount) {
    if (ownedCrypto.hasOwnProperty(symbol) && ownedCrypto[symbol] >= amount) {
        const totalEarned = price * amount;
        userDollars += totalEarned;
        ownedCrypto[symbol] -= amount;
        alert(`Prodal jste ${amount} kusů kryptoměny ${symbol}.`);
        localStorage.setItem('ownedCrypto', JSON.stringify(ownedCrypto));
        updateBalance();
        displayOwnedCrypto();
    } else {
        alert('Nemáte dostatek kryptoměny k prodeji.');
    }
}

function fetchCryptoData() {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'x-access-token': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            var dt = new Date();
            document.getElementById('date-time').innerHTML = dt;
            const cryptoTable = document.getElementById('crypto-table');
            const cryptoTableBody = cryptoTable.getElementsByTagName('tbody')[0];
            cryptoTableBody.innerHTML = ''; // Clear table body
            data.data.coins.forEach(coin => {
                const row = document.createElement('tr');
                const nameCell = document.createElement('td');
                nameCell.textContent = coin.name;
                row.appendChild(nameCell);
                const symbolCell = document.createElement('td');
                symbolCell.textContent = coin.symbol;
                row.appendChild(symbolCell);
                const priceCell = document.createElement('td');
                priceCell.textContent = `$${coin.price}`;
                row.appendChild(priceCell);
                const changeCell = document.createElement('td');
                changeCell.textContent = `${coin.change}%`;
                if (coin.change > 0) {
                    changeCell.style.color = 'green';
                } else if (coin.change < 0) {
                    changeCell.style.color = 'red';
                }
                row.appendChild(changeCell);
                const sellCell = document.createElement('td');
                const sellInput = document.createElement('input');
                sellInput.type = 'number';
                sellInput.min = '0';
                sellInput.placeholder = 'Množství';
                sellCell.appendChild(sellInput);
                const sellButton = document.createElement('button');
                sellButton.innerHTML = 'Prodat';
                sellButton.addEventListener('click', () => {
                    const sellAmount = parseInt(sellInput.value);
                    sellCrypto(coin.symbol, coin.price, sellAmount);
                });
                sellCell.appendChild(sellButton);
                row.appendChild(sellCell);
                const buyCell = document.createElement('td');
                const buyInput = document.createElement('input');
                buyInput.type = 'number';
                buyInput.min = '0';
                buyInput.placeholder = 'Množství';
                buyCell.appendChild(buyInput);
                const buyButton = document.createElement('button');
                buyButton.innerHTML = 'Koupit';
                buyButton.addEventListener('click', () => {
                    const buyAmount = parseInt(buyInput.value);
                    buyCrypto(coin.symbol, coin.price, buyAmount);
                });
                buyCell.appendChild(buyButton);
                row.appendChild(buyCell);
                cryptoTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error(error);
        });
}

function startCountdown(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = `Obnovení za: ${minutes}:${seconds}`;

        if (--timer < 0) {
            timer = duration;
            var dt = new Date();
            document.getElementById('date-time').innerHTML = dt;
            fetchCryptoData();
        }
    }, 1000);
}

function displayOwnedCrypto() {
    const ownedCryptoElement = document.querySelector('#ownedCryptoElement');
    const cryptoList = Object.keys(ownedCrypto);
    let cryptoText = "Vlastněné kryptoměny: ";
    localStorage.setItem('ownedCrypto', JSON.stringify(ownedCrypto));
    for (let i = 0; i < cryptoList.length; i++) {
        const symbol = cryptoList[i];
        const amount = ownedCrypto[symbol];
        cryptoText += `${symbol}: ${amount} kusů`;
        if (i !== cryptoList.length - 1) {
            cryptoText += ", ";
        }
    }
    ownedCryptoElement.textContent = cryptoText;
    const balanceElement = document.getElementById('balance');
    balanceElement.parentNode.insertBefore(ownedCryptoElement, balanceElement.nextSibling);
}

function loadUserDataFromLocalStorage() {
    const savedUserDollars = localStorage.getItem('userDollars');
    if (savedUserDollars) {
        userDollars = parseInt(savedUserDollars);
    }

    const savedOwnedCrypto = localStorage.getItem('ownedCrypto');
    if (savedOwnedCrypto) {
        ownedCrypto = JSON.parse(savedOwnedCrypto);
    }
}

loadUserDataFromLocalStorage();
displayOwnedCrypto();
fetchCryptoData();
startCountdown(updateInterval / 1000, document.getElementById('countdown'));
updateBalance();




