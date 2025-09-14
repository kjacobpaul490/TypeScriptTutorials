

function indiaAddressDetails(district: string, state: string = 'AP', pincode?: string): string {
    if (pincode)
        return `The test are in ${district},${state},${pincode}`;
    else
        return `The test are in ${district},${state}`;


}
console.log(indiaAddressDetails("Eluru", "AP", "5223222"));
console.log(indiaAddressDetails("Eluru", "AP"));
console.log(indiaAddressDetails("Eluru", "45645"));