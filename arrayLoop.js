const array = [1, 2, 3, 4, 5];
array.forEach(element => {
    console.log(element);
})

const newArray = array.map(element => element * 2);
console.log(newArray)

const filteredArray = array.filter(element => element > 1);
console.log(filteredArray)