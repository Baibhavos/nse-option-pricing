import GreeksCalculator from "@/components/Greeks";
import OptionChain from "@/components/Optionchain";
import OptionComparison from "@/components/OptionComparison";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <OptionChain />
      <OptionComparison />
      <GreeksCalculator />
    </>
  );
}
