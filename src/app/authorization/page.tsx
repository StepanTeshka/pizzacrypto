"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { Bg } from "~/components/Background";
import Button from "~/components/ui/Button";

export default function Authorization() {
  const { open } = useWeb3Modal();
  return (
    <Bg>
      <div className="h-screen flex justify-center items-center">
        <div className="flex justify-center items-center flex-col gap-4">
          <p className="text-[#A64B00] flex flex-col text-center text-2xl">
            Want to enter the pizza giveaway?{" "}
            <span>Buy a piece and win a whole one!</span>
          </p>
          <Button onClick={() => open()}>
            Connect
          </Button>
        </div>
      </div>
    </Bg>
  );
}
