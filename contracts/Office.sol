// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Office{

address public admin;
uint public totalUsers=0;
mapping (address=>string) public roles;
mapping(uint=>UserInfo ) public users;
mapping(address=>UserInfo) public getUserInfo;

struct UserInfo{
string name;
string email;
string phno;
string role;
string salary;
}

constructor() public{
    admin=msg.sender;
}

function updateSal() public{


}

function addUser(string memory _n, string memory _e, string memory _p,string memory _r,string memory _s) public {
    totalUsers++;
    roles[msg.sender] = _r;
    users[totalUsers]=UserInfo(_n,_e,_p,_r,_s);
    getUserInfo[msg.sender]=UserInfo(_n,_e,_p,_r,_s);
}

}