let nums = [];
for (let i=0 ; i<100 ; i++){
    nums.push(parseInt(Math.random() * 1000));
}
nums = nums.slice(5,-5);
nums.sort((a,b) => a-b);

let table = '<table>';
let cont = 0;
for (let i = 0 ; i < 10 ; i++){
    table += '<tr>';
    for (let j = 0 ; j < 10 ; j++){
        if (cont < nums.length){
            table += `<td>${ nums[cont] }</td>`;
            cont++;
        }
    }
    table += '</tr>';
}
table += '</table>';
document.body.innerHTML = table;