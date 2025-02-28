let comida = JSON.parse(window.localStorage.getItem('comida'));
if (comida === undefined || comida === null) {
    comida = [];
    window.localStorage.setItem('comida', JSON.stringify(comida));
}

const main = document.querySelector('main');
comida.forEach(item => {
    const card = document.createElement('div');
    card.innerHTML = `
        <div>
            <h2>${item.nome}</h2>
            <button onclick="excluir(${item.id})">-</button>
        </div>
        <img src="${item.foto}" alt="Foto de ${item.nome}">
        <p>Preço: R$ ${item.preco.toFixed(2)}</p>
    `;
    main.appendChild(card);
});

function excluir(id) {
    if (confirm('Realmente quer excluir o card ' + id + ' ?')) {
        const indice = comida.findIndex(item => item.id === id);
        if (indice !== -1) {
            comida.splice(indice, 1);
            window.localStorage.setItem('comida', JSON.stringify(comida));
            window.location.reload();
        }
    }
}

const registrar = document.querySelector('#cadastro form');
registrar.addEventListener('submit', e => {
    e.preventDefault();
    const newComida = {
        id: comida.length + 1,
        nome: registrar.nome.value,
        preco: Number(registrar.preco.value),
        foto: registrar.foto.value
    };
    comida.push(newComida);
    window.localStorage.setItem('comida', JSON.stringify(comida));
    window.location.reload();
});