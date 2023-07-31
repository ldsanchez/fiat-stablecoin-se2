// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "./Controller.sol";
import "./MinterManagementInterface.sol";

/**
 * @title MintController
 * @notice The MintController contract manages minters for a contract that
 * implements the MinterManagerInterface. It lets the owner designate certain
 * addresses as controllers, and these controllers then manage the
 * minters by adding and removing minters, as well as modifying their minting
 * allowance. A controller may manage exactly one minter, but the same minter
 * address may be managed by multiple controllers.
 * @dev MintController inherits from the Controller contract. It treats the
 * Controller workers as minters.
 */
contract MintController is Controller {
    // using SafeMath for uint256;

    /**
     * MinterManagementInterface
     * @notice MintController calls the minterManager to execute/record minter
     * management tasks, as well as to query the status of a minter address.
     */
    MinterManagementInterface internal minterManager;

    event MinterManagerSet(address indexed _oldMinterManager, address indexed _newMinterManager);
    event MinterConfigured(address indexed _msgSender, address indexed _minter, uint256 _allowance);
    event MinterRemoved(address indexed _msgSender, address indexed _minter);
    event MinterAllowanceIncremented(
        address indexed _msgSender, address indexed _minter, uint256 _increment, uint256 _newAllowance
    );

    event MinterAllowanceDecremented(
        address indexed msgSender, address indexed minter, uint256 decrement, uint256 newAllowance
    );

    /**
     * @notice Initializes the minterManager.
     * @param _minterManager The address of the minterManager contract.
     */
    constructor(address _minterManager) {
        minterManager = MinterManagementInterface(_minterManager);
    }

    /**
     * @notice gets the minterManager
     */
    function getMinterManager() external view returns (MinterManagementInterface) {
        return minterManager;
    }

    // onlyOwner functions

    /**
     * @notice Sets the minterManager.
     * @param _newMinterManager The address of the new minterManager contract.
     */
    function setMinterManager(address _newMinterManager) public onlyOwner {
        emit MinterManagerSet(address(minterManager), _newMinterManager);
        minterManager = MinterManagementInterface(_newMinterManager);
    }

    // onlyController functions

    /**
     * @notice Removes the controller's own minter.
     */
    function removeMinter() public onlyController returns (bool) {
        address minter = controllers[msg.sender];
        emit MinterRemoved(msg.sender, minter);
        return minterManager.removeMinter(minter);
    }

    /**
     * @notice Enables the minter and sets its allowance.
     * @param _newAllowance New allowance to be set for minter.
     */
    function configureMinter(uint256 _newAllowance) public onlyController returns (bool) {
        address minter = controllers[msg.sender];
        emit MinterConfigured(msg.sender, minter, _newAllowance);
        return internal_setMinterAllowance(minter, _newAllowance);
    }

    /**
     * @notice Increases the minter's allowance if and only if the minter is an
     * active minter.
     * @dev An minter is considered active if minterManager.isMinter(minter)
     * returns true.
     */
    function incrementMinterAllowance(uint256 _allowanceIncrement) public onlyController returns (bool) {
        require(_allowanceIncrement > 0, "Allowance increment must be greater than 0");
        address minter = controllers[msg.sender];
        require(minterManager.isMinter(minter), "Can only increment allowance for minters in minterManager");

        uint256 currentAllowance = minterManager.minterAllowance(minter);
        uint256 newAllowance = currentAllowance + _allowanceIncrement;

        emit MinterAllowanceIncremented(msg.sender, minter, _allowanceIncrement, newAllowance);

        return internal_setMinterAllowance(minter, newAllowance);
    }

    /**
     * @notice decreases the minter allowance if and only if the minter is
     * currently active. The controller can safely send a signed
     * decrementMinterAllowance() transaction to a minter and not worry
     * about it being used to undo a removeMinter() transaction.
     */
    function decrementMinterAllowance(uint256 _allowanceDecrement) public onlyController returns (bool) {
        require(_allowanceDecrement > 0, "Allowance decrement must be greater than 0");
        address minter = controllers[msg.sender];
        require(minterManager.isMinter(minter), "Can only decrement allowance for minters in minterManager");

        uint256 currentAllowance = minterManager.minterAllowance(minter);
        uint256 actualAllowanceDecrement =
            (currentAllowance > _allowanceDecrement ? _allowanceDecrement : currentAllowance);
        uint256 newAllowance = currentAllowance - actualAllowanceDecrement;

        emit MinterAllowanceDecremented(msg.sender, minter, actualAllowanceDecrement, newAllowance);

        return internal_setMinterAllowance(minter, newAllowance);
    }

    // Internal functions

    /**
     * @notice Uses the MinterManagementInterface to enable the minter and
     * set its allowance.
     * @param _minter Minter to set new allowance of.
     * @param _newAllowance New allowance to be set for minter.
     */
    function internal_setMinterAllowance(address _minter, uint256 _newAllowance) internal returns (bool) {
        return minterManager.configureMinter(_minter, _newAllowance);
    }
}
