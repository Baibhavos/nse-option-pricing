#include <iostream>
#include <cstdlib>
#include <sstream>

double runBinomialTree(double S, double K, double T, double r, double sigma, bool isCall)
{
    std::ostringstream cmd;
    cmd << "./option_pricing " << S << " " << K << " " << T << " " << r << " " << sigma << " " << isCall;

    FILE *pipe = popen(cmd.str().c_str(), "r");
    if (!pipe)
        return -1.0;

    double price;
    fscanf(pipe, "%lf", &price);
    pclose(pipe);

    return price;
}

double runMonteCarlo(double S, double K, double T, double r, double sigma, bool isCall, int numSimulations, int numThreads)
{
    std::ostringstream cmd;
    cmd << "./monte_carlo " << S << " " << K << " " << T << " " << r << " " << sigma << " "
        << numSimulations << " " << isCall << " " << numThreads;

    FILE *pipe = popen(cmd.str().c_str(), "r");
    if (!pipe)
        return -1.0;

    double price;
    fscanf(pipe, "%lf", &price);
    pclose(pipe);

    return price;
}

int main(int argc, char *argv[])
{
    if (argc != 9)
    {
        std::cerr << "Usage: " << argv[0] << " S K T r sigma isCall numSimulations numThreads\n";
        return 1;
    }

    double S = std::stod(argv[1]);
    double K = std::stod(argv[2]);
    double T = std::stod(argv[3]);
    double r = std::stod(argv[4]);
    double sigma = std::stod(argv[5]);
    bool isCall = std::stoi(argv[6]);
    int numSimulations = std::stoi(argv[7]);
    int numThreads = std::stoi(argv[8]);

    double binomialPrice = runBinomialTree(S, K, T, r, sigma, isCall);
    double monteCarloPrice = runMonteCarlo(S, K, T, r, sigma, isCall, numSimulations, numThreads);

    std::cout << "{ \"binomial\": " << binomialPrice << ", \"monte_carlo\": " << monteCarloPrice << " }\n";

    return 0;
}
