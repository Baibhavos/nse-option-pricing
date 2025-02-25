export async function fetchNSEOptionChain(symbol: string) {
    const backendUrl = `http://localhost:5000/api/nse-option-chain?symbol=${symbol}`;

    const response = await fetch(backendUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch NSE data");
    }

    return await response.json();
}
