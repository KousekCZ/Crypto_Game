function showHomepage() {
    window.location.href = 'uvod.php';
}

function showCryptoPrices() {
    window.location.href = 'crypto.php';
}

function goToNudaPage() {
    window.location.href = 'nuda.php';
}

document.getElementById('homepage-button').addEventListener('click', showHomepage);
document.getElementById('crypto-button').addEventListener('click', showCryptoPrices);
document.getElementById('nuda-button').addEventListener('click', goToNudaPage);

