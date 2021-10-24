// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Inbox {
    string public message;

    constructor(string memory initialMessage) {
        message = initialMessage;
    }

    function setMessage(string calldata newMessage) public {
        message = newMessage;
    }

    // function getMessage() public view returns (string memory) {
    //     return message;
    // }
}
