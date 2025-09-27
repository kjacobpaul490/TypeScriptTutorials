import promptSync from 'prompt-sync';

const prompt = promptSync();

const weight: number = Number(prompt("Enter the weight in kgs: "));
const height: number = Number(prompt("Enter the height in meters: "));

// BMICal is now a higher-order function
const BMICal = () => {
    return (_weight: number, _height: number): number => {
        return _weight / (_height * _height);
    };
};

const BMICatogery = (_weight: number, _height: number): string => {
    const calculateBMI = BMICal(); // get the BMI calculation function
    const _bMICal = calculateBMI(_weight, _height);

    let result: string = "";

    switch (true) {
        case _bMICal < 18:
            result = "Under weight";
            break;
        case _bMICal >= 18 && _bMICal < 25:
            result = "Normal weight";
            break;
        case _bMICal >= 25 && _bMICal < 30:
            result = "Overweight";
            break;
        default:
            result = "Obese";
            break;
    }

    return result;
};

console.log(
    weight > 0 && height > 0
        ? BMICatogery(weight, height)
        : "Invalid Height or Weight, must be > 0"
);
