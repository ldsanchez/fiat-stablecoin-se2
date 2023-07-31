// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {FiatTokenV1} from "../../src/FiatTokenV1.sol";
import {Pausable} from "../../src/Pausable.sol";
import {Blacklistable} from "../../src/Blacklistable.sol";
import {Ownable} from "../../src/Ownable.sol";
import {MasterMinter} from "../../src/minting/MasterMinter.sol";
// import {DeployFiatTokenV1} from "../../script/DeployFiatTokenV1.s.sol";
import {DeployScript} from "../../script/Deploy.s.sol";

contract FiatTokenV1Test is Test {
    FiatTokenV1 fiatTokenV1;
    MasterMinter masterMinter;

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
    event MinterConfigured(address indexed minter, uint256 minterAllowedAmount);
    event MinterRemoved(address indexed oldMinter);
    event Mint(address indexed minter, address indexed to, uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Burn(address indexed burner, uint256 amount);

    string public constant TOKEN_NAME = "FiatTokenV1";
    string public constant TOKEN_SYMBOL = "FV1";
    string public constant TOKEN_CURRENCY = "CUR";
    uint8 public constant TOKEN_DECIMALS = 6;
    address public fiatTokenOwner = address(1);
    address public minterAddress = address(2);
    address public receiverAddress = address(3);
    address public newMasterMinterAddress = address(4);
    address public attackerAddress = address(10);
    uint256 public constant MINTER_ALLOWANCE = 1000000e6;
    uint256 public constant MINT_AMOUNT = 100e6;

    function setUp() external {
        DeployScript deployScript = new DeployScript();
        (fiatTokenV1, masterMinter) = deployScript.run();
        fiatTokenV1 = new FiatTokenV1();
        masterMinter = new MasterMinter(address(fiatTokenV1));
    }

    ///////////////////////////////////
    // Initialization Tests ///////////
    ///////////////////////////////////

    function testInitilizeToken() public {
        vm.expectEmit(true, true, false, true, address(fiatTokenV1));
        emit TokenInitialized(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_CURRENCY,
            TOKEN_DECIMALS,
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner
        );
        fiatTokenV1.initializeToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_CURRENCY,
            TOKEN_DECIMALS,
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner
        );
    }

    modifier tokenInitilizated() {
        fiatTokenV1.initializeToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_CURRENCY,
            TOKEN_DECIMALS,
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner
        );
        _;
    }

    function testRevertsIfTokenAlreadyInitialized() public tokenInitilizated {
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__TokenAlreadyInitialized.selector));
        fiatTokenV1.initializeToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_CURRENCY,
            TOKEN_DECIMALS,
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner
        );
    }

    function testRevertIfMasterMinterIsZeroAddress() public {
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__MasterMinterMustBeNonZeroAddress.selector));
        fiatTokenV1.initializeToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_CURRENCY,
            TOKEN_DECIMALS,
            address(0),
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner
        );
    }

    function testRevertIfPauserIsZeroAddress() public {
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__PauserMustBeNonZeroAddress.selector));
        fiatTokenV1.initializeToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_CURRENCY,
            TOKEN_DECIMALS,
            fiatTokenOwner,
            address(0),
            fiatTokenOwner,
            fiatTokenOwner
        );
    }

    function testRevertIfBlacklisterIsZeroAddress() public {
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__BlacklisterMustBeNonZeroAddress.selector));
        fiatTokenV1.initializeToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_CURRENCY,
            TOKEN_DECIMALS,
            fiatTokenOwner,
            fiatTokenOwner,
            address(0),
            fiatTokenOwner
        );
    }

    function testRevertIfOwnerIsZeroAddress() public {
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__OwnerMustBeNonZeroAddress.selector));
        fiatTokenV1.initializeToken(
            TOKEN_NAME,
            TOKEN_SYMBOL,
            TOKEN_CURRENCY,
            TOKEN_DECIMALS,
            fiatTokenOwner,
            fiatTokenOwner,
            fiatTokenOwner,
            address(0)
        );
    }

    ///////////////////////////////////
    // Minter Tests ///////////////////
    ///////////////////////////////////

    function testConfigureMinter() public tokenInitilizated {
        vm.startPrank(fiatTokenOwner);
        vm.expectEmit(true, false, false, true, address(fiatTokenV1));
        emit MinterConfigured(minterAddress, MINTER_ALLOWANCE);
        fiatTokenV1.configureMinter(minterAddress, MINTER_ALLOWANCE);
        vm.stopPrank();
    }

    function testRemoveMinter() public tokenInitilizated minterConfigured {
        vm.startPrank(fiatTokenOwner);
        vm.expectEmit(true, false, false, true, address(fiatTokenV1));
        emit MinterRemoved(minterAddress);
        fiatTokenV1.removeMinter(minterAddress);
        assertEq(fiatTokenV1.isMinter(minterAddress), false);
        assertEq(fiatTokenV1.minterAllowance(minterAddress), 0);
        vm.stopPrank();
    }

    function testRevertRemoveMinterIfCallerNotMasterMinter() public tokenInitilizated minterConfigured {
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__CallerNotMasterMinter.selector));
        fiatTokenV1.removeMinter(minterAddress);
    }

    function testRevertConfigureMinterIfNotMasterMinter() public tokenInitilizated {
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__CallerNotMasterMinter.selector));
        fiatTokenV1.configureMinter(minterAddress, MINTER_ALLOWANCE);
    }

    function testIsMinter() public tokenInitilizated minterConfigured {
        assertEq(fiatTokenV1.isMinter(minterAddress), true);
    }

    modifier minterConfigured() {
        vm.prank(fiatTokenOwner);
        fiatTokenV1.configureMinter(minterAddress, MINTER_ALLOWANCE);
        _;
    }

    function testRevertMintIfNotMinter() public tokenInitilizated minterConfigured {
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__NotAMinter.selector));
        fiatTokenV1.mint(attackerAddress, MINT_AMOUNT);
    }

    function testRevertMintIfRecipientIsZeroAddress() public tokenInitilizated minterConfigured {
        vm.startPrank(minterAddress);
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__RecipientMustBeNonZeroAddress.selector));
        fiatTokenV1.mint(address(0), MINT_AMOUNT);
        vm.stopPrank();
    }

    function testRevertMintIfAmountIsNotGreaterThanZero() public tokenInitilizated minterConfigured {
        vm.startPrank(minterAddress);
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__AmountMustBeGreaterThanZero.selector));
        fiatTokenV1.mint(attackerAddress, 0);
        vm.stopPrank();
    }

    function testRevertMintIfAmountExceedsMinterAllowance() public tokenInitilizated minterConfigured {
        vm.startPrank(minterAddress);
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__AmountExceedsMinterAllowance.selector));
        fiatTokenV1.mint(attackerAddress, MINTER_ALLOWANCE + 1);
        vm.stopPrank();
    }

    modifier paused() {
        vm.prank(fiatTokenOwner);
        fiatTokenV1.pause();
        _;
    }

    function testRevertMintIfFiatTokenPaused() public tokenInitilizated minterConfigured paused {
        vm.startPrank(minterAddress);
        vm.expectRevert(abi.encodeWithSelector(Pausable.Pausable__TokenIsPaused.selector));
        fiatTokenV1.mint(attackerAddress, MINT_AMOUNT);
        vm.stopPrank();
    }

    modifier blacklisted(address account) {
        vm.prank(fiatTokenOwner);
        fiatTokenV1.blacklist(account);
        _;
    }

    function testRevertMintIfSenderIsBlacklisted()
        public
        tokenInitilizated
        minterConfigured
        blacklisted(minterAddress)
    {
        vm.startPrank(minterAddress);
        vm.expectRevert(
            abi.encodeWithSelector(Blacklistable.Blacklistable__AccountIsBlacklisted.selector, (minterAddress))
        );
        fiatTokenV1.mint(attackerAddress, MINT_AMOUNT);
        vm.stopPrank();
    }

    function testRevertMintIfReceiverIsBlacklisted()
        public
        tokenInitilizated
        minterConfigured
        blacklisted(attackerAddress)
    {
        vm.startPrank(minterAddress);
        vm.expectRevert(
            abi.encodeWithSelector(Blacklistable.Blacklistable__AccountIsBlacklisted.selector, (attackerAddress))
        );
        fiatTokenV1.mint(attackerAddress, MINT_AMOUNT);
        vm.stopPrank();
    }

    function testMinterAllowance() public tokenInitilizated minterConfigured {
        assertEq(fiatTokenV1.minterAllowance(minterAddress), MINTER_ALLOWANCE);
    }

    function testTotalSupply() public tokenInitilizated minterConfigured {
        vm.startPrank(minterAddress);
        assertEq(fiatTokenV1.totalSupply(), 0);
        fiatTokenV1.mint(receiverAddress, MINT_AMOUNT);
        assertEq(fiatTokenV1.totalSupply(), MINT_AMOUNT);
        vm.stopPrank();
    }

    function testBalanceOf() public tokenInitilizated minterConfigured {
        vm.startPrank(minterAddress);
        assertEq(fiatTokenV1.balanceOf(receiverAddress), 0);
        fiatTokenV1.mint(receiverAddress, MINT_AMOUNT);
        assertEq(fiatTokenV1.balanceOf(receiverAddress), MINT_AMOUNT);
        vm.stopPrank();
    }

    function testMinterAllowed() public tokenInitilizated minterConfigured {
        vm.startPrank(minterAddress);
        assertEq(fiatTokenV1.minterAllowance(minterAddress), MINTER_ALLOWANCE);
        fiatTokenV1.mint(receiverAddress, MINT_AMOUNT);
        assertEq(fiatTokenV1.minterAllowance(minterAddress), MINTER_ALLOWANCE - MINT_AMOUNT);
        vm.stopPrank();
    }

    // Falta meter los AssertEQ
    function testMint() public tokenInitilizated minterConfigured {
        vm.startPrank(minterAddress);
        vm.expectEmit(true, true, false, true, address(fiatTokenV1));
        emit Mint(minterAddress, receiverAddress, MINT_AMOUNT);
        vm.expectEmit(true, true, false, true, address(fiatTokenV1));
        emit Transfer(address(0), receiverAddress, MINT_AMOUNT);
        fiatTokenV1.mint(receiverAddress, MINT_AMOUNT);
        vm.stopPrank();
    }

    function testRevertUpdateMasterMinterIfNotOwner() public tokenInitilizated {
        vm.startPrank(attackerAddress);
        vm.expectRevert(abi.encodeWithSelector(Ownable.Ownable__CallerIsNotTheOwner.selector));
        fiatTokenV1.updateMasterMinter(newMasterMinterAddress);
        vm.stopPrank();
    }

    modifier mintedToMinter() {
        vm.prank(minterAddress);
        fiatTokenV1.mint(minterAddress, MINT_AMOUNT);
        _;
    }

    modifier mintedToReceiver() {
        vm.prank(receiverAddress);
        fiatTokenV1.mint(receiverAddress, MINT_AMOUNT);
        _;
    }

    function testRevertBurnIfFiatTokenPaused() public tokenInitilizated minterConfigured mintedToMinter paused {
        vm.startPrank(minterAddress);
        vm.expectRevert(abi.encodeWithSelector(Pausable.Pausable__TokenIsPaused.selector));
        fiatTokenV1.burn(MINT_AMOUNT);
        vm.stopPrank();
    }

    function testRevertBurnIfCallerIsNotMinter() public tokenInitilizated minterConfigured mintedToMinter {
        vm.startPrank(attackerAddress);
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__NotAMinter.selector));
        fiatTokenV1.burn(MINT_AMOUNT);
        vm.stopPrank();
    }

    function testRevertBurnIfCallerIsBlacklisted()
        public
        tokenInitilizated
        minterConfigured
        mintedToMinter
        blacklisted(minterAddress)
    {
        vm.startPrank(minterAddress);
        vm.expectRevert(
            abi.encodeWithSelector(Blacklistable.Blacklistable__AccountIsBlacklisted.selector, (minterAddress))
        );
        fiatTokenV1.burn(MINT_AMOUNT);
        vm.stopPrank();
    }

    function testRevertBurnIfBurnAmountNotGreaterThanZero() public tokenInitilizated minterConfigured mintedToMinter {
        vm.startPrank(minterAddress);
        vm.expectRevert(abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__BurnAmountNotGreaterThanZero.selector));
        fiatTokenV1.burn(0);
        vm.stopPrank();
    }

    function testRevertBurnIfBurnAmountExceedsBalance() public tokenInitilizated minterConfigured mintedToMinter {
        vm.startPrank(minterAddress);
        uint256 balance = fiatTokenV1.balanceOf(minterAddress);
        vm.expectRevert(
            abi.encodeWithSelector(FiatTokenV1.FiatTokenV1__BurnAmountExceedsBalance.selector, balance, MINT_AMOUNT + 1)
        );
        fiatTokenV1.burn(MINT_AMOUNT + 1);
        vm.stopPrank();
    }

    function testBurn() public tokenInitilizated minterConfigured mintedToMinter {
        vm.startPrank(minterAddress);
        vm.expectEmit(true, false, false, true, address(fiatTokenV1));
        emit Burn(minterAddress, MINT_AMOUNT);
        vm.expectEmit(true, true, false, true, address(fiatTokenV1));
        emit Transfer(minterAddress, address(0), MINT_AMOUNT);
        fiatTokenV1.burn(MINT_AMOUNT);
        vm.stopPrank();
    }
}
