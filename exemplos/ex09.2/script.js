import { post } from './utils.js';

document.querySelector('button').addEventListener('click', async () => {
    const input1 = document.querySelector('#input1');
    const input2 = document.querySelector('#input2');
    
    const resp = await post('aula.php', {
        var1: input1.value,
        var2: input2.value,
    });
    console.log(resp);
})