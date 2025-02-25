#include <iostream>
#include <cmath>
#include <vector>
#include <cstdlib> // For std::stod, std::stoi

double binomialTree(double S, double K, double T, double r, double sigma, int N, bool isCall)
{
    double dt = T / N;
    double u = exp(sigma * sqrt(dt));
    double d = 1 / u;
    double p = (exp(r * dt) - d) / (u - d);

    std::vector<double> optionValues(N + 1);

    for (int i = 0; i <= N; i++)
    {
        double price = S * pow(u, N - i) * pow(d, i);
        optionValues[i] = std::max(0.0, isCall ? price - K : K - price);
    }

    for (int j = N - 1; j >= 0; j--)
    {
        for (int i = 0; i <= j; i++)
        {
            optionValues[i] = (p * optionValues[i] + (1 - p) * optionValues[i + 1]) * exp(-r * dt);
        }
    }

    return optionValues[0];
}

int main(int argc, char *argv[])
{
    if (argc != 8)
    {
        std::cerr << "Usage: " << argv[0] << " S K T r sigma N isCall" << std::endl;
        return 1; // Error
    }

    double S = std::stod(argv[1]);
    double K = std::stod(argv[2]);
    double T = std::stod(argv[3]);
    double r = std::stod(argv[4]);
    double sigma = std::stod(argv[5]);
    int N = std::stoi(argv[6]);
    bool isCall = std::stoi(argv[7]);

    std::cout << binomialTree(S, K, T, r, sigma, N, isCall) << std::endl;
    return 0;
}
