let nums = [];
for (let i=0 ; i<100 ; i++){
    nums.push(parseInt(Math.random() * 1000));
}

nums = nums.slice(5,-5);

nums.sort((a,b) => a-b);

console.log(nums);