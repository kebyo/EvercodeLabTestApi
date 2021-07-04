async function edit() {
    const elem = document.getElementById('search');

    if (!elem.value) {
        return window.location.replace(`http://127.0.0.1:3000/currency`);
    }

    window.location.replace(`http://127.0.0.1:3000/currency/?search=${elem.value}`);
}
