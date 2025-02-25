# **Real-Time Option Pricing Engine**

## **📌 Project Overview**

This project is a **real-time option pricing engine** that calculates option prices using:

- **Binomial Tree Model** 📈
- **Monte Carlo Simulation** 🎲
- **Greeks Calculation** (Delta, Vega, Gamma, Theta, Rho) 🏦

The system is built using **C++** for high-performance computations and a **Next.js 15 frontend** for real-time visualization.

---

## **🔧 Features**

- ✅ **Real-time Option Pricing** using Binomial and Monte Carlo models.
- ✅ **Monte Carlo Simulations**.
- ✅ **Finite Difference Method for Greeks Calculation**.
- ✅ **Web Dashboard** to compare models and display option Greeks(to be added later).
- ✅ **Live Integration with NSE Option Chain Data** (to be added later).

---

## **🛠️ Tech Stack**

### **Backend (C++) & TypeScript**

- **Binomial Tree Option Pricing**
- **Monte Carlo Option Pricing** (with OpenMP for parallelization)
- **Greeks Computation using Finite Differences**
- **Node.js & TypeScript Backend** for API services

### **Frontend (Next.js 14 + TypeScript)**

- **React-based Dashboard** for real-time price visualization.
- **API Routes** for fetching computed prices and Greeks.

---

## **📂 Project Structure**

```
📦 nse-option-pricing
├── 📂 backend
│   ├── 📂 build          # Compiled C++ Files
│   ├── 📂 cpp            # C++ Core Logic
│   ├── 📂 dist           # Compiled TypeScript Files
│   ├── 📜 CMakeLists.txt # C++ Build Configuration
│   ├── 📜 monteCarloServer.ts # Monte Carlo API Server
│   ├── 📜 server.ts      # Backend API Server
│   ├── 📜 package.json   # Backend Dependencies
│   ├── 📜 tsconfig.json  # TypeScript Config
├── 📂 frontend
├── 📜 package.json       # Main Project Configuration
└── 📜 README.md          # Project Documentation
```

---

## **⚡ Setup & Installation**

### **1️⃣ Install Dependencies**

```bash
npm install
```

### **2️⃣ Build & Run the Project**

#### **Build C++ Backend**

```bash
npm run build-backend
```

#### **Compile TypeScript Backend**

```bash
npm run compile-backend
```

#### **Start Backend**

```bash
npm run start-backend
```

#### **Start Monte Carlo Server**

```bash
npm run start-monte
```

#### **Start Frontend**

```bash
npm run start-frontend
```

#### **Start Full Project**

```bash
npm run start
```

---

## **📊 Usage**

### **Run Option Pricing Models (Standalone C++)**

#### **1️⃣ Binomial Tree**

```bash
./binomial_tree 18000 18000 0.0833 0.05 0.2 1
```

#### **2️⃣ Monte Carlo Simulation**

```bash
./monte_carlo 18000 18000 0.0833 0.05 0.2 1
```

#### **3️⃣ Compute Greeks**

```bash
./compute_greeks 18000 18000 0.0833 0.05 0.2 1
```

---

## **🚀 Next Steps**

- 🔄 **Integrate real-time NSE data** for live option pricing.
- 📈 **Optimize C++ models further for performance.**
- 🎯 **Deploy the project for public access.**

---

### **📢 Contributors**

👤 **Baibhav Kumar**

🚀 *Happy Coding!*

