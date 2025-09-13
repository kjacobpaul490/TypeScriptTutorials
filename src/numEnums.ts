import promptSync from 'prompt-sync';


const prompt = promptSync();

enum months {
    jan = 1,
    feb = 2,
    mar = 3,
    aprl = 4,
    may = 5,
    june = 6,
    july = 7,
    aug = 8,
    sept = 9,
    oct = 10,
    nov = 11,
    dec = 12
}
function getMothnNumber(_months: months) {
    switch (_months) {
        case months.jan:
            return _months;
        case months.feb:
            return _months;
        case months.mar:
            return _months;
        case months.aprl:
            return _months;
        default:
            return " only months up tp april ";
    }
}
var inputMonth: months = months[prompt("Enter your Category: ") as keyof typeof months];
console.log(getMothnNumber(inputMonth));

// give string enums as assignment 