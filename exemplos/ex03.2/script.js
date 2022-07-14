const pessoa = {
    nome: 'Fulano',
    sobrenome: 'Silva',
    idade: 19,
    salario: 2345.67,
};
let str = '';
for (let key in pessoa) {
    const value = pessoa[key];
    str += `<div>
        <span>Chave: ${key}</span>
        <span>Valor: ${value}</span>
    </div>`;
}
document.body.innerHTML = str;