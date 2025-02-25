export function binomialTree(
    S: number, K: number, T: number, r: number, sigma: number, N: number, isCall: boolean
): number {
    const dt = T / N;
    const u = Math.exp(sigma * Math.sqrt(dt));
    const d = 1 / u;
    const p = (Math.exp(r * dt) - d) / (u - d);

    let prices: number[] = new Array(N + 1);
    let optionValues: number[] = new Array(N + 1);

    for (let i = 0; i <= N; i++) {
        prices[i] = S * Math.pow(u, N - i) * Math.pow(d, i);
        optionValues[i] = Math.max(0, isCall ? prices[i] - K : K - prices[i]);
    }

    for (let j = N - 1; j >= 0; j--) {
        for (let i = 0; i <= j; i++) {
            optionValues[i] = (p * optionValues[i] + (1 - p) * optionValues[i + 1]) * Math.exp(-r * dt);
        }
    }

    return optionValues[0];
}
