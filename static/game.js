async function updateData() {
    const response = await fetch('/update');
    const data = await response.json();
    document.getElementById('output').textContent = data.message;
}