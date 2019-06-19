pragma solidity ^0.5.0;
contract ATContract{
//Need to change datatype of HID as address in future
string[] public houseAddress;
  struct houseNode{
     uint houseId;
     string ownerName;
     uint haveTenant;
     string tenantName;
     string digitalDocNo;
  }
  mapping(uint => houseNode) public housenodes;
  uint public totalHouses;
  struct houseMaint{
     string hID;
     uint month;
     uint year;
     uint amountPaid;
  }
  //here uint has to be changed to address
  mapping(uint => houseMaint[]) public maintenance;
  //Here also uint needs to be changed to address
  mapping(uint => uint) public totalMaint;
  function addOwner(string memory oname) public {
     totalHouses++;
     housenodes[totalHouses] = houseNode(totalHouses,oname,0,"","");
  }
  function registerMaintenance(uint id,string memory hid,uint month,uint year,uint amnt) public{
    //Todo: Need to check that the house has not done its payment
    maintenance[id].push(houseMaint(hid,month,year,amnt));
    totalMaint[id]++;
  }
  function sumIndividualHouseMaint() public returns (uint res){
     uint totalSum = 0;
     for(uint loop=0;loop<totalMaint[0];loop++){
       totalSum = totalSum + maintenance[0][loop].amountPaid;
     }

     return totalSum;
  }
  constructor() public {
      addOwner("APJAbdulKalam");
      addOwner("Tesla");
  }
}
