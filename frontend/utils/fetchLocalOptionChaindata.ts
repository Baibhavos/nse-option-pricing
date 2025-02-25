export async function fetchLocalOptionChain() {
    const response = await fetch("http://localhost:5000/option-chain");
    if (!response.ok) throw new Error("Failed to fetch local data");
    return await response.json();
}
