import { useReadContract } from "wagmi";
import { addressContract } from "../../config";
import { abi } from "~/utils/abi";
import { useEffect, useState } from "react";

export const TimeRoulette = () => {
  const result = useReadContract({
    address: addressContract,
    abi: abi,
    functionName: "lastRouletteTime",
  });
  const [currentTime, setCurrentTime] = useState<Date>();

  useEffect(() => {
    const startTime = new Date(Number(result.data) * 1000);
    const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);
    const updateTimer = () => {
      const timeDifference = new Date(endTime.getTime() - Date.now());
      setCurrentTime(timeDifference);
    };
    const timerId = setInterval(updateTimer, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [result.data]);

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
