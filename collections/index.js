"use strict"

let learn_extensions = new Object;

learn_extensions.getIterator = (subject) => {
    switch (subject.constructor.name) {
        case Map.name:
        case Array.name:
        case Set.name:
            return subject.entries();
        default:
            let objAsArray = Object.entries(subject);
            return objAsArray[Symbol.iterator]();
    }
};

learn_extensions.map = (list, iteratee, context) => {
    let iterator = learn_extensions.getIterator(list);
    let newArray = [];

    let current = iterator.next();
    while (!current.done) {
        if(context){
            iteratee = iteratee.bind(context);
        }

        let currentKey = current.value[0];
        let currentValue = current.value[1];
        let newValue = iteratee(currentValue, currentKey, list);
        newArray.push(newValue);

        current = iterator.next();
    }
};

let map = new Map(
    [
        [1, 2], 
        [5, 2],
    ]);
let arr = [1, 2 ,3];
let set = new Set([3, 3, 4, 1 ,3 ,4, 4]);
let obj = {
    "1": 12,
    "4": 15
};

let logCollection = (value, key, list) => {
    console.log('');
    console.log('type: ', list.constructor.name);
    console.log('key: ', key);
    console.log('value: ', value);
    console.log('');
};

learn_extensions.map(map, logCollection);
learn_extensions.map(arr, logCollection);
learn_extensions.map(set, logCollection);
learn_extensions.map(obj, logCollection);