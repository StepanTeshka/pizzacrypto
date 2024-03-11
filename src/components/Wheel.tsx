import React, { useEffect, useState } from "react";
import { useReadContract } from "wagmi";
import { addressContract } from "../../config";
import { abi } from "~/utils/abi";

export const Wheel = () => {
  const [segments, setSegments] = useState<Array<String>>([]);
  const [selectedSegment, setSelectedSegment] = useState<string>();
  const [rotation, setRotation] = useState<number>();

  const lastWin = useReadContract({
    address: addressContract,
    abi: abi,
    functionName: "lastWin",
  });

  useEffect(() => {
    setSelectedSegment(String(lastWin.data));

    const rotationAngle =
      selectedSegment && segments.includes(selectedSegment)
        ? (360 / segments.length) * segments.indexOf(selectedSegment)
        : 0;
    setRotation(rotationAngle);
  }, [lastWin]);

  const lengthParticipants = useReadContract({
    address: addressContract,
    abi: abi,
    functionName: "lengthParticipants",
  });

  useEffect(() => {
    if (lengthParticipants.data) {
      const newSegments = [];
      for (let i = 0; i < Number(lengthParticipants.data); i++) {
        newSegments.push(String(i + 1));
      }
      setSegments(newSegments);
    }
  }, [lengthParticipants.data]);

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-96 h-96">
        <div
          className="bg-blue-500 rounded-full w-full h-full relative flex justify-center items-center"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {segments.map((segment, index) => (
            <React.Fragment key={index}>
              <div
                className="segment text-white text-xl font-bold absolute"
                style={{
                  transform: `rotate(${
                    index * (360 / segments.length)
                  }deg) translate(10rem) rotate(-${
                    index * (360 / segments.length)
                  }deg)`,
                }}
              >
                {segment}
              </div>
              {index < segments.length - 1 && (
                <div
                  className="h-full w-1 bg-black absolute left-1/2"
                  style={{
                    transform: `rotate(${
                      (360 / segments.length) * (index + 1) - 0.5 // Небольшой сдвиг для разделительной полосы
                    }deg)`,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="marker w-1 h-12 bg-red-500 absolute right-0 transform -translate-y-1/2 rotate-90 top-1/2"></div>
      </div>
    </div>
  );
};
