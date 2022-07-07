const nums = [];
let soma = 0;
const qtd = parseInt(prompt('Quantos valores deseja informar?'));
for (let i=0 ; i < qtd ; i++){
    nums[i] = parseInt(prompt('Informe um número'));
    soma = soma + nums[i];
}
const media = soma / qtd;

for (let i=0 ; i < qtd ; i++){
    nums[i] = nums[i] - media;
}
console.log(`Desvio: ${nums}`);