/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import Link from "next/link";
import Blockexplorer from "./blockexplorer";
import type { NextPage } from "next";
import { BoltIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useRoles, useScaffoldContractRead, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { isInitialize } = useRoles();
  const [totalHolders, setTotalHolders] = useState(0);
  const { data: totalSupply } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "totalSupply",
  });

  const {
    data: transferHistory,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "FiatTokenV1",
    eventName: "Transfer",
    fromBlock: 0,
    blockData: true,
  });

  const { data: decimals } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "getTokenDecimals",
  });

  useEffect(() => {
    if (transferHistory) {
      console.log("ey papa");
      let totalHoldersTmp = 0;
      const conteoIncidencias: any = {};

      transferHistory.forEach(objeto => {
        const valor = objeto.args[1];
        console.log("objeti iter", objeto.args[1], conteoIncidencias[valor]);
        conteoIncidencias[valor] = (conteoIncidencias[valor] || 0) + 1;
        totalHoldersTmp += 1;
      });
      console.log("ey papa", conteoIncidencias);
      setTotalHolders(Object.keys(conteoIncidencias).length);
    }
  }, [transferHistory]);

  return (
    <>
      <MetaHeader />
      <div className="flex items-center flex-col flex-grow pt-10" style={{ paddingTop: 0 }}>
        <div className="px-5">
          <h2 className="text-center" style={{ marginBottom: 10, marginTop: 10 }}>
            {/* <span className="block text-2xl mb-2">Welcome to</span> */}
            <span style={{ fontSize: 24 }} className="block font-bold">
              Fiat Stablecoin Manager
            </span>
          </h2>
          {/* <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold">packages/nextjs/pages/index.tsx</code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract <code className="italic bg-base-300 text-base font-bold">YourContract.sol</code> in{" "}
            <code className="italic bg-base-300 text-base font-bold">packages/hardhat/contracts</code>
          </p> */}
        </div>

        {!isInitialize && (
          <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12" style={{ marginTop: 0 }}>
            <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
              <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
                <BoltIcon className="h-8 w-8 fill-secondary" />
                <p>
                  <Link href="/initialize" passHref className="link">
                    Initialize Token
                  </Link>{" "}
                </p>
              </div>
              {/* <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <SparklesIcon className="h-8 w-8 fill-secondary" />
              <p>
                Experiment with{" "}
                <Link href="/example-ui" passHref className="link">
                  Example UI
                </Link>{" "}
                to build your own UI.
              </p>
            </div> */}
              {/* <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <CircleStackIcon className="h-8 w-8 fill-secondary" />
              <p>
                <Link href="/mint" passHref className="link">
                  Mint Tokens
                </Link>{" "}
              </p>
            </div> 
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>*/}
            </div>
          </div>
        )}
        {isInitialize && (
          <div className="card-body">
            <div className="stats shadow">
              <div className="stat place-items-center">
                <div className="stat-title">MAX TOTAL SUPPLY</div>
                <div className="stat-value">{totalSupply?.toNumber()}</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">HOLDERS</div>
                <div className="stat-value text-secondary">{totalHolders}</div>
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">TOTAL TRANSFERS</div>
                <div className="stat-value">{transferHistory ? transferHistory.length : 0}</div>
              </div>
            </div>
            <div className="stats shadow">
              <div className="stat place-items-center">
                <div className="stat-title">{`TOKEN CONTRACT`}</div>
                <div style={{ fontSize: 16 }} className="stat-value">
                  {"0x5FbDB2315678afecb367f032d93F642f64180aa3"}
                </div>
              </div>
            </div>
          </div>
        )}
        {isInitialize && <Blockexplorer />}
      </div>
    </>
  );
};

export default Home;
