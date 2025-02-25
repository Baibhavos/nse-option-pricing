'use client'

import { compareOptions } from "@/utils/optionComparison";
import { useState } from "react";

export default function OptionComparison() {
    const [data, setData] = useState<{ binomial: number, monte_carlo: number } | null>(null);

    const fetchComparison = async () => {
        const S = 18000;
        const K = 18000;
        const T = 0.0833;
        const r = 0.05;
        const sigma = 0.2;
        const isCall = true;
        const numSimulations = 10000;
        const numThreads = 4;

        const result = await compareOptions(S, K, T, r, sigma, isCall, numSimulations, numThreads);

        console.log(result);

        setData(result);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Option Pricing Comparison</h2>
            <button onClick={fetchComparison} className="bg-blue-500 text-white px-4 py-2 rounded">
                Compare Prices
            </button>
            {data && (
                <div className="mt-4">
                    <p><strong>Binomial Price:</strong> {data.binomial}</p>
                    <p><strong>Monte Carlo Price:</strong> {data.monte_carlo}</p>
                </div>
            )}
        </div>
    );
}
