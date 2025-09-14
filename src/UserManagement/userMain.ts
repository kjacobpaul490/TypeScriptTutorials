import promptSync from 'prompt-sync';


const prompt = promptSync();

enum role {
    Intern,
    SoftwareEngineer,
    SrSoftwareEngineer,
    TeamLeader,
    ProjectManager,
    StakeHolder
};

type GroupInfo = {
    id: number,
    groupName: string,
    groupDesc: string,
    roles: number[]
}

interface IUserDetail {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    assignedGroup: GroupInfo

}

// var GroupDetails: GroupInfo[]
var groupCount: number = 0;
var userCount: number = 0;
var _groupName: string = prompt("Enter Group Name: ")
var _groupDesc: string = prompt("Enter Group Description: ")
var _roles: number[] = [];

readRoles();
var _groupInfo: GroupInfo = { id: groupCount + 1, groupName: _groupName, groupDesc: _groupDesc, roles: _roles };

var _firstName: string = prompt("Enter First Name: ")
var _lastName: string = prompt("Enter Last Name: ")
var _email: string = prompt("Enter Email: ")
var _phone: string = prompt("Enter Phone: ")


var userDetails:IUserDetail[]=[]
var _userDetail:IUserDetail={id:userCount+1,firstName:_firstName,lastName:_lastName,email:_email,phone:_phone,assignedGroup:_groupInfo};
userDetails.push(_userDetail);
console.log(JSON.stringify(userDetails));

function readRoles() {

    try {
        var inputrole: role = role[prompt("Enter your role: ") as keyof typeof role];
        if (inputrole >= 0) {

            _roles.push(inputrole);
            readRoles();
        }
        else {
            return false;

        }
        return _roles;

    } catch (ex) {
        return false;
    }
}

// function createGroup(groupInfo: GroupInfo) {

// }


