/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { AddressInput } from "../scaffold-eth/Input/AddressInput";
import { IntegerInput } from "../scaffold-eth/Input/IntegerInput";
// import { CopyIcon } from "./assets/CopyIcon";
// import { DiamondIcon } from "./assets/DiamondIcon";
// import { HareIcon } from "./assets/HareIcon";
import { BigNumber } from "ethers";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type MintInteractionProps = {
  setInter: (value: BigNumber) => void;
  inter: BigNumber;
};

export const MintInteraction: React.FC<MintInteractionProps> = ({ inter, setInter }) => {
  const [visible, setVisible] = useState(true);
  const [newToAddress, setNewToAddress] = useState("");
  const [newTokenAmount, setNewTokenAmount] = useState(BigNumber.from("0"));
  const visibilityStyle = visible ? "visible" : "hidden";

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "FiatTokenV1",
    functionName: "mint",
    args: [newToAddress, newTokenAmount],
    onBlockConfirmation: (txnReceipt: any) => {
      console.log("📦 Transaction blockHash", txnReceipt);
      setInter(newTokenAmount);
      setNewToAddress("");
      setNewTokenAmount(BigNumber.from("0"));
    },
  });

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className="flex relative pb-10" style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div
          style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginTop: 20 }}
          className="card card-compact w-96 bg-base-100 shadow-xl"
        >
          <div className="card-body">
            <h2 className="card-title">Mint Tokens</h2>
            <div className="card-body justify-center">
              <AddressInput value={newToAddress} placeholder="Address To" onChange={setNewToAddress} />
              <div style={{ width: "50%" }}>
                <IntegerInput
                  value={newTokenAmount}
                  placeholder="Amount to Gift"
                  onChange={updatedTxValue => {
                    updatedTxValue == ""
                      ? setNewTokenAmount(BigNumber.from("0"))
                      : setNewTokenAmount(BigNumber.from(updatedTxValue));
                  }}
                />
              </div>
            </div>
            <div className="card-actions justify-end">
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
            <div className="justify-right">
              <span className="text-sm leading-tight">Price:</span>
              <div className="badge badge-warning">0.01 ETH + Gas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
