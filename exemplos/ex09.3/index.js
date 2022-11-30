import { request } from './utils';

async function main() {
    const data = {
        var1: 10,
        var2: 20,
        varT: 'text'
    };
    
    // exemplo de chamada POST
    const respPost = await request('aula.php', data, 'POST');
    
    // exemplo de chamada GET
    const respGet = await request('aula.php', data);
}
main();