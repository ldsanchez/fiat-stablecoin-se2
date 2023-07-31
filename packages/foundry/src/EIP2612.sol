// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {AbstractFiatTokenV1} from "./AbstractFiatTokenV1.sol";
import {EIP712Domain} from "./util/EIP712Domain.sol";
import {EIP712} from "./util/EIP712.sol";

/**
 * @title EIP-2612
 * @notice Provide internal implementation for gas-abstracted approvals
 */
abstract contract EIP2612 is AbstractFiatTokenV1, EIP712Domain {
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)")
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;

    mapping(address => uint256) private _permitNonces;

    /**
     * @notice Nonces for permit
     * @param owner Token owner's address (Authorizer)
     * @return Next nonce
     */
    function nonces(address owner) external view returns (uint256) {
        return _permitNonces[owner];
    }

    /**
     * @notice Verify a signed approval permit and execute if valid
     * @param owner     Token owner's address (Authorizer)
     * @param spender   Spender's address
     * @param value     Amount of allowance
     * @param deadline  The time at which this expires (unix time)
     * @param v         v of the signature
     * @param r         r of the signature
     * @param s         s of the signature
     */
    function _permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
        internal
    {
        require(deadline >= block.timestamp, "FiatTokenV2: permit is expired");

        bytes memory data = abi.encode(PERMIT_TYPEHASH, owner, spender, value, _permitNonces[owner]++, deadline);
        require(EIP712.recover(DOMAIN_SEPARATOR, v, r, s, data) == owner, "EIP2612: invalid signature");

        _approve(owner, spender, value);
    }
}
