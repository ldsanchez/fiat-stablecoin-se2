/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

type ContractDataProps = {
  setInter: (value: BigNumber) => void;
  inter: BigNumber;
};

export const ContractData: React.FC<ContractDataProps> = ({ inter, setInter }) => {
  const { address } = useAccount();
  const [minter, setMinter] = useState("");
  const [contaShow, setContaShow] = useState(0);
  const [contaShow2, setContaShow2] = useState(0);
  const [totalSended, setTotalSended] = useState(0);

  const { isLoading: isLoadingMA, data: dataMA } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "minterAllowance",
    args: [minter],
  });

  useEffect(() => {
    if (address == undefined) {
      setContaShow(contaShow + 1);
    } else {
      if (address !== "") {
        setMinter(address!);
      }
    }
  }, [contaShow]);

  useEffect(() => {
    if (inter.toNumber() > 0) {
      setTotalSended(totalSended + inter.toNumber());
      setInter(BigNumber.from("0"));
    }
  }, [inter]);

  useEffect(() => {
    if (myGreetingChangeEvents != undefined) {
      console.log("Events:", myGreetingChangeEvents, myGreetingChangeEvents?.length);
      let total = 0;
      for (let i = 0; i < (myGreetingChangeEvents?.length ? myGreetingChangeEvents?.length : 0); ++i) {
        const item = myGreetingChangeEvents ? myGreetingChangeEvents[i] : null;
        if (item != null) {
          console.log("item tot", item.args[2].toNumber());
          total = total + item.args[2].toNumber();
        }
      }
      setTotalSended(total);
    } else {
      setContaShow2(contaShow2 + 1);
    }
  }, [contaShow2]);

  useEffect(() => {
    if (address == undefined) {
      setContaShow(contaShow + 1);
    } else {
      if (address !== "") {
        setMinter(address!);
      }
    }

    console.log("Events:", myGreetingChangeEvents);
    if (myGreetingChangeEvents != undefined) {
      console.log("Events:", myGreetingChangeEvents, myGreetingChangeEvents?.length);
      let total = 0;
      for (let i = 0; i < (myGreetingChangeEvents?.length ? myGreetingChangeEvents?.length : 0); ++i) {
        const item = myGreetingChangeEvents ? myGreetingChangeEvents[i] : null;
        if (item != null) {
          console.log("item tot", item.args[2].toNumber());
          total = total + item.args[2].toNumber();
        }
      }
      setTotalSended(total);
    } else {
      setContaShow2(contaShow2 + 1);
    }
  }, []);
  /* 
  useEffect(() => {
    if (account !== undefined && account !== ""){
      if (!dataCheckMinter){
        setShowMinter(false)
      } else {
        setShowMinter(true)
      }
    }
  }, [account]); */

  useScaffoldEventSubscriber({
    contractName: "FiatTokenV1",
    eventName: "Mint",
    listener: (minter, to, amount) => {
      console.log(minter, to, amount);
    },
  });

  const {
    data: myGreetingChangeEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "FiatTokenV1",
    eventName: "Mint",
    fromBlock: 0,
    filters: { minter: minter },
    blockData: true,
  });

  return (
    <div
      style={{
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 15,
        borderWidth: 2,
        borderStyle: "solid",
        height: "fit-content",
      }}
      className="card w-96 text-primary-content"
    >
      <div className="card-body">
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Tokens Allowance</div>
            <div className="stat-value">{dataMA?.toString()}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Tokens Minted</div>
            <div className="stat-value text-secondary">{totalSended}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Tokens</div>
            <div className="stat-value">{(dataMA ? dataMA.toNumber() : 0) + totalSended}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
