import promptSync from 'prompt-sync';


const prompt = promptSync();
//** default enum  */
enum ageCategory {
    Child,
    Teenager,
    Adult,
    Senior
  };
/**
 * 
 * @param _ageCategory 
 * @returns 
 */
function getCategoryDetails( _ageCategory:ageCategory) {
    debugger;
    switch (_ageCategory) {
        case ageCategory.Child:
            return "The age is between 0 and 12 " + _ageCategory;
        case ageCategory.Teenager:
            return "The age is between 13 and 19 "+_ageCategory;
        case ageCategory.Adult:
            return "The age is between 20 and 60 " +_ageCategory;
        case ageCategory.Senior:
            return "The age is above 60 " +_ageCategory;
        default:
            return "Invalid age";
    }
}    

var inputCategory: ageCategory = ageCategory[prompt("Enter your Category: ") as keyof typeof ageCategory];
console.log(getCategoryDetails(inputCategory));


