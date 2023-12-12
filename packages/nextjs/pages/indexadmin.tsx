/* eslint-disable react/jsx-key */

/* eslint-disable @typescript-eslint/no-unused-vars */
import { SetStateAction, useEffect, useState } from "react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { Address, AddressInput, Balance, IntegerInput, getParsedEthersError } from "~~/components/scaffold-eth";
import {
  useRoles,
  useScaffoldContractRead,
  useScaffoldContractWrite,
  useScaffoldEventHistory,
} from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const InitializeUI: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [_to, set_to] = useState("");
  const [_amount, set_amount] = useState<BigNumber>(BigNumber.from("0"));
  const [amountToRescue, setAmountToRescue] = useState<BigNumber>(BigNumber.from("0"));
  const [addressToken, setAddressToken] = useState("");
  const [addressTo, setAddressTo] = useState("");
  const [minter, setMinter] = useState("");
  const [minterNew, setMinterNew] = useState("");
  const [minterR, setMinterR] = useState("");
  const [account, setAccount] = useState("");
  const [newBlack, setNewBlack] = useState("");
  const [newMinter, setNewMinter] = useState("");
  const [newUnBlack, setNewUnBlack] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [selUpdated, setSelUpdated] = useState("b");
  const [minterAllowedAmount, setMinterAllowedAmount] = useState<BigNumber>(BigNumber.from("0"));
  const { address } = useAccount();
  const { isBlister, isMMinter, isOwner, isPauser, isRescuer } = useRoles();
  const [blackedListShow, setBlackedListShow] = useState<string[]>([]);
  const [minterListShow, setMinterListShow] = useState<string[]>([]);
  const [ini, setIni] = useState(false);
  const [iniM, setIniM] = useState(false);
  //const [_amount, set_amount]  = useState<BigNumber>(0);

  const {
    data: blackListed,
    isLoading: isLoadingEventsBL,
    error: errorReadingEventsBL,
  } = useScaffoldEventHistory({
    contractName: "FiatTokenV1",
    eventName: "Blacklisted",
    fromBlock: 0,
    blockData: true,
  });

  const {
    data: minterListed,
    isLoading: isLoadingEventsML,
    error: errorReadingEventsML,
  } = useScaffoldEventHistory({
    contractName: "FiatTokenV1",
    eventName: "MinterConfigured",
    fromBlock: 0,
    blockData: true,
  });

  const {
    data: unMinterListed,
    isLoading: isLoadingEventsUML,
    error: errorReadingEventsUML,
  } = useScaffoldEventHistory({
    contractName: "FiatTokenV1",
    eventName: "MinterRemoved",
    fromBlock: 0,
    blockData: true,
  });

  const {
    data: unblackListed,
    isLoading: isLoadingEventsUBL,
    error: errorReadingEventsUBL,
  } = useScaffoldEventHistory({
    contractName: "FiatTokenV1",
    eventName: "UnBlacklisted",
    fromBlock: 0,
    blockData: true,
  });

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "mint",
    args: [_to, _amount],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      set_to("");
      set_amount(BigNumber.from("0"));
    },
  });

  const { writeAsync: writeAsyncAR, isLoading: isLoadingAR } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "rescueERC20",
    args: [addressToken, addressTo, amountToRescue],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      setAddressTo("");
      setAddressToken("");
      setAmountToRescue(BigNumber.from("0"));
    },
  });

  const { writeAsync: writeAsyncBL, isLoading: isLoadingBL } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "blacklist",
    args: [newBlack],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      setNewBlack("");
      const blackTmp = blackedListShow;
      blackTmp.push(newBlack);
      setBlackedListShow(blackTmp);
    },
  });

  const { writeAsync: writeAsyncUBL, isLoading: isLoadingUBL } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "unBlacklist",
    args: [newUnBlack],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      const blackTmp = blackedListShow;
      for (let i = 0; i < (blackTmp?.length ? blackTmp?.length : 0); ++i) {
        const item = blackTmp ? blackTmp[i] : null;
        if (item != null) {
          if (item == newUnBlack) {
            blackTmp.splice(i, 1);
            break;
          }
        }
      }
      setBlackedListShow(blackTmp);
      setNewUnBlack("");
    },
    onError(error, variables, context) {
      writeAsyncUBL();
    },
  });

  const { writeAsync: writeAsyncConf, isLoading: isLoadingConf } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "configureMinter",
    args: [minterNew, minterAllowedAmount],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      setMinterNew("");
      setMinterAllowedAmount(BigNumber.from("0"));
      const minterTmp = minterListShow;
      minterTmp.push(minter);
      setMinterListShow(minterTmp);
    },
  });

  const { writeAsync: writeAsyncUPA, isLoading: isLoadingUPA } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "unpause",
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
    },
  });

  const { writeAsync: writeAsyncPA, isLoading: isLoadingPA } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "pause",
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
    },
  });

  const { writeAsync: writeAsyncRM, isLoading: isLoadingRM } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "removeMinter",
    args: [minterR],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);

      const minterTmp = minterListShow;
      for (let i = 0; i < (minterTmp?.length ? minterTmp?.length : 0); ++i) {
        const item = minterTmp ? minterTmp[i] : null;
        if (item != null) {
          if (item == minterR) {
            minterTmp.splice(i, 1);
            break;
          }
        }
      }
      setMinterListShow(minterTmp);
      setMinterR("");
    },
    onError(error, variables, context) {
      writeAsyncRM();
    },
  });

  const { writeAsync: writeAsyncCHM, isLoading: isLoadingCHM } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "updateMasterMinter",
    args: [newAddress],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      setNewAddress("");
    },
  });

  const { writeAsync: writeAsyncCHB, isLoading: isLoadingCHB } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "updateBlacklister",
    args: [newAddress],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      setNewAddress("");
    },
  });

  const { writeAsync: writeAsyncCHP, isLoading: isLoadingCHP } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "updatePauser",
    args: [newAddress],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      setNewAddress("");
    },
  });

  const { writeAsync: writeAsyncCHR, isLoading: isLoadingCHR } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "updateRescuer",
    args: [newAddress],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      setNewAddress("");
    },
  });

  const { isLoading: isLoadingCheckMinter, data: dataCheckMinter } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "isMinter",
    args: [account],
  });

  const { isLoading: isLoadingCheckBL, data: dataCheckBL } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "isBlacklisted",
    args: [account],
  });

  const { isLoading: isLoadingMA, data: dataMA } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "minterAllowance",
    args: [minter],
  });

  useEffect(() => {
    setAccount(address!);
    setMinter(address!);
    //checkIsMinter()
  }, []);

  const removeBL = async (addressBL: string) => {
    setNewUnBlack(addressBL);
    await writeAsyncUBL();
  };

  const removeML = async (addressML: string) => {
    setMinterR(addressML);
    await writeAsyncRM();
  };

  const checkIsMinter = async () => {
    try {
      let mensaje = "";
      if (!dataCheckMinter) {
        mensaje = "Is Not Minter";
      } else {
        mensaje = "Is Minter";
      }
      notification.info(mensaje);
      setAccount("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const checkIsBlackList = async () => {
    try {
      let mensaje = "";
      if (!dataCheckBL) {
        mensaje = "Is Not in Black List";
      } else {
        mensaje = "Is In Black List";
      }
      notification.info(mensaje);
      setAccount("");
    } catch (error) {
      console.log("error", error);
    }
  };

  const updatedRol = async () => {
    console.log("updatedRol", selUpdated);
    if (selUpdated == "b") {
      writeAsyncCHB();
    } else if (selUpdated == "p") {
      writeAsyncCHP();
    } else if (selUpdated == "m") {
      writeAsyncCHM();
    } else if (selUpdated == "r") {
      writeAsyncCHR();
    }
  };

  const seeAllowanse = async () => {
    try {
      let mensaje = "";
      if (!dataMA) {
        mensaje = "Error";
      } else {
        mensaje = BigNumber.from(dataMA).toString();
      }
      notification.info(mensaje);
      setMinter("");
    } catch (error) {
      console.log("error", error);
    }
  };

  if (blackListed != undefined && !ini) {
    const blackTmp: string[] = [];
    for (let i = 0; i < (blackListed?.length ? blackListed?.length : 0); ++i) {
      const item = blackListed ? blackListed[i] : null;
      if (item != null) {
        blackTmp.push(item.args[0]);
      }
    }
    setBlackedListShow(blackTmp);
    setIni(true);
  }

  if (minterListed != undefined && !iniM) {
    const minterTmp: string[] = [];
    for (let i = 0; i < (minterListed?.length ? minterListed?.length : 0); ++i) {
      const item = minterListed ? minterListed[i] : null;
      if (item != null) {
        let enc = false;
        for (let j = 0; j < (unMinterListed?.length ? unMinterListed?.length : 0); ++j) {
          const item2 = unMinterListed ? unMinterListed[j] : null;
          if (item2 != null) {
            console.log("determine", item2.args[0], item.args[0]);
            if (item2.args[0] == item.args[0]) {
              enc = true;
              break;
            }
          }
        }
        if (!enc) {
          minterTmp.push(item.args[0]);
        }
      }
    }
    setMinterListShow(minterTmp);
    setIniM(true);
  }

  return (
    <>
      <MetaHeader title="Initialize UI | Scaffold-ETH 2" description="Initialize UI created with 🏗 Scaffold-ETH 2.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      {isMMinter ? (
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div
            style={{
              borderRadius: 10,
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              backgroundColor: "hsl(var(--p) / var(--tw-bg-opacity))",
            }}
            className="collapse-title text-xl font-medium"
          >
            Master Minter Admin
          </div>
          <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }} className="collapse-content">
            <div className="grid grid-cols-1 gap-1" style={{ marginTop: 20 }}>
              <div style={{ textAlign: "center", height: 50 }}>
                <label
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  htmlFor="faucet-modalxMML"
                  className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
                >
                  <span>Edit Minters List</span>
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path
                      fill="currentColor"
                      d="M15.964 4.634h-12v2h12v-2zM15.964 8.634h-12v2h12v-2zM3.964 12.634h8v2h-8v-2zM12.964 13.71l1.415-1.415 2.121 2.121 2.121-2.12 1.415 1.413-2.122 2.122 2.122 2.12-1.415 1.415-2.121-2.121-2.121 2.121-1.415-1.414 2.122-2.122-2.122-2.12z"
                    />
                  </svg>
                </label>
                <input type="checkbox" id="faucet-modalxMML" className="modal-toggle" />
                <label htmlFor="faucet-modalxMML" className="modal cursor-pointer">
                  <label className="modal-box relative" style={{ width: "100%" }}>
                    <input className="h-0 w-0 absolute top-0 left-0" />
                    <h3 className="text-xl font-bold mb-3">Minters List</h3>
                    <label
                      htmlFor="faucet-modalxMML"
                      className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
                    >
                      ✕
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-3">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <div style={{ width: "100%" }}>
                            <AddressInput
                              placeholder="New Minter Address"
                              value={minterNew}
                              onChange={value => setMinterNew(value)}
                            />
                            <IntegerInput
                              value={minterAllowedAmount}
                              onChange={updatedTxValue => {
                                updatedTxValue == ""
                                  ? setMinterAllowedAmount(BigNumber.from("0"))
                                  : setMinterAllowedAmount(BigNumber.from(updatedTxValue));
                              }}
                              placeholder="Max Allowed Amount"
                            />
                          </div>
                          <button
                            className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                              isLoadingConf ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                            }`}
                            onClick={writeAsyncConf}
                            disabled={isLoadingConf}
                          >
                            <span>Add</span>
                          </button>
                        </div>
                        <div className="overflow-x-auto">
                          <table style={{ marginLeft: "auto", marginRight: "auto" }} className="table">
                            {/* head */}
                            <thead>
                              <tr>
                                <th>Address</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {minterListShow?.map((item, index) => (
                                <tr>
                                  <td>
                                    <Address address={item}></Address>
                                  </td>
                                  <th>
                                    <button
                                      onClick={() => {
                                        setMinterR(item);
                                        removeML(item);
                                      }}
                                      className="btn btn-ghost btn-xs"
                                    >
                                      Remove
                                    </button>
                                  </th>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
              {/* <div style={{textAlign:"center", height:50}}>
              <label
                style={{height:"100%", width:"100%", borderRadius:10}}
                htmlFor="faucet-modalx"
                className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
              >
                <span>Configure Minter</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="h-6 w-6"
                >
                  <path d="M8 4.754a3.246 3.246 0 100 6.492 3.246 3.246 0 000-6.492zM5.754 8a2.246 2.246 0 114.492 0 2.246 2.246 0 01-4.492 0z" />
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 01-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 01-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 01.52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 011.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 011.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 01.52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 01-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 01-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 002.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 001.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 00-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 00-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 00-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 001.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 003.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 002.692-1.115l.094-.319z" />
                </svg>
              </label>
              <input type="checkbox" id="faucet-modalx" className="modal-toggle" />
              <label htmlFor="faucet-modalx" className="modal cursor-pointer">
                <label className="modal-box relative">
                  <input className="h-0 w-0 absolute top-0 left-0" />
                  <h3 className="text-xl font-bold mb-3">Set New Minter</h3>
                  <label htmlFor="faucet-modalx" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                    ✕
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-3">
                      <AddressInput
                        placeholder="New Minter Address"
                        value={minter}
                        onChange={value => setMinter(value)}
                      />
                      <IntegerInput
                        value={minterAllowedAmount}
                        onChange={updatedTxValue => {
                          updatedTxValue == "" ? setMinterAllowedAmount(BigNumber.from("0")) : setMinterAllowedAmount(BigNumber.from(updatedTxValue));
                        }}
                        placeholder="Max Allowed Amount"
                      />
                      <button
                        className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                          isLoadingConf ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                        }`}
                        onClick={writeAsyncConf}
                        disabled={isLoadingConf}
                      >
                        <span>Set</span>
                      </button>
                    </div>
                  </div>
                </label>
              </label>
            </div> */}
              {/* <div style={{textAlign:"center"}}>
              <label
                style={{height:"100%", width:"100%", borderRadius:10}}
                htmlFor="faucet-modalx2"
                className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
              >
                <span>Mint New Tokens</span>
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" />
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                </svg>
              </label>
              <input type="checkbox" id="faucet-modalx2" className="modal-toggle" />
              <label htmlFor="faucet-modalx2" className="modal cursor-pointer">
                <label className="modal-box relative">
                  <input className="h-0 w-0 absolute top-0 left-0" />
                  <h3 className="text-xl font-bold mb-3">Send News Tokens</h3>
                  <label htmlFor="faucet-modalx2" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                    ✕
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-3">
                      <AddressInput
                        placeholder="Address To"
                        value={_to}
                        onChange={value => set_to(value)}
                      />
                      <IntegerInput
                        value={_amount}
                        onChange={updatedTxValue => {
                          updatedTxValue == "" ? set_amount(BigNumber.from("0")) : set_amount(BigNumber.from(updatedTxValue));
                        }}
                        placeholder="Amount to Send"
                      />
                      <button
                        className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                          isLoading ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                        }`}
                        onClick={writeAsync}
                        disabled={isLoading}
                      >
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </label>
              </label>
            </div> */}
              {/* <div style={{textAlign:"center"}}>
              <label
                style={{height:"100%", width:"100%", borderRadius:10}}
                htmlFor="faucet-modalxChk"
                className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
              >
                <span>Check Is Minter</span>
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                  <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                </svg>
              </label>
              <input type="checkbox" id="faucet-modalxChk" className="modal-toggle" />
              <label htmlFor="faucet-modalxChk" className="modal cursor-pointer">
                <label className="modal-box relative">
                  <input className="h-0 w-0 absolute top-0 left-0" />
                  <h3 className="text-xl font-bold mb-3">Is Minter?</h3>
                  <label htmlFor="faucet-modalxChk" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                    ✕
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-3">
                      <AddressInput
                        placeholder="Address To Check"
                        value={account}
                        onChange={value => setAccount(value)}
                      />
                      <button
                        className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                          isLoading ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                        }`}
                        onClick={checkIsMinter}
                        disabled={isLoadingCheckMinter}
                      >
                        <span>Check</span>
                      </button>
                    </div>
                  </div>
                </label>
              </label>
            </div>
            <div style={{textAlign:"center", height:50}}>
              <label
                style={{height:"100%", width:"100%", borderRadius:10}}
                htmlFor="faucet-modalxMA"
                className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
              >
                <span>See Minter Allowanse</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 1024 1024"
                  className="h-6 w-6"
                >
                  <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
              </svg>
              </label>
              <input type="checkbox" id="faucet-modalxMA" className="modal-toggle" />
              <label htmlFor="faucet-modalxMA" className="modal cursor-pointer">
                <label className="modal-box relative">
                  <input className="h-0 w-0 absolute top-0 left-0" />
                  <h3 className="text-xl font-bold mb-3">Available Allocated Token Amount</h3>
                  <label htmlFor="faucet-modalxMA" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                    ✕
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-3">
                      <AddressInput
                        placeholder="Minter Address to Check"
                        value={minter}
                        onChange={value => setMinter(value)}
                      />
                      <button
                        className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                          isLoadingMA ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                        }`}
                        onClick={seeAllowanse}
                        disabled={isLoadingMA}
                      >
                        <span>Inquire</span>
                      </button>
                    </div>
                  </div>
                </label>
              </label>
            </div> */}
              {/* <div style={{textAlign:"center"}}>
              <label
                style={{height:"100%", width:"100%", borderRadius:10}}
                htmlFor="faucet-RM"
                className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
              >
                <span>Remove Minter</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="h-6 w-6"
                >
                  <path strokeMiterlimit={10}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={32}
                    d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z" />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={32}
                    d="M336 256H176"
                  />
              </svg>
              </label>
              <input type="checkbox" id="faucet-RM" className="modal-toggle" />
              <label htmlFor="faucet-RM" className="modal cursor-pointer">
                <label className="modal-box relative">
                  <input className="h-0 w-0 absolute top-0 left-0" />
                  <h3 className="text-xl font-bold mb-3">Remove Minter</h3>
                  <label htmlFor="faucet-RM" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                    ✕
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-3">
                      <AddressInput
                        placeholder="Minter Address to Remove"
                        value={minter}
                        onChange={value => setMinter(value)}
                      />
                      <button
                        className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                          isLoadingRM ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                        }`}
                        onClick={writeAsyncRM}
                        disabled={isLoadingRM}
                      >
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </label>
              </label>
            </div> */}
              {/* <div style={{textAlign:"center"}}>
              <label
                style={{height:"100%", width:"100%", borderRadius:10}}
                htmlFor="faucet-CHM"
                className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
              >
                <span>Change Master Minter</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-7h9v2h-4v3l-5-5zm5-4V6l5 5H8V9h4z" />
                </svg>
              </label>
              <input type="checkbox" id="faucet-CHM" className="modal-toggle" />
              <label htmlFor="faucet-CHM" className="modal cursor-pointer">
                <label className="modal-box relative">
                  <input className="h-0 w-0 absolute top-0 left-0" />
                  <h3 className="text-xl font-bold mb-3">Update New Master Minter</h3>
                  <label htmlFor="faucet-CHM" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                    ✕
                  </label>
                  <div className="space-y-3">
                    <div className="flex flex-col space-y-3">
                      <AddressInput
                        placeholder="New Master Minter Address"
                        value={_newMasterMinter}
                        onChange={value => set_newMasterMinter(value)}
                      />
                      <button
                        className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                          isLoadingCHM ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                        }`}
                        onClick={writeAsyncCHM}
                        disabled={isLoadingCHM}
                      >
                        <span>Update</span>
                      </button>
                    </div>
                  </div>
                </label>
              </label>
            </div> */}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isPauser ? (
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div
            style={{
              borderRadius: 10,
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              backgroundColor: "hsl(var(--p) / var(--tw-bg-opacity))",
            }}
            className="collapse-title text-xl font-medium"
          >
            Pauser Admin
          </div>
          <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }} className="collapse-content">
            <div className="grid grid-cols-2 gap-2" style={{ marginTop: 20 }}>
              <div style={{ textAlign: "center", height: 50 }}>
                <label
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  htmlFor="faucet-modalxP"
                  className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
                >
                  <span>Pause Chain</span>
                  <svg fill="currentColor" viewBox="0 0 1024 1024" className="h-6 w-6">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm-88-532h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8zm224 0h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8z" />
                  </svg>
                </label>
                <input type="checkbox" id="faucet-modalxP" className="modal-toggle" />
                <label htmlFor="faucet-modalxP" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <input className="h-0 w-0 absolute top-0 left-0" />
                    <h3 className="text-xl font-bold mb-3">Sure to Pause Chain?</h3>
                    <label htmlFor="faucet-modalxP" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                      ✕
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-3">
                        <button
                          className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                            isLoadingPA ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                          }`}
                          onClick={writeAsyncPA}
                          disabled={isLoadingPA}
                        >
                          <span>Acept Pause</span>
                        </button>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
              <div style={{ textAlign: "center", height: 50 }}>
                <label
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  htmlFor="faucet-modalxUP"
                  className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
                >
                  <span>Continue Chain</span>
                  <svg fill="currentColor" viewBox="0 0 1024 1024" className="h-6 w-6">
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                    <path d="M719.4 499.1l-296.1-215A15.9 15.9 0 00398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 000-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z" />
                  </svg>
                </label>
                <input type="checkbox" id="faucet-modalxUP" className="modal-toggle" />
                <label htmlFor="faucet-modalxUP" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <input className="h-0 w-0 absolute top-0 left-0" />
                    <h3 className="text-xl font-bold mb-3">Sure to UnPause Chain?</h3>
                    <label htmlFor="faucet-modalxUP" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                      ✕
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-3">
                        <button
                          className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                            isLoadingUPA ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                          }`}
                          onClick={writeAsyncUPA}
                          disabled={isLoadingUPA}
                        >
                          <span>Acept Continue</span>
                        </button>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isBlister ? (
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div
            style={{
              borderRadius: 10,
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              backgroundColor: "hsl(var(--p) / var(--tw-bg-opacity))",
            }}
            className="collapse-title text-xl font-medium"
          >
            BlackLister Admin
          </div>
          <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }} className="collapse-content">
            <div className="grid grid-cols-1 gap-1" style={{ marginTop: 20 }}>
              <div style={{ textAlign: "center", height: 50 }}>
                <label
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  htmlFor="faucet-modalxBL"
                  className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
                >
                  <span>Edit Black List</span>
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path
                      fill="currentColor"
                      d="M15.964 4.634h-12v2h12v-2zM15.964 8.634h-12v2h12v-2zM3.964 12.634h8v2h-8v-2zM12.964 13.71l1.415-1.415 2.121 2.121 2.121-2.12 1.415 1.413-2.122 2.122 2.122 2.12-1.415 1.415-2.121-2.121-2.121 2.121-1.415-1.414 2.122-2.122-2.122-2.12z"
                    />
                  </svg>
                </label>
                <input type="checkbox" id="faucet-modalxBL" className="modal-toggle" />
                <label htmlFor="faucet-modalxBL" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <input className="h-0 w-0 absolute top-0 left-0" />
                    <h3 className="text-xl font-bold mb-3">Black List</h3>
                    <label htmlFor="faucet-modalxBL" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                      ✕
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-3">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <AddressInput
                            placeholder="Address to Black List"
                            value={newBlack}
                            onChange={value => setNewBlack(value)}
                          />
                          <button
                            className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                              isLoadingBL ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                            }`}
                            onClick={writeAsyncBL}
                            disabled={isLoadingBL}
                          >
                            <span>Add</span>
                          </button>
                        </div>
                        <div className="overflow-x-auto">
                          <table style={{ marginLeft: "auto", marginRight: "auto" }} className="table">
                            {/* head */}
                            <thead>
                              <tr>
                                <th>Address</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {blackedListShow?.map((item, index) => (
                                <tr>
                                  <td>
                                    <Address address={item}></Address>
                                  </td>
                                  <th>
                                    <button
                                      onClick={() => {
                                        setNewUnBlack(item);
                                        removeBL(item);
                                      }}
                                      className="btn btn-ghost btn-xs"
                                    >
                                      Remove
                                    </button>
                                  </th>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isOwner ? (
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div
            style={{
              borderRadius: 10,
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              backgroundColor: "hsl(var(--p) / var(--tw-bg-opacity))",
            }}
            className="collapse-title text-xl font-medium"
          >
            Owner Admin
          </div>
          <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }} className="collapse-content">
            <div className="grid grid-cols-3 gap-3" style={{ marginTop: 20 }}>
              <div style={{ textAlign: "center" }}>
                <label
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  htmlFor="faucet-modalxChk"
                  className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
                >
                  <span>Check Is Minter</span>
                  <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-6 w-6">
                    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                  </svg>
                </label>
                <input type="checkbox" id="faucet-modalxChk" className="modal-toggle" />
                <label htmlFor="faucet-modalxChk" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <input className="h-0 w-0 absolute top-0 left-0" />
                    <h3 className="text-xl font-bold mb-3">Is Minter?</h3>
                    <label
                      htmlFor="faucet-modalxChk"
                      className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
                    >
                      ✕
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-3">
                        <AddressInput
                          placeholder="Address To Check"
                          value={account}
                          onChange={value => setAccount(value)}
                        />
                        <button
                          className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                            isLoadingCheckMinter ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                          }`}
                          onClick={checkIsMinter}
                          disabled={isLoadingCheckMinter}
                        >
                          <span>Check</span>
                        </button>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
              <div style={{ textAlign: "center" }}>
                <label
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  htmlFor="faucet-modalxChk"
                  className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
                >
                  <span>Check Is Black Listed</span>
                  <svg viewBox="0 0 1024 1024" fill="currentColor" className="h-6 w-6">
                    <path d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z" />
                    <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
                  </svg>
                </label>
                <input type="checkbox" id="faucet-modalxChk" className="modal-toggle" />
                <label htmlFor="faucet-modalxChk" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <input className="h-0 w-0 absolute top-0 left-0" />
                    <h3 className="text-xl font-bold mb-3">Is in Black List?</h3>
                    <label
                      htmlFor="faucet-modalxChk"
                      className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
                    >
                      ✕
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-3">
                        <AddressInput
                          placeholder="Address To Check"
                          value={account}
                          onChange={value => setAccount(value)}
                        />
                        <button
                          className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                            isLoadingCheckBL ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                          }`}
                          onClick={checkIsBlackList}
                          disabled={isLoadingCheckBL}
                        >
                          <span>Check</span>
                        </button>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
              <div style={{ textAlign: "center", height: 50 }}>
                <label
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  htmlFor="faucet-modalxMA"
                  className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
                >
                  <span>See Minter Allowanse</span>
                  <svg fill="currentColor" viewBox="0 0 1024 1024" className="h-6 w-6">
                    <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" />
                  </svg>
                </label>
                <input type="checkbox" id="faucet-modalxMA" className="modal-toggle" />
                <label htmlFor="faucet-modalxMA" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <input className="h-0 w-0 absolute top-0 left-0" />
                    <h3 className="text-xl font-bold mb-3">Available Allocated Token Amount</h3>
                    <label htmlFor="faucet-modalxMA" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                      ✕
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-3">
                        <AddressInput
                          placeholder="Minter Address to Check"
                          value={minter}
                          onChange={value => setMinter(value)}
                        />
                        <button
                          className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                            isLoadingMA ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                          }`}
                          onClick={seeAllowanse}
                          disabled={isLoadingMA}
                        >
                          <span>Inquire</span>
                        </button>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
              <div style={{ textAlign: "center", height: 50 }}>
                <label
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  htmlFor="faucet-CHM"
                  className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
                >
                  <span>Change/Update Role</span>
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-7h9v2h-4v3l-5-5zm5-4V6l5 5H8V9h4z" />
                  </svg>
                </label>
                <input type="checkbox" id="faucet-CHM" className="modal-toggle" />
                <label htmlFor="faucet-CHM" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <input className="h-0 w-0 absolute top-0 left-0" />
                    <h3 className="text-xl font-bold mb-3">Update New Roles</h3>
                    <label htmlFor="faucet-CHM" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
                      ✕
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-3">
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label className="label cursor-pointer">
                            <span className="label-text">Black Lister</span>
                            <input
                              onClick={() => setSelUpdated("b")}
                              value={"b"}
                              type="radio"
                              name="radio-10"
                              className="radio"
                              checked={selUpdated == "b"}
                            />
                          </label>
                          <label className="label cursor-pointer">
                            <span className="label-text">Master Minter</span>
                            <input
                              onClick={() => setSelUpdated("m")}
                              value={"m"}
                              type="radio"
                              name="radio-10"
                              className="radio"
                              checked={selUpdated == "m"}
                            />
                          </label>
                          <label className="label cursor-pointer">
                            <span className="label-text">Pauser</span>
                            <input
                              onClick={() => setSelUpdated("p")}
                              value={"p"}
                              type="radio"
                              name="radio-10"
                              className="radio"
                              checked={selUpdated == "p"}
                            />
                          </label>
                          <label className="label cursor-pointer">
                            <span className="label-text">Rescuer</span>
                            <input
                              onClick={() => setSelUpdated("r")}
                              value={"r"}
                              type="radio"
                              name="radio-10"
                              className="radio"
                              checked={selUpdated == "r"}
                            />
                          </label>
                        </div>
                        <AddressInput
                          placeholder="New Address for Update"
                          value={newAddress}
                          onChange={value => setNewAddress(value)}
                        />
                        <button
                          className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                            isLoadingCHM ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                          }`}
                          onClick={() => updatedRol()}
                          disabled={isLoadingCHM}
                        >
                          <span>Update</span>
                        </button>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isRescuer ? (
        <div className="collapse bg-base-200">
          <input type="checkbox" />
          <div
            style={{
              borderRadius: 10,
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20,
              backgroundColor: "hsl(var(--p) / var(--tw-bg-opacity))",
            }}
            className="collapse-title text-xl font-medium"
          >
            Rescuer Admin
          </div>
          <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }} className="collapse-content">
            <div className="grid grid-cols-1 gap-1" style={{ marginTop: 20 }}>
              <div style={{ textAlign: "center", height: 50 }}>
                <label
                  style={{ height: "100%", width: "100%", borderRadius: 10 }}
                  htmlFor="faucet-modalxRERC"
                  className="btn btn-primary btn-sm px-2 rounded-full font-normal space-x-2 normal-case"
                >
                  <span>Rescue ERC20</span>
                  <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                    <path d="M24 7.626v8.749c0 .597-.485 1.092-1.091 1.092h-5.447v5.452c0 .596-.485 1.092-1.091 1.092H7.629a1.094 1.094 0 01-1.091-1.092v-5.452H1.091A1.093 1.093 0 010 16.375V7.626c0-.597.485-1.092 1.091-1.092h5.447V1.082c0-.596.485-1.092 1.091-1.092h8.742c.596 0 1.091.485 1.091 1.092v5.452h5.447A1.1 1.1 0 0124 7.626zm-3.325 4.339l-2.192-1.649.333 1.042-4.891-.344c.152.304.243.638.243.992 0 .343-.081.667-.213.95l4.871-.364-.323 1.022zm-7.579.03l-.495-8 1.021.324-1.647-2.185-1.647 2.195 1.04-.334-.454 8c0 .597.485 1.093 1.091 1.093.596 0 1.091-.486 1.091-1.093z" />
                  </svg>
                </label>
                <input type="checkbox" id="faucet-modalxRERC" className="modal-toggle" />
                <label htmlFor="faucet-modalxRERC" className="modal cursor-pointer">
                  <label className="modal-box relative">
                    <input className="h-0 w-0 absolute top-0 left-0" />
                    <h3 className="text-xl font-bold mb-3">Rescue ERC20</h3>
                    <label
                      htmlFor="faucet-modalxRERC"
                      className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3"
                    >
                      ✕
                    </label>
                    <div className="space-y-3">
                      <div className="flex flex-col space-y-3">
                        <AddressInput
                          placeholder="Address Token Contract"
                          value={addressToken}
                          onChange={value => setAddressToken(value)}
                        />
                        <AddressInput
                          placeholder="Address To"
                          value={addressTo}
                          onChange={value => setAddressTo(value)}
                        />
                        <IntegerInput
                          value={amountToRescue}
                          onChange={updatedTxValue => {
                            updatedTxValue == ""
                              ? setAmountToRescue(BigNumber.from("0"))
                              : setAmountToRescue(BigNumber.from(updatedTxValue));
                          }}
                          placeholder="Amount to Rescue"
                        />
                        <button
                          className={`h-10 btn btn-primary btn-sm px-2 rounded-full space-x-3 ${
                            isLoadingAR ? "loading before:!w-4 before:!h-4 before:!mx-0" : ""
                          }`}
                          onClick={writeAsyncAR}
                          disabled={isLoadingAR}
                        >
                          <span>Acept to Rescue</span>
                        </button>
                      </div>
                    </div>
                  </label>
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default InitializeUI;
