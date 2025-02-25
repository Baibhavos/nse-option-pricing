import express from "express";
import { exec } from "child_process";
import cors from "cors";
import axios from "axios";
import puppeteer from "puppeteer";

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

const sampleOptionChain = {
    symbol: "NIFTY",
    expiryDate: "2025-03-28",
    options: [
        { strikePrice: 17500, callLTP: 120, putLTP: 85, underlyingValue: 17600 },
        { strikePrice: 17600, callLTP: 90, putLTP: 100, underlyingValue: 17600 },
        { strikePrice: 17700, callLTP: 70, putLTP: 120, underlyingValue: 17600 },
    ],
};

app.get("/option-chain", (req, res) => {
    res.json(sampleOptionChain);
});

app.post("/compute-option", (req, res) => {
    const { S, K, T, r, sigma, N, isCall } = req.body;
    console.log("Received request:", req.body);

    if (!S || !K || !T || !r || !sigma || !N) {
        res.status(400).json({ error: "Missing parameters" });
        return;
    }

    const isWindows = process.platform === "win32";
    const command = isWindows
        ? `option_pricing.exe ${S} ${K} ${T} ${r} ${sigma} ${N} ${isCall ? 1 : 0}`
        : `./option_pricing ${S} ${K} ${T} ${r} ${sigma} ${N} ${isCall ? 1 : 0}`;

    exec(command, { cwd: "./build", shell: isWindows ? "cmd.exe" : "/bin/sh" }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${stderr}`);
            console.error(error);
            res.status(500).json({ error: "Pricing model failed", details: stderr });
            return;
        }
        console.log(`Pricing result: ${stdout}`);
        res.json({ price: parseFloat(stdout) });
    });
});

app.get("/option-comparison", (req, res) => {
    const { S, K, T, r, sigma, isCall, numSimulations, numThreads } = req.query;

    if (!S || !K || !T || !r || !sigma || !numSimulations || !numThreads) {
        res.status(400).json({ error: "Missing parameters" });
        return;
    }

    const isCallBinary = isCall === "true" ? 1 : 0;

    const command = `./compare_models ${S} ${K} ${T} ${r} ${sigma} ${isCallBinary} ${numSimulations} ${numThreads}`;

    exec(command, { cwd: './build' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing C++: ${error}`);
            return res.status(500).json({ error: stderr || "Error running model" });
        }
        res.status(200).json(JSON.parse(stdout));
    });
});

app.get('/compute-greeks', (req, res) => {
    const { S, K, T, r, sigma, isCall, model } = req.query;

    if (!S || !K || !T || !r || !sigma || !model) {
        res.status(400).json({ error: "Missing parameters" });
        return;
    }

    const isCallBinary = isCall === "true" ? 1 : 0;

    const command = `./compute_greeks ${S} ${K} ${T} ${r} ${sigma} ${isCallBinary} ${model}`;

    exec(command, { cwd: './build' }, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ error: stderr || "Error computing Greeks" });
        }
        try {
            const output = JSON.parse(stdout);
            res.status(200).json(output);
        } catch (parseError) {
            res.status(500).json({ error: "Error parsing output from command" });
        }
    });
});


app.get("/api/nse-option-chain", async (req, res) => {
    const symbol = req.query.symbol as string;
    if (!symbol) {
        res.status(400).json({ error: "Symbol is required" });
        return;
    }

    const url = `https://www.nseindia.com/option-chain`;

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        );

        await page.goto(url, { waitUntil: "networkidle2" });

        // Fetch API response
        const apiUrl = `https://www.nseindia.com/api/option-chain-indices?symbol=${symbol}`;
        const response = await page.evaluate(async (apiUrl) => {
            return fetch(apiUrl, {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "application/json",
                    "Referer": "https://www.nseindia.com",
                },
            }).then((res) => res.json());
        }, apiUrl);

        await browser.close();
        res.json(response);
    } catch (error: any) {
        console.error("Error fetching NSE data:", error.message);
        res.status(500).json({ error: "Failed to fetch NSE data", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});

