//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../src/FiatTokenV1.sol";
import "../src/minting/MasterMinter.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
    function run() external returns (FiatTokenV1, MasterMinter) {
        uint256 deployerPrivateKey = setupLocalhostEnv();

        vm.startBroadcast(deployerPrivateKey);
        // FiatTokenV1 fiatTokenV1 = new FiatTokenV1(
        //     vm.addr(deployerPrivateKey)
        FiatTokenV1 fiatTokenV1 = new FiatTokenV1();
        console.logString(string.concat("FiatTokenV1 deployed at: ", vm.toString(address(fiatTokenV1))));
        MasterMinter masterMinter = new MasterMinter(address(fiatTokenV1));
        console.logString(string.concat("MasterMinter deployed at: ", vm.toString(address(masterMinter))));
        vm.stopBroadcast();
        exportDeployments();

        return (fiatTokenV1, masterMinter);
    }

    function test() public {}
}
