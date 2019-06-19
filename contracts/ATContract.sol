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
  function addOwner(string memory oname) public {
     totalHouses++;
     housenodes[totalHouses] = houseNode(totalHouses,oname,0,"","");
  }
  function registerMaintenance(uint id,string memory hid,uint month,uint year,uint amnt) public{
    //Todo: Need to check that the house has not done its payment
    maintenance[id].push(houseMaint(hid,month,year,amnt));
  }
  constructor() public {
      addOwner("APJAbdulKalam");
      addOwner("Tesla");
  }
}
