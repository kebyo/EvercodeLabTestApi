function checkName(name) {
    const nameRegExp = /^[A-Za-z0-9]{1,20}$/;

    return nameRegExp.test(name);
}

function checkTicker(ticker) {
    const tickerRegExp = /^[A-Za-z0-9]{3,5}$/;

    return tickerRegExp.test(ticker);
}

async function update(currencies) {
    const form = document.getElementById('updateForm');

    let hasErrors = false;

    for (let i = 0; i < form.length; i+=2) {
        const updatedCur = {
            id: form[i].id,
            name: form[i].value,
            ticker: form[i+1].value,
        };

        const isNormName = checkName(updatedCur.name);
        const isNormTicker = checkTicker(updatedCur.ticker);

        if (!isNormName) {
            const errorElem = document.getElementById(`nameError${updatedCur.id}`);

            errorElem.textContent = 'name should be have length 1-20 and have only numbers or latin';
            errorElem.style.color = 'red';
        }

        if (!isNormTicker) {
            const errorElem = document.getElementById(`tickerError${updatedCur.id}`);

            errorElem.textContent = 'ticker should be have length 3-5 and have only numbers or latin';
            errorElem.style.color = 'red';
        }

        const isNormNameAndTicker = isNormTicker && isNormName;
        hasErrors = !isNormNameAndTicker;

        if (isNormNameAndTicker) {
            const res = await fetch(`http://localhost:3000/currency/${updatedCur.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PATCH',
                body: JSON.stringify({
                    currency: {
                        name: updatedCur.name,
                        ticker: updatedCur.ticker,
                    },
                }),
            });

            if (!res.ok) {
                const body = JSON.parse(await res.text());

                document.getElementById('errors').textContent = body.error;
                document.getElementById('errors').style.color = 'red';
            }

            hasErrors = !res.ok;
        }
    }
}