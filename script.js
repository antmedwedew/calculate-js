//arr roman numbers
const digits = {
    Z: 2000,
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
}

// function num.trim()
const numTrim = (string, regExp) => {
    return string.split(regExp).map(num => num.trim())
}

// validation string to symbols and operators
const stringValidation = string => {
    let pattern = /[^IVX0-9+*\/-\s]/g

    if([...string.matchAll(pattern)].length >= 1) {
        throw new Error('Вы ввели некоректные символы')
    }
    pattern = /[+*\/-]{2,}/g
    if([...string.matchAll(pattern)].length >= 1) {
        throw new Error('Вы ввели некоректные символы, в строке более 1 оператора для вычислени')
    }
    return true
}

// filter operation in string
const getOperation = string => {
    return [...string.match(/[+*\/-]/g)][0]
}

// filter nums in string
const getNums = string => {
    return numTrim(string, /[+*\/-]/g)
}

// translation from Roman to Arabic
const RomanToArabic = string => {
    debugger
    return string.split('').reduce((prevVal, currValue, i, arr) => {
        const [a, b, c] = [
            digits[arr[i]],
            digits[arr[i + 1]],
            digits[arr[i + 2]]
        ]
        return b > a ? prevVal - a : prevVal + a
    }, 0) 
}

// validation Roman numbers
const isRoman = string => {
    const pattern = /^[IVX]+$/
    let arrNums = numTrim(string, /[+*\/-]/g)
    const countRoman = arrNums.reduce((prevVal, currValue) => prevVal + pattern.test(currValue), 0)
    if (countRoman === 1) {
        throw new Error('Вы ввели некоректные символы, введите 2 римских числа')
    } else if (countRoman === 2) {
        return true
    }
}

// check operation in string
const checkOperation = (operation, nums) => {
    let result;
    if(operation === '+') {
        result = sum(nums)
    } else if (operation === '*') {
        result = mult(nums)
    } else if (operation === '/') {
        result = division(nums)
    } else if (operation === '-') {
        result = subtraction(nums)
    }
    return Math.floor(result)
}

// function summ
const sum = nums => {
    return nums.reduce((a, b) => a + b)
}

// function mult 
const mult = nums => {
    return nums.reduce((a, b) => a * b)
}

// function division
const division = nums => {
    return nums.reduce((a, b) => a / b)
}
 
// function subtraction
const subtraction = nums => {
    return nums.reduce((a, b) => a - b)
}

// the main function calculate
const calculator = string => {
   const isValid = stringValidation(string)
   const operation = getOperation(string)
   let nums = getNums(string)
   const roman = isRoman(string)
   if (roman) {
       nums = nums.map(num => RomanToArabic(num))
   }
   nums = nums.map(num => +num)
   return checkOperation(operation, nums)
}

// input string in calculate
console.log(calculator('10 + 10'));
console.log(calculator('19 - 9'));
console.log(calculator('5 * 5'));
console.log(calculator('10 / 4'));
console.log(calculator('V + VI'));
console.log(calculator('XX - IX'));
console.log(calculator('V * V'));
console.log(calculator('X / IV'));