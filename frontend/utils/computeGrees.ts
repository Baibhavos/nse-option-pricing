export async function computeGreeks(S: number, K: number, T: number, r: number, sigma: number, isCall: boolean, model: string) {
    try {
        const url = new URL("http://localhost:5000/compute-greeks");
        url.searchParams.append("S", S.toString());
        url.searchParams.append("K", K.toString());
        url.searchParams.append("T", T.toString());
        url.searchParams.append("r", r.toString());
        url.searchParams.append("sigma", sigma.toString());
        url.searchParams.append("isCall", isCall.toString());
        url.searchParams.append("model", model);

        const response = await fetch(url.toString(), {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
            throw new Error("Greeks API failed: " + response.statusText);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error computing Greeks:", error);
        throw new Error("Error computing Greeks");
    }
}
