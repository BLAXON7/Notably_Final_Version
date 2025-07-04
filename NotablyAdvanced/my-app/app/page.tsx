"use c;ient";

import { Inter } from "next/font/google";
import LoginButton from "@/components/LoginButton";

const inter = Inter({
  subsets: [],
  weight: ["500"],
});
export default function Home() {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-700 flex justify-center items-center">
      <div className="border border-emerald-400/30 p-8 m-10 w-[90%] md:w-[50%] rounded-2xl backdrop-blur-xl bg-emerald-950/60 shadow-2xl shadow-emerald-900 h-[60%] justify-center flex ">
        <div className="gap-10 flex flex-col items-center mt-24">
          <p
            className={`text-center text-4xl md:text-5xl font-bold text-emerald-200 drop-shadow-lg ${inter.className}`}
          >
            Welcome to Notably
          </p>
          <p className="text-center font-thin text-emerald-100 drop-shadow-lg text-lg">
            A creative Application to take care of your Notes!
          </p>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
