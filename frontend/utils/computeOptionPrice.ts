export async function computeOptionPrice(S: number, K: number, T: number, r: number, sigma: number, steps: number, isCall: boolean) {
    const response = await fetch("http://localhost:5000/compute-option", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ S, K, T, r, sigma, N: steps, isCall }),
    });

    if (!response.ok) throw new Error("C++ Pricing API failed");
    const data = await response.json();
    return data.price;
}
