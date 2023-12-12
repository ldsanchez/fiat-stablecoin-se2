import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/initialize/ContractData";
import { InitializeInteraction } from "~~/components/initialize/InitializeInteraction";
import { useRoles } from "~~/hooks/scaffold-eth";

const InitializeUI: NextPage = () => {
  const { isInitialize } = useRoles();

  return (
    <>
      <MetaHeader title="Initialize UI | Scaffold-ETH 2" description="Initialize UI created with 🏗 Scaffold-ETH 2.">
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className={`grid ${isInitialize ? "lg:grid-cols-1" : "lg:grid-cols-2"} flex-grow`}>
        {!isInitialize && <InitializeInteraction />}
        <ContractData />
      </div>
    </>
  );
};

export default InitializeUI;
