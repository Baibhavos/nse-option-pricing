'use client'
import { computeGreeks } from "@/utils/computeGrees";
import { useState } from "react";

export default function GreeksCalculator() {
    const [data, setData] = useState<{ delta: number, gamma: number, vega: number, theta: number, rho: number } | null>(null);

    const fetchGreeks = async () => {
        try {
            const S = 18000;
            const K = 18000;
            const T = 0.0833;
            const r = 0.05;
            const sigma = 0.2;
            const isCall = true; // Use `true` or `false` based on whether it's a call option
            const model = "binomial_tree";

            // Call the computeGreeks function passing the data
            const result = await computeGreeks(S, K, T, r, sigma, isCall, model);

            // Update the state with the result
            setData(result);
        } catch (error) {
            console.error("Error fetching Greeks:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Option Greeks</h2>
            <button onClick={fetchGreeks} className="bg-green-500 text-white px-4 py-2 rounded">
                Compute Greeks
            </button>
            {data && (
                <div className="mt-4">
                    <p><strong>Delta:</strong> {data.delta}</p>
                    <p><strong>Gamma:</strong> {data.gamma}</p>
                    <p><strong>Vega:</strong> {data.vega}</p>
                    <p><strong>Theta:</strong> {data.theta}</p>
                    <p><strong>Rho:</strong> {data.rho}</p>
                </div>
            )}
        </div>
    );
}
