const contracts = {
  31337: [
    {
      name: "Anvil",
      chainId: "31337",
      contracts: {
        FiatTokenV1: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Blacklistable__AccountIsBlacklisted",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__AmountExceedsMinterAllowance",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__AmountMustBeGreaterThanZero",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__BlacklisterMustBeNonZeroAddress",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "balance",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "FiatTokenV1__BurnAmountExceedsBalance",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__BurnAmountNotGreaterThanZero",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__CallerNotMasterMinter",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__ERC20AmountExceedsAllowance",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__ERC20InsufficientFunds",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__ERC20OwnerMustBeNonZeroAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__ERC20RecipientCannotBeZeroAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__ERC20SenderCannotBeZeroAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__ERC20SpenderMustBeNonZeroAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__MasterMinterMustBeNonZeroAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__NotAMinter",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__OwnerMustBeNonZeroAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__PauserMustBeNonZeroAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__RecipientMustBeNonZeroAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "FiatTokenV1__TokenAlreadyInitialized",
              type: "error",
            },
            {
              inputs: [],
              name: "Ownable__CallerIsNotTheOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "Pausable__TokenIsPaused",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "authorizer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "nonce",
                  type: "bytes32",
                },
              ],
              name: "AuthorizationCanceled",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "authorizer",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "nonce",
                  type: "bytes32",
                },
              ],
              name: "AuthorizationUsed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
              ],
              name: "Blacklisted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "newBlacklister",
                  type: "address",
                },
              ],
              name: "BlacklisterChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "burner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "Burn",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "newMasterMinter",
                  type: "address",
                },
              ],
              name: "MasterMinterChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "minter",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "Mint",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "minter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "minterAllowedAmount",
                  type: "uint256",
                },
              ],
              name: "MinterConfigured",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "oldMinter",
                  type: "address",
                },
              ],
              name: "MinterRemoved",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [],
              name: "Pause",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "newAddress",
                  type: "address",
                },
              ],
              name: "PauserChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "newRescuer",
                  type: "address",
                },
              ],
              name: "RescuerChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "string",
                  name: "name",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "symbol",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "currency",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint8",
                  name: "decimals",
                  type: "uint8",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "masterMinter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "pauser",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "blacklister",
                  type: "address",
                },
              ],
              name: "TokenInitialized",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
              ],
              name: "UnBlacklisted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [],
              name: "Unpause",
              type: "event",
            },
            {
              inputs: [],
              name: "CANCEL_AUTHORIZATION_TYPEHASH",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "DOMAIN_SEPARATOR",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "PERMIT_TYPEHASH",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "RECEIVE_WITH_AUTHORIZATION_TYPEHASH",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "TRANSFER_WITH_AUTHORIZATION_TYPEHASH",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "authorizer",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "nonce",
                  type: "bytes32",
                },
              ],
              name: "authorizationState",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
              ],
              name: "blacklist",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "blacklister",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "burn",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "authorizer",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "nonce",
                  type: "bytes32",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "cancelAuthorization",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "minter",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "minterAllowedAmount",
                  type: "uint256",
                },
              ],
              name: "configureMinter",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "decrement",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getIsInitialized",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getMasterMinter",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTokenCurrency",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTokenDecimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTokenName",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getTokenSymbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "increment",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "tokenName",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "tokenSymbol",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "tokenCurrency",
                  type: "string",
                },
                {
                  internalType: "uint8",
                  name: "tokenDecimals",
                  type: "uint8",
                },
                {
                  internalType: "address",
                  name: "newMasterMinter",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "newPauser",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "newBlacklister",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "initializeToken",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
              ],
              name: "isBlacklisted",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "isMinter",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "minter",
                  type: "address",
                },
              ],
              name: "minterAllowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "nonces",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "pause",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "paused",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "pauser",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "deadline",
                  type: "uint256",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "permit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "validAfter",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "validBefore",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "nonce",
                  type: "bytes32",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "receiveWithAuthorization",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "minter",
                  type: "address",
                },
              ],
              name: "removeMinter",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "contract IERC20",
                  name: "tokenContract",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "rescueERC20",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "rescuer",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "s_masterMinter",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "s_tokenCurrency",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "s_tokenDecimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "s_tokenName",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "s_tokenSymbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "validAfter",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "validBefore",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "nonce",
                  type: "bytes32",
                },
                {
                  internalType: "uint8",
                  name: "v",
                  type: "uint8",
                },
                {
                  internalType: "bytes32",
                  name: "r",
                  type: "bytes32",
                },
                {
                  internalType: "bytes32",
                  name: "s",
                  type: "bytes32",
                },
              ],
              name: "transferWithAuthorization",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
              ],
              name: "unBlacklist",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "unpause",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newBlacklister",
                  type: "address",
                },
              ],
              name: "updateBlacklister",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newMasterMinter",
                  type: "address",
                },
              ],
              name: "updateMasterMinter",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newPauser",
                  type: "address",
                },
              ],
              name: "updatePauser",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newRescuer",
                  type: "address",
                },
              ],
              name: "updateRescuer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        MasterMinter: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_minterManager",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "Ownable__CallerIsNotTheOwner",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_controller",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "_worker",
                  type: "address",
                },
              ],
              name: "ControllerConfigured",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_controller",
                  type: "address",
                },
              ],
              name: "ControllerRemoved",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "msgSender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "minter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "decrement",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newAllowance",
                  type: "uint256",
                },
              ],
              name: "MinterAllowanceDecremented",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_msgSender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "_minter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_increment",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_newAllowance",
                  type: "uint256",
                },
              ],
              name: "MinterAllowanceIncremented",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_msgSender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "_minter",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "_allowance",
                  type: "uint256",
                },
              ],
              name: "MinterConfigured",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_oldMinterManager",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "_newMinterManager",
                  type: "address",
                },
              ],
              name: "MinterManagerSet",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "_msgSender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "_minter",
                  type: "address",
                },
              ],
              name: "MinterRemoved",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_controller",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_worker",
                  type: "address",
                },
              ],
              name: "configureController",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newAllowance",
                  type: "uint256",
                },
              ],
              name: "configureMinter",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_allowanceDecrement",
                  type: "uint256",
                },
              ],
              name: "decrementMinterAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "getMinterManager",
              outputs: [
                {
                  internalType: "contract MinterManagementInterface",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_controller",
                  type: "address",
                },
              ],
              name: "getWorker",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_allowanceIncrement",
                  type: "uint256",
                },
              ],
              name: "incrementMinterAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_controller",
                  type: "address",
                },
              ],
              name: "removeController",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "removeMinter",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_newMinterManager",
                  type: "address",
                },
              ],
              name: "setMinterManager",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
