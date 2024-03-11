import { BaseError, useConfig, useReadContract } from "wagmi";
import { addressContract } from "../../config";
import { abi } from "~/utils/abi";
import { useEffect, useState } from "react";
import { writeContract } from "viem/actions";

export const TimeRoulette = () => {
  const result = useReadContract({
    address: addressContract,
    abi: abi,
    functionName: "lastRouletteTime",
  });

  const config = useConfig();

  const onRunRullette = async () => {
    try {
      const result = await writeContract(config, {
        abi,
        address: addressContract,
        functionName: "runRoulette",
      });
    } catch (e) {
      const error = e as BaseError;
      console.log(error);
    }
  };
  const [currentTime, setCurrentTime] = useState<Date>();
  const [onEndTime, setEndTime] = useState<Date>();

  useEffect(() => {
    const startTime = new Date(Number(result.data) * 1000);
    const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);
    setEndTime(endTime);
    const updateTimer = () => {
      const timeDifference = new Date(endTime.getTime() - Date.now());
      setCurrentTime(timeDifference);
    };
    const timerId = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [result.data]);

  if (currentTime === onEndTime) {
    onRunRullette();
  }

  return (
    <div>
      <p>
        Time util next spin:
        <span>
          {currentTime
            ? `${currentTime.getUTCHours()}:${currentTime.getUTCMinutes()}:${currentTime.getUTCSeconds()}`
            : "00:00:00"}
        </span>
      </p>
    </div>
  );
};
