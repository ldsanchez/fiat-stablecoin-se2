import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

// Define tu hook personalizado con el prefijo 'use'
export const useRoles = () => {
  const [isMinter, setIsMinter] = useState(false);
  const [isMMinter, setIsMMinter] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isPauser, setIsPauser] = useState(false);
  const [isBlister, setIsBlister] = useState(false);
  const [isRescuer, setIsRescuer] = useState(false);
  const [isInitialize, setIsInitialize] = useState(false);

  const [contaShow, setContaShow] = useState(0);
  const [contaIni, setContaIni] = useState(0);
  const { address } = useAccount();

  const { data: dataCheckInit } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "getIsInitialized",
  });

  const { data: dataCheckMinter } = useScaffoldContractRead({
    contractName: "FiatTokenV1",
    functionName: "isMinter",
    args: [address],
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

  useEffect(() => {
    console.log("ini two", address, masterMinter);
    if (address == undefined || masterMinter == undefined) {
      setContaShow(contaShow + 1);
    } else {
      if (address !== "") {
        checkRoles(address);
      }
    }
    //checkIsMinter()
  }, [contaShow]);

  useEffect(() => {
    if (dataCheckInit == undefined) {
      setContaIni(contaIni + 1);
    } else {
      if (dataCheckInit) {
        setIsInitialize(true);
      } else {
        setIsInitialize(false);
      }
    }
  }, [contaIni]);

  useEffect(() => {
    console.log("ini", address, masterMinter);
    if (address == undefined) {
      setContaShow(contaShow + 1);
    } else {
      if (address !== "") {
        checkRoles(address);
      }
    }

    if (dataCheckInit == undefined) {
      setContaIni(contaIni + 1);
    } else {
      if (dataCheckInit) {
        setIsInitialize(true);
      } else {
        setIsInitialize(false);
      }
    }
  }, []);

  const checkRoles = (address: string | undefined) => {
    if (address == masterMinter) {
      setIsMMinter(true);
    }

    if (address == blacklister) {
      setIsBlister(true);
    }

    if (address == pauser) {
      setIsPauser(true);
    }

    if (address == owner) {
      setIsOwner(true);
    }

    if (address == rescuer) {
      setIsRescuer(true);
    }

    console.log("dataCheckMinter", dataCheckMinter);
    if (dataCheckMinter) {
      console.log("trueeeeeeee");
      setIsMinter(true);
    } else {
      console.log("falseeeeeee");
      setIsMinter(false);
    }
  };

  return {
    isBlister,
    isMMinter,
    isMinter,
    isOwner,
    isPauser,
    isInitialize,
    isRescuer,
  };
};
