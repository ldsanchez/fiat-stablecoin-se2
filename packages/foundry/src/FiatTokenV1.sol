// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {AbstractFiatTokenV1} from "./AbstractFiatTokenV1.sol";
import {Ownable} from "./Ownable.sol";
import {Pausable} from "./Pausable.sol";
import {Blacklistable} from "./Blacklistable.sol";
import {Rescuable} from "./Rescuable.sol";

// V2
import {EIP712} from "./util/EIP712.sol";
import {EIP712Domain} from "./util/EIP712Domain.sol";
import {EIP3009} from "./EIP3009.sol";
import {EIP2612} from "./EIP2612.sol";

/**
 * @notice Base contract which allows to create a token backed by fiat reserves
 * @dev Forked from https://github.com/centrehq/centre-tokens/tree/master
 * Modifications:
 * 1. Flatening of the base contracts
 * 2. Remove requires for errors
 * 3. Created Getter for storage variables
 * 4. Change naming conventions
 */

/**
 * @title FiatToken
 * @dev ERC20 Token backed by fiat reserves
 */

contract FiatTokenV1 is AbstractFiatTokenV1, Ownable, Pausable, Blacklistable, Rescuable, EIP3009, EIP2612 {
    ////////////////////
    // Errors //////////
    ////////////////////

    error FiatTokenV1__TokenAlreadyInitialized();
    error FiatTokenV1__MasterMinterMustBeNonZeroAddress();
    error FiatTokenV1__PauserMustBeNonZeroAddress();
    error FiatTokenV1__BlacklisterMustBeNonZeroAddress();
    error FiatTokenV1__OwnerMustBeNonZeroAddress();
    error FiatTokenV1__NotAMinter();
    error FiatTokenV1__RecipientMustBeNonZeroAddress();
    error FiatTokenV1__AmountMustBeGreaterThanZero();
    error FiatTokenV1__AmountExceedsMinterAllowance();
    error FiatTokenV1__CallerNotMasterMinter();
    error FiatTokenV1__ERC20OwnerMustBeNonZeroAddress();
    error FiatTokenV1__ERC20SpenderMustBeNonZeroAddress();
    error FiatTokenV1__ERC20AmountExceedsAllowance();
    error FiatTokenV1__ERC20SenderCannotBeZeroAddress();
    error FiatTokenV1__ERC20RecipientCannotBeZeroAddress();
    error FiatTokenV1__ERC20InsufficientFunds();
    error FiatTokenV1__BurnAmountNotGreaterThanZero();
    error FiatTokenV1__BurnAmountExceedsBalance(uint256 balance, uint256 amount);

    string public s_tokenName;
    string public s_tokenSymbol;
    uint8 public s_tokenDecimals;
    string public s_tokenCurrency;
    address public s_masterMinter;
    bool internal s_isInitialized;
    uint8 internal _initializedVersion; // V2

    mapping(address => uint256) internal s_balances;
    mapping(address => mapping(address => uint256)) internal s_allowed;
    uint256 internal s_totalSupply = 0;
    mapping(address => bool) internal s_isMinter;
    mapping(address => uint256) internal s_minterAllowed;

    event TokenInitialized(
        string indexed name,
        string symbol,
        string currency,
        uint8 decimals,
        address indexed owner,
        address masterMinter,
        address pauser,
        address blacklister
    );
    event Mint(address indexed minter, address indexed to, uint256 amount);
    event Burn(address indexed burner, uint256 amount);
    event MinterConfigured(address indexed minter, uint256 minterAllowedAmount);
    event MinterRemoved(address indexed oldMinter);
    event MasterMinterChanged(address indexed newMasterMinter);

    // /**
    //  * @notice Initialize v2
    //  * @param newName   New token name
    //  */
    // function initializeV2(string calldata newName) external {
    //     // solhint-disable-next-line reason-string
    //     require(initialized && _initializedVersion == 0);
    //     name = newName;
    //     DOMAIN_SEPARATOR = EIP712.makeDomainSeparator(newName, "2");
    //     _initializedVersion = 1;
    // }

    function initializeToken(
        string memory tokenName,
        string memory tokenSymbol,
        string memory tokenCurrency,
        uint8 tokenDecimals,
        address newMasterMinter,
        address newPauser,
        address newBlacklister,
        address newOwner
    ) public {
        if (s_isInitialized) {
            revert FiatTokenV1__TokenAlreadyInitialized();
        }
        if (newMasterMinter == address(0)) {
            revert FiatTokenV1__MasterMinterMustBeNonZeroAddress();
        }
        if (newPauser == address(0)) {
            revert FiatTokenV1__PauserMustBeNonZeroAddress();
        }
        if (newBlacklister == address(0)) {
            revert FiatTokenV1__BlacklisterMustBeNonZeroAddress();
        }
        if (newOwner == address(0)) {
            revert FiatTokenV1__OwnerMustBeNonZeroAddress();
        }

        s_tokenName = tokenName;
        s_tokenSymbol = tokenSymbol;
        s_tokenCurrency = tokenCurrency;
        s_tokenDecimals = tokenDecimals;
        s_masterMinter = newMasterMinter;
        pauser = newPauser;
        blacklister = newBlacklister;
        setOwner(newOwner);
        s_isInitialized = true;
        _initializedVersion = 1; // V2
        DOMAIN_SEPARATOR = EIP712.makeDomainSeparator(s_tokenName, "1"); // V2
        emit TokenInitialized(
            tokenName, tokenSymbol, tokenCurrency, tokenDecimals, newOwner, newMasterMinter, newPauser, newBlacklister
        );
    }

    /**
     * @dev Throws if called by any account other than a minter
     */
    modifier onlyMinters() {
        if (!s_isMinter[msg.sender]) {
            revert FiatTokenV1__NotAMinter();
        }
        _;
    }

    /**
     * @dev Function to mint tokens
     * @param _to The address that will receive the minted tokens.
     * @param _amount The amount of tokens to mint. Must be less than or equal
     * to the minterAllowance of the caller.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(
        address _to,
        uint256 _amount // Mint
    ) external whenNotPaused onlyMinters notBlacklisted(msg.sender) notBlacklisted(_to) returns (bool) {
        if (_to == address(0)) {
            revert FiatTokenV1__RecipientMustBeNonZeroAddress();
        }
        if (_amount <= 0) {
            revert FiatTokenV1__AmountMustBeGreaterThanZero();
        }
        uint256 mintingAllowedAmount = s_minterAllowed[msg.sender];
        if (_amount > mintingAllowedAmount) {
            revert FiatTokenV1__AmountExceedsMinterAllowance();
        }

        s_totalSupply = s_totalSupply + _amount;
        s_balances[_to] = s_balances[_to] + _amount;
        s_minterAllowed[msg.sender] = mintingAllowedAmount - _amount;
        emit Mint(msg.sender, _to, _amount);
        emit Transfer(address(0), _to, _amount);
        return true;
    }

    /**
     * @dev Throws if called by any account other than the masterMinter
     */
    modifier onlyMasterMinter() {
        if (msg.sender != s_masterMinter) {
            revert FiatTokenV1__CallerNotMasterMinter();
        }
        _;
    }

    /**
     * @dev Get minter allowance for an account
     * @param minter The address of the minter
     */
    function minterAllowance(address minter) external view returns (uint256) {
        return s_minterAllowed[minter];
    }

    /**
     * @dev Checks if account is a minter
     * @param account The address to check
     */
    function isMinter(address account) external view returns (bool) {
        return s_isMinter[account];
    }

    /**
     * @notice Amount of remaining tokens spender is allowed to transfer on
     * behalf of the token owner
     * @param owner     Token owner's address
     * @param spender   Spender's address
     * @return Allowance amount
     */
    function allowance(address owner, address spender) external view override returns (uint256) {
        return s_allowed[owner][spender];
    }

    /**
     * @dev Get totalSupply of token
     */
    function totalSupply() external view override returns (uint256) {
        return s_totalSupply;
    }

    /**
     * @dev Get token balance of an account
     * @param account address The account
     */
    function balanceOf(address account) external view override returns (uint256) {
        return s_balances[account];
    }

    /**
     * @notice Set spender's allowance over the caller's tokens to be a given
     * value.
     * @param spender   Spender's address
     * @param value     Allowance amount
     * @return True if successful
     */
    function approve(address spender, uint256 value)
        external
        override
        whenNotPaused
        notBlacklisted(msg.sender)
        notBlacklisted(spender)
        returns (bool)
    {
        _approve(msg.sender, spender, value);
        return true;
    }

    /**
     * @dev Internal function to set allowance
     * @param owner     Token owner's address
     * @param spender   Spender's address
     * @param value     Allowance amount
     */
    function _approve(address owner, address spender, uint256 value) internal override {
        if (owner == address(0)) {
            revert FiatTokenV1__ERC20OwnerMustBeNonZeroAddress();
        }
        if (spender == address(0)) {
            revert FiatTokenV1__ERC20SpenderMustBeNonZeroAddress();
        }
        s_allowed[owner][spender] = value;
        emit Approval(owner, spender, value);
    }

    /**
     * @notice Transfer tokens by spending allowance
     * @param from  Payer's address
     * @param to    Payee's address
     * @param value Transfer amount
     * @return True if successful
     */
    function transferFrom(address from, address to, uint256 value)
        external
        override
        whenNotPaused
        notBlacklisted(msg.sender)
        notBlacklisted(from)
        notBlacklisted(to)
        returns (bool)
    {
        if (value > s_allowed[from][msg.sender]) {
            revert FiatTokenV1__ERC20AmountExceedsAllowance();
        }
        _transfer(from, to, value);
        s_allowed[from][msg.sender] = s_allowed[from][msg.sender] - value;
        return true;
    }

    /**
     * @notice Transfer tokens from the caller
     * @param to    Payee's address
     * @param value Transfer amount
     * @return True if successful
     */
    function transfer(address to, uint256 value)
        external
        override
        whenNotPaused
        notBlacklisted(msg.sender)
        notBlacklisted(to)
        returns (bool)
    {
        _transfer(msg.sender, to, value);
        return true;
    }

    /**
     * @notice Internal function to process transfers
     * @param from  Payer's address
     * @param to    Payee's address
     * @param value Transfer amount
     */
    function _transfer(address from, address to, uint256 value) internal override {
        if (from == address(0)) {
            revert FiatTokenV1__ERC20SenderCannotBeZeroAddress();
        }
        if (to == address(0)) {
            revert FiatTokenV1__ERC20RecipientCannotBeZeroAddress();
        }
        if (value > s_balances[from]) {
            revert FiatTokenV1__ERC20InsufficientFunds();
        }

        s_balances[from] = s_balances[from] - value;
        s_balances[to] = s_balances[to] + value;
        emit Transfer(from, to, value);
    }

    /**
     * V2
     * @notice Execute a transfer with a signed authorization
     * @param from          Payer's address (Authorizer)
     * @param to            Payee's address
     * @param value         Amount to be transferred
     * @param validAfter    The time after which this is valid (unix time)
     * @param validBefore   The time before which this is valid (unix time)
     * @param nonce         Unique nonce
     * @param v             v of the signature
     * @param r             r of the signature
     * @param s             s of the signature
     */
    function transferWithAuthorization(
        address from,
        address to,
        uint256 value,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external whenNotPaused notBlacklisted(from) notBlacklisted(to) {
        _transferWithAuthorization(from, to, value, validAfter, validBefore, nonce, v, r, s);
    }

    /**
     * V2
     * @notice Receive a transfer with a signed authorization from the payer
     * @dev This has an additional check to ensure that the payee's address
     * matches the caller of this function to prevent front-running attacks.
     * @param from          Payer's address (Authorizer)
     * @param to            Payee's address
     * @param value         Amount to be transferred
     * @param validAfter    The time after which this is valid (unix time)
     * @param validBefore   The time before which this is valid (unix time)
     * @param nonce         Unique nonce
     * @param v             v of the signature
     * @param r             r of the signature
     * @param s             s of the signature
     */
    function receiveWithAuthorization(
        address from,
        address to,
        uint256 value,
        uint256 validAfter,
        uint256 validBefore,
        bytes32 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external whenNotPaused notBlacklisted(from) notBlacklisted(to) {
        _receiveWithAuthorization(from, to, value, validAfter, validBefore, nonce, v, r, s);
    }

    /**
     * V2
     * @notice Attempt to cancel an authorization
     * @dev Works only if the authorization is not yet used.
     * @param authorizer    Authorizer's address
     * @param nonce         Nonce of the authorization
     * @param v             v of the signature
     * @param r             r of the signature
     * @param s             s of the signature
     */
    function cancelAuthorization(address authorizer, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)
        external
        whenNotPaused
    {
        _cancelAuthorization(authorizer, nonce, v, r, s);
    }

    /**
     * V2
     * @notice Update allowance with a signed permit
     * @param owner       Token owner's address (Authorizer)
     * @param spender     Spender's address
     * @param value       Amount of allowance
     * @param deadline    Expiration time, seconds since the epoch
     * @param v           v of the signature
     * @param r           r of the signature
     * @param s           s of the signature
     */
    function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        external
        whenNotPaused
        notBlacklisted(owner)
        notBlacklisted(spender)
    {
        _permit(owner, spender, value, deadline, v, r, s);
    }

    /**
     * @dev Function to add/update a new minter
     * @param minter The address of the minter
     * @param minterAllowedAmount The minting amount allowed for the minter
     * @return True if the operation was successful.
     */
    function configureMinter(address minter, uint256 minterAllowedAmount)
        external
        whenNotPaused
        onlyMasterMinter
        returns (bool)
    {
        s_isMinter[minter] = true;
        s_minterAllowed[minter] = minterAllowedAmount;
        emit MinterConfigured(minter, minterAllowedAmount);
        return true;
    }

    /**
     * @dev Function to remove a minter
     * @param minter The address of the minter to remove
     * @return True if the operation was successful.
     */
    function removeMinter(address minter) external onlyMasterMinter returns (bool) {
        s_isMinter[minter] = false;
        s_minterAllowed[minter] = 0;
        emit MinterRemoved(minter);
        return true;
    }

    /**
     * @dev allows a minter to burn some of its own tokens
     * Validates that caller is a minter and that sender is not blacklisted
     * amount is less than or equal to the minter's account balance
     * @param _amount uint256 the amount of tokens to be burned
     */
    function burn(uint256 _amount) external whenNotPaused onlyMinters notBlacklisted(msg.sender) {
        uint256 balance = s_balances[msg.sender];
        if (_amount <= 0) {
            revert FiatTokenV1__BurnAmountNotGreaterThanZero();
        }
        if (balance < _amount) {
            revert FiatTokenV1__BurnAmountExceedsBalance(balance, _amount);
        }

        s_totalSupply = s_totalSupply - _amount;
        s_balances[msg.sender] = balance - _amount;
        emit Burn(msg.sender, _amount);
        emit Transfer(msg.sender, address(0), _amount);
    }

    function updateMasterMinter(address _newMasterMinter) external onlyOwner {
        if (_newMasterMinter == address(0)) {
            revert FiatTokenV1__MasterMinterMustBeNonZeroAddress();
        }
        s_masterMinter = _newMasterMinter;
        emit MasterMinterChanged(s_masterMinter);
    }

    /**
     * V2
     * @notice Internal function to increase the allowance by a given increment
     * @param owner     Token owner's address
     * @param spender   Spender's address
     * @param increment Amount of increase
     */
    function _increaseAllowance(address owner, address spender, uint256 increment) internal override {
        _approve(owner, spender, s_allowed[owner][spender] + increment);
    }

    /**
     * V2
     * @notice Internal function to decrease the allowance by a given decrement
     * @param owner     Token owner's address
     * @param spender   Spender's address
     * @param decrement Amount of decrease
     */
    function _decreaseAllowance(address owner, address spender, uint256 decrement) internal override {
        // _approve(owner, spender, allowed[owner][spender].sub(decrement, "ERC20: decreased allowance below zero")); // string memory errorMessage
        _approve(owner, spender, s_allowed[owner][spender] - decrement);
    }

    /**
     * V2
     * @notice Increase the allowance by a given increment
     * @param spender   Spender's address
     * @param increment Amount of increase in allowance
     * @return True if successful
     */
    function increaseAllowance(address spender, uint256 increment)
        external
        whenNotPaused
        notBlacklisted(msg.sender)
        notBlacklisted(spender)
        returns (bool)
    {
        _increaseAllowance(msg.sender, spender, increment);
        return true;
    }

    /**
     * V2
     * @notice Decrease the allowance by a given decrement
     * @param spender   Spender's address
     * @param decrement Amount of decrease in allowance
     * @return True if successful
     */
    function decreaseAllowance(address spender, uint256 decrement)
        external
        whenNotPaused
        notBlacklisted(msg.sender)
        notBlacklisted(spender)
        returns (bool)
    {
        _decreaseAllowance(msg.sender, spender, decrement);
        return true;
    }

    ////////////////////
    // Getters /////////
    ////////////////////

    function getTokenName() external view returns (string memory) {
        return s_tokenName;
    }

    function getTokenSymbol() external view returns (string memory) {
        return s_tokenSymbol;
    }

    function getTokenDecimals() external view returns (uint8) {
        return s_tokenDecimals;
    }

    function getTokenCurrency() external view returns (string memory) {
        return s_tokenCurrency;
    }

    function getMasterMinter() external view returns (address) {
        return s_masterMinter;
    }

    // function getPauser() external view returns (address) {
    //     return pauser;
    // }

    function getIsInitialized() external view returns (bool) {
        return s_isInitialized;
    }
}
