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
    console.log(list, iteratee, context);


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