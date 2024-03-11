"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { useAccount } from "wagmi";

export const Bg = ({ children }: PropsWithChildren) => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.replace("/authorization");
    } else {
      router.replace("/");
    }
  }, [router, isConnected]);

  return <main className="h-screen">{children}</main>;
};
