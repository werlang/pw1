let nums = [];
for (let i=0 ; i<100 ; i++){
    nums.push(parseInt(Math.random() * 1000));
}
nums = nums.slice(5,-5);
nums.sort((a,b) => a-b);

let cont = 0;
let table = document.createElement('table');
for (let i = 0 ; i < 9 ; i++){
    let tr = document.createElement('tr');
    for (let j = 0 ; j < 10 ; j++){
        let td = document.createElement('td');
        if (cont < nums.length){
            td.innerHTML = nums[cont];
            cont++;
        }
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
document.body.appendChild(table);