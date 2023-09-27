async function main() {
    const data = await fetch(`getusers.php?user=${ id }`).then(res => res.json());
    console.log(data);
}
main();