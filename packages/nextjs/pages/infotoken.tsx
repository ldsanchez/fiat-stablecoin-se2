/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/initialize/ContractData";
import { InitializeInteraction } from "~~/components/initialize/InitializeInteraction";

const InitializeUI: NextPage = () => {
  return (
    <>
      <MetaHeader title="Initialize UI | Scaffold-ETH 2" description="Initialize UI created with 🏗 Scaffold-ETH 2.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-1 flex-grow">
        <ContractData />
      </div>
    </>
  );
};

export default InitializeUI;
