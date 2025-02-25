#include <iostream>
#include <cmath>
#include <sstream>
#include <cstdlib>

double getOptionPrice(double S, double K, double T, double r, double sigma, bool isCall, std::string model)
{
    std::ostringstream cmd;
    cmd << "./" << model << " " << S << " " << K << " " << T << " " << r << " " << sigma << " " << isCall;

    FILE *pipe = popen(cmd.str().c_str(), "r");
    if (!pipe)
        return -1.0;

    double price;
    fscanf(pipe, "%lf", &price);
    pclose(pipe);

    return price;
}

void computeGreeks(double S, double K, double T, double r, double sigma, bool isCall, std::string model)
{
    double h = 0.01; // Small change for finite difference

    // Compute Base Price
    double price = getOptionPrice(S, K, T, r, sigma, isCall, model);

    // Delta = (V(S + h) - V(S - h)) / (2h)
    double price_up = getOptionPrice(S + h, K, T, r, sigma, isCall, model);
    double price_down = getOptionPrice(S - h, K, T, r, sigma, isCall, model);
    double delta = (price_up - price_down) / (2 * h);

    // Gamma = (V(S + h) - 2V(S) + V(S - h)) / h^2
    double gamma = (price_up - 2 * price + price_down) / (h * h);

    // Vega = (V(sigma + h) - V(sigma - h)) / (2h)
    double vega_up = getOptionPrice(S, K, T, r, sigma + h, isCall, model);
    double vega_down = getOptionPrice(S, K, T, r, sigma - h, isCall, model);
    double vega = (vega_up - vega_down) / (2 * h);

    // Theta = (V(T - h) - V(T)) / h
    double theta_down = getOptionPrice(S, K, T - h, r, sigma, isCall, model);
    double theta = (theta_down - price) / h;

    // Rho = (V(r + h) - V(r - h)) / (2h)
    double rho_up = getOptionPrice(S, K, T, r + h, sigma, isCall, model);
    double rho_down = getOptionPrice(S, K, T, r - h, sigma, isCall, model);
    double rho = (rho_up - rho_down) / (2 * h);

    // Print Greeks in JSON format
    std::cout << "{ \"delta\": " << delta << ", \"gamma\": " << gamma << ", \"vega\": " << vega
              << ", \"theta\": " << theta << ", \"rho\": " << rho << " }\n";
}

int main(int argc, char *argv[])
{
    if (argc != 8)
    {
        std::cerr << "Usage: " << argv[0] << " S K T r sigma isCall model\n";
        return 1;
    }

    double S = std::stod(argv[1]);
    double K = std::stod(argv[2]);
    double T = std::stod(argv[3]);
    double r = std::stod(argv[4]);
    double sigma = std::stod(argv[5]);
    bool isCall = std::stoi(argv[6]);
    std::string model = argv[7];

    computeGreeks(S, K, T, r, sigma, isCall, model);

    return 0;
}
