// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

/**
 * @notice The Ownable contract has an owner address, and provides basic
 * authorization control functions
 * @dev Forked from https://github.com/OpenZeppelin/openzeppelin-labs/blob/3887ab77b8adafba4a26ace002f3a684c1a3388b/upgradeability_ownership/contracts/ownership/Ownable.sol
 * Modifications:
 * 1. Consolidate OwnableStorage into this contract (7/13/18)
 * 2. Reformat, conform to Solidity 0.6 syntax, and add error messages (5/13/20)
 * 3. Make public functions external (5/27/20)
 */
contract Ownable {
    error Ownable__CallerIsNotTheOwner();

    // Owner of the contract
    address private _owner;

    /**
     * @dev Event to show ownership has been transferred
     * @param previousOwner representing the address of the previous owner
     * @param newOwner representing the address of the new owner
     */
    event OwnershipTransferred(address previousOwner, address newOwner);

    /**
     * @dev The constructor sets the original owner of the contract to the sender account.
     */
    constructor() {
        setOwner(msg.sender);
    }

    /**
     * @dev Tells the address of the owner
     * @return the address of the owner
     */
    function owner() external view returns (address) {
        return _owner;
    }

    /**
     * @dev Sets a new owner address
     */
    function setOwner(address newOwner) internal {
        _owner = newOwner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        if (msg.sender != _owner) revert Ownable__CallerIsNotTheOwner();
        // require(msg.sender == _owner, "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param newOwner The address to transfer ownership to.
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        setOwner(newOwner);
    }
}
