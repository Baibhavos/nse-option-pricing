cmake_minimum_required(VERSION 3.10)
project(OptionPricing)

set(CMAKE_CXX_STANDARD 17)

# Add the executable for the binomial tree model
add_executable(option_pricing cpp/option_pricing.cpp)

# Add the executable for the Monte Carlo model
add_executable(monte_carlo cpp/monte_carlo.cpp)

add_executable(compare_models cpp/compare_models.cpp)

add_executable(compute_greeks cpp/compute_greeks.cpp)

# Enable optimization flags for performance
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -O3 -march=native -pthread")
