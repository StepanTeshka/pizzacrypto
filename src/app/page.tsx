"use client";
import { Bg } from "~/components/Background";
import { InformationParicipate } from "~/components/InformationParticipate";
import { ParicipatesInformation } from "~/components/ParicipatesInformation";
import { TimeRoulette } from "~/components/TimeRoulette";
import { Wheel } from "~/components/Wheel";

export default function Home() {
  return (
    <Bg>
      <div className="h-screen flex justify-center items-center flex-col">
        <TimeRoulette />
        <Wheel />
        <InformationParicipate />
        {/* <ParicipatesInformation /> */}
      </div>
    </Bg>
  );
}
