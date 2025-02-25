#include <iostream>
#include <cmath>
#include <random>
#include <vector>

// Monte Carlo Simulation for European Option Pricing
double monteCarloOptionPrice(double S, double K, double T, double r, double sigma, int numSimulations, bool isCall)
{
    std::random_device rd;
    std::mt19937 generator(rd());                            // Random number generator
    std::normal_distribution<double> distribution(0.0, 1.0); // Standard Normal Distribution

    double sumPayoff = 0.0;

    for (int i = 0; i < numSimulations; ++i)
    {
        double S_T = S * exp((r - 0.5 * sigma * sigma) * T + sigma * sqrt(T) * distribution(generator));
        double payoff = isCall ? std::max(S_T - K, 0.0) : std::max(K - S_T, 0.0);
        sumPayoff += payoff;
    }

    double optionPrice = exp(-r * T) * (sumPayoff / numSimulations);
    return optionPrice;
}

int main(int argc, char *argv[])
{
    if (argc != 8)
    {
        std::cerr << "Usage: " << argv[0] << " S K T r sigma numSimulations isCall" << std::endl;
        return 1;
    }

    double S = std::stod(argv[1]);
    double K = std::stod(argv[2]);
    double T = std::stod(argv[3]);
    double r = std::stod(argv[4]);
    double sigma = std::stod(argv[5]);
    int numSimulations = std::stoi(argv[6]);
    bool isCall = std::stoi(argv[7]);

    std::cout << monteCarloOptionPrice(S, K, T, r, sigma, numSimulations, isCall) << std::endl;
    return 0;
}
