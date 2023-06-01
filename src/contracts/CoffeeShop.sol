//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import './CoffeeToken.sol';

contract CoffeeShop{
    string public name = "My Shop";
    CoffeeToken public token;
    address public owner;

    event BuyItem(address indexed account,uint itemid,uint amount,string token);
    event newAsset(uint id,uint price);
    event itemRemoved(uint id);

    constructor(CoffeeToken _token){
        token = _token;
        owner = msg.sender;
    }
    struct cafeItem{
        string Name;
        uint ETHPrice;
        uint CLTPrice;
        string src;
        bool exist;
    }

    mapping(uint =>cafeItem) public item;

    uint[] ids;

    //add item
    function addItem(uint _id,string memory _Name, uint _ethprice,uint _cltprice,string memory _src) public {
        require(msg.sender==owner,"No previlage for adding Item");
        require(item[_id].exist==false,"Already exists");

        item[_id] = cafeItem({
            Name: _Name,
            ETHPrice : _ethprice,
            CLTPrice : _cltprice,
            src : _src,
            exist : true
        });
        ids.push(_id);
        emit newAsset(_id,_ethprice);
    }

    //remove item
    function removeItem(uint _id) public {
    require(msg.sender == owner, "No privilege for removing Item");
    require(item[_id].exist == true, "Item does not exist");

    // Remove the item from the mapping
    delete item[_id];

    // Find and remove the item ID from the array
    for (uint i = 0; i < ids.length; i++) {
        if (ids[i] == _id) {
            ids[i] = ids[ids.length - 1];

            ids.pop();
            break;
        }
    }
    emit itemRemoved(_id);
}

    //Buy Coffee With ETH token
    function bCWETH(uint _id) public payable{ 
        uint tokenAmount = 1000000000000000000;
        require(item[_id].exist == true,"Item does not exists");
        require(msg.value == item[_id].ETHPrice,"Incorrect amount of Ether sent");
        require(token.balanceOf(address(this))>= tokenAmount);

        payable(owner).transfer(msg.value);

        token.transfer(msg.sender,tokenAmount);
        emit BuyItem(msg.sender,_id,item[_id].ETHPrice,"ETH");
    }

    function bCWCLT(uint _id) public payable{
        require(item[_id].exist== true,"Item does not exists");
        uint tokenAmount = item[_id].CLTPrice;
        require(token.balanceOf(msg.sender)>= tokenAmount);
        
        token.transferFrom(msg.sender, address(this), tokenAmount);
        emit BuyItem(msg.sender,_id,tokenAmount,"CLT");
    }

    function getUserBalance(address _user) public view returns(uint){
        return token.balanceOf(_user);
    }

    function getItemIds() public view returns(uint[] memory){
        return ids;
    }
    function getItemInfo(uint _id) public view returns(cafeItem memory){
        return item[_id];
    }
    function getContractOwner() public view returns(address){
        return owner;
    }
}