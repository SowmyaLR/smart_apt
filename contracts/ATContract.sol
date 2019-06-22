pragma solidity ^0.5.0;

contract ATContract{
//Need to change datatype of HID as address in future
address[] public houseAddress;
uint[] public transactIds;
uint public currentLedger;
uint public maintenanceAmount;
uint public adminAmount;
struct ATLedger{
   uint availableAmount;
   uint maintAmount;
   uint adminExp;
   bool isValue;
}
mapping(uint=>ATLedger) public atledger;
function getMonthlyLedger(uint transactId) public returns (uint,uint,uint){
   if(atledger[transactId].isValue){
     return (atledger[transactId].availableAmount,atledger[transactId].maintAmount,atledger[transactId].adminExp);
   }else{
      atledger[transactId] = ATLedger(currentLedger+maintenanceAmount,maintenanceAmount,adminAmount,true);
      currentLedger = currentLedger + maintenanceAmount;
      maintenanceAmount = 0;
      adminAmount = 0;
      return (atledger[transactId].availableAmount,atledger[transactId].maintAmount,atledger[transactId].adminExp);
   }
}
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
  mapping(uint => houseMaint) public maintenance;//transaction id
  mapping(uint => houseMaint) public summaryData;
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
      adminAmount = adminAmount + (cat1+cat2+cat3+cat4);
      adminCount++;
  }
  function getCurrentATLedger(uint month,uint year,address adminId) public returns(uint,uint){
    uint loop;
    for(loop=0;loop<adminCount;loop++){
       if(adminexp[adminId][loop].month<=month&&adminexp[adminId][loop].year<=year){
       uint adminExp = adminexp[adminId][loop].category1+adminexp[adminId][loop].category2
       +adminexp[adminId][loop].category3+adminexp[adminId][loop].category4;
          return (currentLedger,adminExp);
       }
    }
  }
  function addOwner(string memory oname,address hId) public {
     totalHouses++;
     housenodes[hId] = houseNode(hId,oname,0,"","");
  }
  function registerMaintenance(uint transId,uint month,uint year,uint amnt) public{
    //Todo: Need to check that the house has not done its payment
    maintenance[transId] = houseMaint(msg.sender,month,year,amnt,0);
    transactIds.push(transId);
    totalMaint[msg.sender]++;
  }
  function sumIndividualHouseMaint(uint transactionId) public returns (uint res){
     uint totalSum = 0;

       totalSum = totalSum + maintenance[transactionId].amountPaid;
       return totalSum;
  }
  function approveMaintenance(uint transId,uint month,uint year) public returns (uint res){
          if(maintenance[transId].month==month&&maintenance[transId].year==year){
            maintenance[transId].approved = 1;
            summaryData[transId] = maintenance[transId];
            maintenanceAmount = maintenanceAmount + maintenance[transId].amountPaid;
            delete maintenance[transId];
            return 1;
          }
      return 0;
  }
  function returnApprovalData() public returns(uint[] memory res2){
  //  uint[] memory houseId;
    uint[] memory amount;
    for(uint ind=0;ind<transactIds.length;ind++){
       //houseId[ind] = (summaryData[transactIds[ind]].hID);
       amount[ind] = (summaryData[transactIds[ind]].amountPaid);
    }
    return (amount);
  }
  function getMaintenanceStatus(uint transId,uint month,uint year) public returns (uint res){

      if(summaryData[transId].month<=month&&summaryData[transId].year<=year&&
      summaryData[transId].approved==1){
              return 1;//got approved
      }

  return 0;//need to approval or not yet paid
  }
  constructor() public {
      addOwner("APJAbdulKalam",0xE033d9b9FF9e62C65e63A3064B6118194676aD22);
      addOwner("Tesla",0x16D34680dc5c4A04DED5f784e41809AC09fc8370);
  }
}
