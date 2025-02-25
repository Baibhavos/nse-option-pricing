'use client'
import { useEffect, useState } from "react";
import { fetchLocalOptionChain } from "@/utils/fetchLocalOptionChaindata";
import { computeOptionPrice } from "@/utils/computeOptionPrice";
import { computeMonteCarloPrice } from "@/utils/computeMonteCarlo";

export default function OptionChain() {
    const [optionData, setOptionData] = useState<any>(null);
    const [computedPrices, setComputedPrices] = useState<{ [key: number]: number }>({});
    const [monteCarloPrices, setMonteCarloPrices] = useState<{ [key: number]: number }>({});


    useEffect(() => {
        async function getData() {
            const data = await fetchLocalOptionChain();
            setOptionData(data.options);

            const newPrices: { [key: number]: number } = {};
            for (const option of data.options) {
                const price = await computeOptionPrice(option.underlyingValue, option.strikePrice, 0.0833, 0.05, 0.2, 100, true);
                newPrices[option.strikePrice] = price;
            }
            setComputedPrices(newPrices);

            const monteCarloPrices: { [key: number]: number } = {};
            for (const option of data.options) {
                const price = await computeMonteCarloPrice(option.underlyingValue, option.strikePrice, 0.0833, 0.05, 0.2, 10000, true);
                monteCarloPrices[option.strikePrice] = price;
            }
            setMonteCarloPrices(monteCarloPrices);
        }
        getData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Local Option Chain (C++ Pricing)</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Strike Price</th>
                        <th className="border border-gray-300 px-4 py-2">Call LTP</th>
                        <th className="border border-gray-300 px-4 py-2">C++ Computed Call Price</th>
                        <th className="border border-gray-300 px-4 py-2">Monte Carlo Price</th>
                        <th className="border border-gray-300 px-4 py-2">Put LTP</th>
                    </tr>
                </thead>
                <tbody>
                    {optionData?.map((option: any, index: number) => (
                        <tr key={index} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{option.strikePrice}</td>
                            <td className="border border-gray-300 px-4 py-2 text-green-600">{option.callLTP}</td>
                            <td className="border border-gray-300 px-4 py-2 text-blue-600">
                                {computedPrices[option.strikePrice]?.toFixed(2) || "Loading..."}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-blue-600">
                                {monteCarloPrices[option.strikePrice]?.toFixed(2) || "Loading..."}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-red-600">{option.putLTP}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
