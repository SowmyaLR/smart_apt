pragma solidity ^0.5.0;

contract ATContract{
//Need to change datatype of HID as address in future
address[] public houseAddress;
  struct houseNode{
     address houseId;//need to change this to adddress
     string ownerName;
     uint haveTenant;
     string tenantName;
     string digitalDocNo;
  }
  mapping(address => houseNode) public housenodes;
  uint public totalHouses;
  struct houseMaint{
     address hID;//address
     uint month;
     uint year;
     uint amountPaid;
     uint approved;
  }
  //here uint has to be changed to address
  mapping(address => houseMaint[]) public maintenance;
  //Here also uint needs to be changed to address
  mapping(address => uint) public totalMaint;
  uint public adminCount;
  struct adminExpenses{
     address adminId;
     uint category1;
     uint category2;
     uint category3;
     uint category4;
     uint month;
     uint year;
  }
  mapping(address => adminExpenses[]) public adminexp;
  function registerAdminExpense(address hId,uint cat1,uint cat2,uint cat3,uint cat4,uint month,uint year) public{
      adminexp[hId].push(adminExpenses(hId,cat1,cat2,cat3,cat4,month,year));
      adminCount++;
  }

  function addOwner(string memory oname,address hId) public {
     totalHouses++;
     housenodes[hId] = houseNode(hId,oname,0,"","");
  }
  function registerMaintenance(address id,uint month,uint year,uint amnt) public{
    //Todo: Need to check that the house has not done its payment
    maintenance[id].push(houseMaint(id,month,year,amnt,0));
    totalMaint[id]++;
  }
  function sumIndividualHouseMaint(address hId) public returns (uint res){
     uint totalSum = 0;
     for(uint loop=0;loop<totalMaint[hId];loop++){
       totalSum = totalSum + maintenance[hId][loop].amountPaid;
     }

     return totalSum;
  }
  function approveMaintenance(address houseId,uint month,uint year) public returns (uint res){
      uint loop = 0;
    //  for(loop=0;loop<totalMaint[houseId];loop++){
          if(maintenance[houseId][loop].month==month&&maintenance[houseId][loop].year==year){
            maintenance[houseId][loop].approved = 1;
            return 1;
          }
    //  }
      return 0;
  }
  function getMaintenanceStatus(address hID,uint month,uint year) public returns (uint res){
  uint loop = 0;
  for(loop=0;loop<totalMaint[hID];loop++){
      if(maintenance[hID][loop].month<=month&&maintenance[hID][loop].year<=year&&
      maintenance[hID][loop].approved==1){
              return 1;//got approved
      }
  }
  return 0;//need to approval or not yet paid
  }
  constructor() public {
      addOwner("APJAbdulKalam",0xE033d9b9FF9e62C65e63A3064B6118194676aD22);
      addOwner("Tesla",0x16D34680dc5c4A04DED5f784e41809AC09fc8370);
  }
}
