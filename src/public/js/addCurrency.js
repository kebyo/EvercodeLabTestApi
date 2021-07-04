function checkEmail(name) {
    const nameRegExp = /^[A-Za-z0-9]{1,20}$/;

    return nameRegExp.test(name);
}

function checkTicker(ticker) {
    const tickerRegExp = /^[A-Za-z0-9]{3,5}$/;

    return tickerRegExp.test(ticker);
}

async function addCurrency() {
    const name = document.getElementById('currencyName');
    const ticker = document.getElementById('currencyTicker');

    const isNormName = checkEmail(name.valie);
    const isNormTicker = checkTicker(ticker.value);

    if (!isNormName) {
        const errorElem = document.getElementById('nameError');

        errorElem.textContent = 'name should be have length 1-20 and have only numbers or latin';
        errorElem.style.color = 'red';
    }

    if (!isNormTicker) {
        const errorElem = document.getElementById('tickerError');

        errorElem.textContent = 'ticker should be have length 3-5 and have only numbers or latin';
        errorElem.style.color = 'red';
    }

    const isNormNameAndTicker = isNormTicker && isNormName;

    if (isNormNameAndTicker) {
        const res = await fetch('http://localhost:3000/currency', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                currency: {
                    name: name.value,
                    ticker: ticker.value,
                },
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            const error = data.error;

            const errorElem = document.getElementById('error');

            errorElem.textContent = error;
            errorElem.style.color = 'red';

            return;
        }

        window.location.replace(`http://127.0.0.1:3000/currency`);
    }
}
