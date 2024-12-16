const container = document.querySelector('.image');
Array(9).fill().map((_, i) => i + 1).forEach(i => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.id = `image${i}`;
    input.classList.add('radio');
    input.name = 'propertyImage';
    input.value = `assets/images/property${i.toString().padStart(2, '0')}.jpg`;
    const label = document.createElement('label');
    label.setAttribute('for', `image${i}`);
    const img = document.createElement('img');
    img.src = `assets/images/property${i.toString().padStart(2, '0')}.jpg`;
    img.alt = `Image ${i}`;
    label.appendChild(img);
    container.appendChild(input);
    container.appendChild(label);
});