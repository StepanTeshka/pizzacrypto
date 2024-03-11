import { addressContract, config } from "../../config";
import { abi } from "../utils/abi";
import { useWatchContractEvent } from "wagmi";

export const ParicipatesInformation = () => {
  const unwatch = useWatchContractEvent({
    address: addressContract,
    abi: abi,
    eventName: "Participates",
    onLogs(logs) {
      console.log("Logs changed!", logs);
      const participants = logs.map((log) => console.log(log.data));
    //   console.log("Participates:", participants);
    },
    
  });
    
  return (
    <div>
      <h3>Participants</h3>
    </div>
  );
};
