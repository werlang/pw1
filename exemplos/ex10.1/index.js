async function main() {
    const id = 1;
    const res = await fetch(`getusers.php?user=${ id }`);
    const data = await res.json();
    console.log(data);
}
main();