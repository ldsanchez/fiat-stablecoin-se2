import { useState } from "react";
import { BigNumber } from "ethers";
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/mint/ContractData";
import { MintInteraction } from "~~/components/mint/MintInteraction";

const MintUI: NextPage = () => {
  const [send, setSend] = useState(BigNumber.from("0"));
  return (
    <>
      <MetaHeader title="Mint UI | Scaffold-ETH 2" description="Mint UI created with 🏗 Scaffold-ETH 2.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-1">
        <MintInteraction inter={send} setInter={setSend} />
        <ContractData inter={send} setInter={setSend} />
      </div>
    </>
  );
};

export default MintUI;
