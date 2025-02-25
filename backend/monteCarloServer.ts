import express from "express";
import { exec } from "child_process";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/compute-monte-carlo", (req, res) => {
    const { S, K, T, r, sigma, numSimulations, isCall } = req.body;

    const command = `./monte_carlo ${S} ${K} ${T} ${r} ${sigma} ${numSimulations} ${isCall ? 1 : 0}`;

    exec(command, {cwd: './build'}, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing C++: ${stderr}`);
            return res.status(500).json({ error: "C++ execution failed" });
        }
        res.json({ price: parseFloat(stdout) });
    });
});

app.listen(5001, () => {
    console.log("Monte Carlo Pricing API running on http://localhost:5001");
});
