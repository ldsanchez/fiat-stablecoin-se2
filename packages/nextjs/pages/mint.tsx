import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { MintInteraction } from "~~/components/mint/MintInteraction";

const MintUI: NextPage = () => {
  return (
    <>
      <MetaHeader title="Mint UI | Scaffold-ETH 2" description="Mint UI created with 🏗 Scaffold-ETH 2.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <MintInteraction />
        <ContractData />
      </div>
    </>
  );
};

export default MintUI;
