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

learn_extensions.mapLearn = (list, iteratee, context) => {
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

learn_extensions.reduceLearn = (list, iteratee, memo, context) => {
    let iterator = learn_extensions.getIterator(list);
    
    let current = iterator.next();
    // если memo не задано - присваиваем ей значение первого элемента
    if (memo == undefined) {
        memo = current.value[1];
    }

    while (!current.done) {
        if(context !== undefined){
            iteratee = iteratee.bind(context);
        }

        let currentKey = current.value[0];
        let currentValue = current.value[1];

        memo = iteratee(memo, currentValue, currentKey, list);

        current = iterator.next();
    }

    return memo;
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

let stringReduceCollection = (memo, value, key, list) => {
    if (!(memo instanceof String)) {
        let valueForAppend = ` (key: ${String(key)}, value: ${String(value)}) `;
        memo += valueForAppend;
    }
    return memo;
};

// learn_extensions.mapLearn(map, logCollection);
// learn_extensions.mapLearn(arr, logCollection);
// learn_extensions.mapLearn(set, logCollection);
// learn_extensions.mapLearn(obj, logCollection);

let testCollections = [
    map,
    arr,
    set,
    obj,
];

testCollections.forEach(list => {
    console.log(learn_extensions.reduceLearn(list, stringReduceCollection, 'memo'));
});

testCollections.forEach(list => {
    console.log(learn_extensions.reduceLearn(list, stringReduceCollection));
});