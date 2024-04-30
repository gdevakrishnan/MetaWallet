// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;
contract MetaWallet{
    // Structure for history
    struct TransferHistory {
        address SenderAddress;
        address RecieverAddress;
        uint Amount;
    }

    mapping(address => TransferHistory[]) private History;

    //write
    function sendEthUser(address payable _reciever) public payable{
        require(msg.value > 0, "Please give minimum value of amount");
        bool sent = _reciever.send(msg.value);
        require(sent, "Failed to send Ether");
        History[msg.sender].push(TransferHistory(msg.sender, _reciever, msg.value));
    }

    //read
    function accountBalance() public view returns(uint){
        return (msg.sender).balance;
    }

    // read
    function getHistory() public view returns(TransferHistory[] memory) {
        return History[msg.sender];
    }
}

// 0x7303c63a2230f87268C20B94628E7c6FFBdc15e7