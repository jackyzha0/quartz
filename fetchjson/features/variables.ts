let apples: number = 5;
let speed: string = 'fast';
let hasName: boolean = true;
let applesInference = 5;
let applesAnnotation: number = 5;

let nothing: null = null;
let nothingu: undefined = undefined;

// Built in objects
let now: Date = new Date();

// Array that only contains strings
let colours: string[] = ['red', 'green', 'blue'];
let myNumbers: number[] = [1, 2, 3];
let statements: boolean[] = [true, false, true];

// Classes with type annoations
class Car {

}
let car: Car = new Car();

// Object literal with type annoations
let point: { x: number; y: number; } = {
    x: 10,
    y: 20
}

// Function with type annoations
const logNumber: (i: number) => void = (i: number) => {
    console.log(i);
}

// Json annotations
const json = '{"x": 10, "y": 20}';
const coordinates: { x: number; y: number } = JSON.parse(json);
console.log(coordinates);

// Anotation for declaring and later initializing variables
let words = ['red', 'green', 'blue'];
let foundWord: boolean;

for (let i = 0; i < words.length; i++) {
    if (words[i] === 'green') {
        foundWord = true;
    }
}

// Non-inferrable variable
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > 0) {
        numberAboveZero = numbers[i];
    }
}