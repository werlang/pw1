import { request } from './utils.js';

// async function main() {
//     const data = await request(`getusers.php`, { user: 1 });
//     console.log(data);
// }
// main();

request(`getusers.php`, { user: 1 }).then( data => {
    console.log(data)
})
