export async function compareOptions(S: number, K: number, T: number, r: number, sigma: number, isCall: boolean, numSimulations: number, numThreads: number) {
    const url = new URL("http://localhost:5000/option-comparison");
    url.searchParams.append("S", S.toString());
    url.searchParams.append("K", K.toString());
    url.searchParams.append("T", T.toString());
    url.searchParams.append("r", r.toString());
    url.searchParams.append("sigma", sigma.toString());
    url.searchParams.append("isCall", isCall.toString());
    url.searchParams.append("numSimulations", numSimulations.toString());
    url.searchParams.append("numThreads", numThreads.toString());

    const response = await fetch(url, { method: "GET" });

    if (!response.ok) throw new Error("C++ Pricing API failed");
    const data = await response.json();
    return data;
}
