export async function computeMonteCarloPrice(S: number, K: number, T: number, r: number, sigma: number, numSimulations: number, isCall: boolean) {
    const response = await fetch("http://localhost:5001/compute-monte-carlo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ S, K, T, r, sigma, numSimulations, isCall }),
    });

    if (!response.ok) throw new Error("Monte Carlo API failed");
    const data = await response.json();
    return data.price;
}
