/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
// import Marquee from "react-fast-marquee";
import { useAccount } from "wagmi";
import {
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 5;

export const ContractData = () => {
  const { address } = useAccount();
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const { data: isInitialized } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "getIsInitialized",
  });

  const { data: tokenName } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "getTokenName",
  });

  const { data: tokenSymbol } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "getTokenSymbol",
  });

  const { data: tokenCurrency } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "getTokenCurrency",
  });

  const { data: tokenDecimals } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "getTokenDecimals",
  });

  const { data: masterMinter } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "getMasterMinter",
  });

  const { data: pauser } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "pauser",
  });

  const { data: rescuer } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "rescuer",
  });

  const { data: blacklister } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "blacklister",
  });

  const { data: owner } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "owner",
  });

  const { data: totalSupply } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "totalSupply",
  });

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
    fromBlock: Number(process.env.NEXT_PUBLIC_DEPLOY_BLOCK) || 0,
    filters: { minter: address },
    blockData: true,
  });

  console.log("Events:", isLoadingEvents, errorReadingEvents, myGreetingChangeEvents);

  const { data: yourContract } = useScaffoldContract({ contractName: "FiatTokenV1" });
  console.log("FiatTokenV1: ", yourContract);

  useEffect(() => {
    if (transitionEnabled && containerRef.current && greetingRef.current) {
      setMarqueeSpeed(
        Math.max(greetingRef.current.clientWidth, containerRef.current.clientWidth) / MARQUEE_PERIOD_IN_SEC,
      );
    }
  }, [transitionEnabled, containerRef, greetingRef]);

  return (
    <div
      style={{
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
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Total Supply</div>
            <div className="stat-value">{totalSupply?.toString() || "0"}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Initialized</div>
            <div className="stat-value text-secondary">{isInitialized?.toString() || "false"}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Token Name</div>
            <div className="stat-value">{tokenName?.toString() || "NA"}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Token Symbol</div>
            <div className="stat-value">{tokenSymbol?.toString() || "NA"}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Token Currency</div>
            <div className="stat-value text-secondary">{tokenCurrency?.toString() || "NA"}</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Token Decimals</div>
            <div className="stat-value">{tokenDecimals?.toString() || "NA"}</div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Master Minter</div>
            <div style={{ fontSize: 18 }} className="stat-value">
              {masterMinter?.toString() || "NA"}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Pauser</div>
            <div style={{ fontSize: 18 }} className="stat-value text-secondary">
              {pauser?.toString() || "NA"}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Black Lister</div>
            <div style={{ fontSize: 18 }} className="stat-value">
              {blacklister?.toString() || "NA"}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Owner</div>
            <div style={{ fontSize: 18 }} className="stat-value text-secondary">
              {owner?.toString() || "NA"}
            </div>
          </div>
        </div>
        <div className="stats shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Rescuer</div>
            <div style={{ fontSize: 18 }} className="stat-value">
              {rescuer?.toString() || "NA"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
