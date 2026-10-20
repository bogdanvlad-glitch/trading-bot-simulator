let cash = 1000;

let stocks = [
    {
        name: 'Apple',
        symbol: 'APPL',
        price: 182,
        owned: 0
    },
    {
        name: 'Nvidia',
        symbol: 'NVDIA',
        price: 135,
        owned: 0
    },
    {
        name: 'Microsoft',
        symbol: 'MICROS',
        price: 420,
        owned: 0
    },
    {
        name: 'Google',
        symbol: 'GOOGL',
        price: 175,
        owned: 0
    },
    {
        name: 'Amazon',
        symbol: 'AMZN',
        price: 185,
        owned: 0
    },
    {
        name: 'Meta',
        symbol: 'META',
        price: 500,
        owned: 0
    },
    {
        name: 'Tesla',
        symbol: 'TSLA',
        price: 220,
        owned: 0
    },
    {
        name: 'Netflix',
        symbol: 'NFLX',
        price: 650,
        owned: 0
    },
    {
        name: 'AMD',
        symbol: 'AMD',
        price: 155,
        owned: 0
    },
    {
        name: 'Intel',
        symbol: 'INTC',
        price: 35,
        owned: 0
    },
    {
        name: 'Adobe',
        symbol: 'ADBE',
        price: 520,
        owned: 0
    },
    {
        name: 'Spotify',
        symbol: 'SPOT',
        price: 310,
        owned: 0
    },
    {
        name: 'Uber',
        symbol: 'UBER',
        price: 75,
        owned: 0
    },
    {
        name: 'Airbnb',
        symbol: 'ABNB',
        price: 140,
        owned: 0
    },
    {
        name: 'PayPal',
        symbol: 'PYPL',
        price: 65,
        owned: 0
    },
    {
        name: 'Oracle',
        symbol: 'ORCL',
        price: 138,
        owned: 0
    },
    {
        name: 'Qualcomm',
        symbol: 'QCOM',
        price: 170,
        owned: 0
    },
    {
        name: 'IBM',
        symbol: 'IBM',
        price: 190,
        owned: 0
    },
    {
        name: 'Sony',
        symbol: 'SONY',
        price: 85,
        owned: 0
    },
    {
        name: 'Nintendo',
        symbol: 'NTDOY',
        price: 14,
        owned: 0
    },
    {
        name: 'Shopify',
        symbol: 'SHOP',
        price: 70,
        owned: 0
    },
    {
        name: 'Coinbase',
        symbol: 'COIN',
        price: 210,
        owned: 0
    },
    {
        name: 'Palantir',
        symbol: 'PLTR',
        price: 28,
        owned: 0
    }
];

let history = [];

let intervalId;
let marketRunning = false;

function buyStock(index) {
    const stock = stocks[index];

    if (cash >= stock.price) {
        cash = cash - stock.price;
        stock.owned++;
        renderStocks();

        history.push({
            type: 'bought',
            stock: stock.name,
            price: stock.price
        });

        renderHistory();
        saveData();
    }
}

function sellStock(index) {
    const stock = stocks[index];
    
    if (stock.owned >= 1) {
        cash = cash + stock.price;
        stock.owned = stock.owned - 1;
        renderStocks();

        history.push({
            type: 'sold',
            stock: stock.name,
            price: stock.price
        });

        renderHistory();
        saveData();
    }
}

function renderStats() {
    let portfolio = 0;

    stocks.forEach(function(stock) {
        portfolio = (Math.round((portfolio + (stock.price * stock.owned)) * 100)) / 100;
    });

    let total = cash + portfolio;
    cash = (Math.round(cash * 100)) / 100;
    total = (Math.round(total * 100)) / 100;

    document.querySelector('.js-cash').innerHTML = `${cash}`;
    document.querySelector('.js-total-value').innerHTML = `${total}`;
    document.querySelector('.js-portfolio-value').innerHTML = `${portfolio}`;
}

function renderStocks() {
    let name = '';
    let price = 0;
    let owned = 0;

    let stocksHTML = '';
    
    stocks.forEach(function(stock, index) {
        name = stock.name;
        price = (Math.round((stock.price) * 100)) / 100;
        owned = stock.owned;
        symbol = stock.symbol;

        stocksHTML = stocksHTML + `
            <div class="stock-card">

                <div>
                    <div class="stock-name">${name}</div>
                    <div class="stock-symbol">${symbol}</div>
                </div>

                <div class="stock-info">
                    <p>Prix</p>
                    <strong>${price}</strong>
                </div>

                <div class="stock-info">
                    <p>Possédé</p>
                    <strong>${owned}</strong>
                </div>

                <div class="stock-actions">
                    <button class="buy-button" onclick='buyStock(${index})'>Acheter</button>
                    <button class="sell-button" onclick='sellStock(${index})'>Vendre</button>
                </div>

            </div>
        `;
    });

    document.querySelector('.js-stock-list').innerHTML = stocksHTML;
    renderStats();
}

function updatePrices() {
    stocks.forEach(function(stock) {
        const randomVariation = Math.random();

        const randomDirection = Math.random();

        let finalVariation;

        if (randomDirection < 0.5) {
            finalVariation = -randomVariation;
        } else {
            finalVariation = randomVariation;
        }

        stock.price = stock.price + finalVariation;

        if (stock.price < 1) {
            stock.price = 1;
        }
    });

    renderStocks();
}

function startMarket() {
    if (!marketRunning) {
        intervalId = setInterval(function() {
            updatePrices();
        }, 1000)
        marketRunning = true;
    }
}

function stopMarket() {
    clearInterval(intervalId);
    marketRunning = false;
}


function resetMarket() {
    clearInterval(intervalId);
    marketRunning = false;

    cash = 1000;
    history = [];

    stocks[0].price = 182;
    stocks[0].owned = 0;

    stocks[1].price = 135;
    stocks[1].owned = 0;

    stocks[2].price = 420;
    stocks[2].owned = 0;

    saveData();

    renderStocks();
    renderHistory();
}


document.querySelector('.js-reset').addEventListener('click', resetMarket);

document.querySelector('.js-start-market').addEventListener('click', startMarket);
document.querySelector('.js-stop-market').addEventListener('click', stopMarket);

function renderHistory() {
    let historyHTML = '';
    history.forEach(function(action) {
        let stock = action.stock;
        let type = action.type;
        let price = action.price;

        historyHTML = historyHTML + `
            <div class="history-item">

                <p>
                    You ${type} ${stock}
                </p>

                <p class="history-amount">
                    ${price}€
                </p>

            </div>
        `;
    })
    document.querySelector('.js-history').innerHTML = historyHTML;
}

function saveData() {
    localStorage.setItem('cashSaved', cash);
    localStorage.setItem('stocksSaved', JSON.stringify(stocks));
    localStorage.setItem('historySaved', JSON.stringify(history));
}

function loadData() {
    const cashSaved = localStorage.getItem('cashSaved');
    const stocksSaved = JSON.parse(localStorage.getItem('stocksSaved'));
    const historySaved = JSON.parse(localStorage.getItem('historySaved'));

    if (cashSaved !== null) {
        cash = Number(cashSaved);
    }

    if (stocksSaved !== null) {
        stocks = stocksSaved;
    }

    if (historySaved !== null) {
        history = historySaved;
    }
    
    renderStocks();
    renderHistory();
}

loadData();










