/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useRouter } from "next/router";
import { AddressInput } from "../scaffold-eth/Input/AddressInput";
import { IntegerInput } from "../scaffold-eth/Input/IntegerInput";
import { BigNumber } from "ethers";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const InitializeInteraction = () => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenCurrency, setTokenCurrency] = useState("");
  const [tokenDecimals, setTokenDecimals] = useState(0);
  const [newMasterMinter, setNewMasterMinter] = useState("");
  const [newPauser, setNewPauser] = useState("");
  const [newBlacklister, setNewBlacklister] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [newRescue, setNewRescue] = useState("");
  const router = useRouter();

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "initializeToken",
    args: [
      tokenName,
      tokenSymbol,
      tokenCurrency,
      tokenDecimals,
      newMasterMinter,
      newPauser,
      newBlacklister,
      newOwner,
      newRescue,
    ],
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      //router.push(`/infotoken`);
      const timer = setTimeout(() => {
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    },
  });

  const onInit = async () => {
    await writeAsync();
  };

  return (
    <div className="flex">
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.7)",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 15,
          marginBottom: 15,
          borderWidth: 2,
          borderStyle: "solid",
        }}
        className="card w-96 text-primary-content"
      >
        <div className="card-body">
          <h1 className="card-title">Initialize Token</h1>
          <div className="divider"></div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div className="mt-8 flex sm:flex-row items-start sm:items-center gap-2 sm:gap-5  w-full">
              <input
                type="text"
                placeholder="Set the Token Name"
                className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray uppercase"
                onChange={e => setTokenName(e.target.value)}
              />
            </div>
            <div className="mt-8 flex sm:flex-row items-start sm:items-center gap-2 sm:gap-5  w-full">
              <input
                type="text"
                placeholder="Set the Token Symbol"
                className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray uppercase"
                onChange={e => setTokenSymbol(e.target.value)}
              />
            </div>
          </div>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div className="mt-8 flex sm:flex-row items-start sm:items-center gap-2 sm:gap-5  w-full">
              <input
                type="text"
                placeholder="Set the Token Decimals"
                className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray uppercase"
                onChange={e => setTokenDecimals(parseInt(e.target.value))}
              />
            </div>
            <div className="mt-8 flex sm:flex-row items-start sm:items-center gap-2 sm:gap-5  w-full">
              <input
                type="text"
                placeholder="Set the Token Currency"
                className="input font-bai-jamjuree w-full px-5 border border-primary text-lg sm:text-2xl placeholder-gray uppercase"
                onChange={e => setTokenCurrency(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8 flex new sm:flex-row items-start sm:items-center gap-2 sm:gap-5  w-full">
            <AddressInput
              value={newMasterMinter}
              placeholder="Write the recipient's address for Master Minter"
              onChange={setNewMasterMinter}
            />
          </div>
          <div className="mt-8 flex new sm:flex-row items-start sm:items-center gap-2 sm:gap-5  w-full">
            <AddressInput
              value={newPauser}
              placeholder="Write the recipient's address for Pauser"
              onChange={setNewPauser}
            />
          </div>
          <div className="mt-8 flex new sm:flex-row items-start sm:items-center gap-2 sm:gap-5  w-full">
            <AddressInput
              value={newBlacklister}
              placeholder="Write the recipient's address for Black Lister"
              onChange={setNewBlacklister}
            />
          </div>
          <div className="mt-8 flex new sm:flex-row items-start sm:items-center gap-2 sm:gap-5  w-full">
            <AddressInput
              value={newOwner}
              placeholder="Write the recipient's address for Owner"
              onChange={setNewOwner}
            />
          </div>
          <div className="mt-8 flex new sm:flex-row items-start sm:items-center gap-2 sm:gap-5  w-full">
            <AddressInput
              value={newRescue}
              placeholder="Write the recipient's address for Rescue"
              onChange={setNewRescue}
            />
          </div>
          <div className="card-actions justify-end">
            <button onClick={() => onInit()} className="btn">
              Initialize
            </button>
          </div>
          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div>
        </div>
      </div>
    </div>
  );
};
