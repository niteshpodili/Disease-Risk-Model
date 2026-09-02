  # CardioQuantum — Quantum-Inspired Disease Risk Analysis (SIH26139)

  > **Smart India Hackathon MVP Demonstration Platform**  
  > A web-based hybrid healthcare analytics system that combines a validated **Classical Machine Learning model** with an experimental **4-qubit Qiskit quantum circuit simulation** for cardiovascular disease risk stratification.

  ---

  ## 🌟 Live Demo & Deployments

  * **🚀 Production Web App (InsForge)**: [https://h3ddgmpu.insforge.site](https://h3ddgmpu.insforge.site)
  * **⚡ InsForge Dashboard**: [https://insforge.dev/dashboard/project/0f26a274-f17d-4e6f-8c56-591708e359f8](https://insforge.dev/dashboard/project/0f26a274-f17d-4e6f-8c56-591708e359f8)
  * **📡 InsForge Backend Base**: `https://h3ddgmpu.us-east.insforge.app`

  ---

  ## 🏗️ Architecture Overview

  ```
                          ┌──────────────────────────────────────────────┐
                          │   Claymorphic Frontend (React + TS + Vite)   │
                          │    • Nunito & DM Sans Typography             │
                          │    • 4-Layer Tactile Shadow Stack            │
                          │    • Realtime Supabase & InsForge Backend    │
                          └──────────────────────┬───────────────────────┘
                                                │ HTTP / REST
                                                ▼
                          ┌──────────────────────────────────────────────┐
                          │        FastAPI Microservice (Port 8000)      │
                          │   • Rate Limiting (SlowAPI)                  │
                          │   • Security Headers Middleware              │
                          │   • Pydantic v2 Schema Validation            │
                          └──────────────┬───────────────────────────────┘
                                        │
                  ┌──────────────────────┴──────────────────────┐
                  ▼                                             ▼
  ┌───────────────────────────────┐             ┌───────────────────────────────┐
  │     Classical ML Engine       │             │   Experimental Quantum Engine │
  │  (Primary Clinical Predictor) │             │      (Toy Non-Clinical Demo)  │
  │  • Model: Gradient Boosting   │             │  • 4-Qubit Variational Circuit│
  │  • Test Acc: 85.0%, F1: 87.6% │             │  • Ry Angle Encoding + CX     │
  │  • ROC-AUC: 0.8988            │             │  • Qiskit AerSimulator        │
  └───────────────────────────────┘             └───────────────────────────────┘
  ```

  ---

  ## 🚀 Key Features

  * **High-Fidelity Claymorphism UI**: Custom 4-layer tactile physical shadows, super-rounded contours, soft lavender palette (`#F4F1FA`), and smooth micro-animations.
  * **Dual Prediction Pipeline**:
    * **Classical ML**: Validated clinical risk probability calculation with risk stratification (Low / Moderate / High).
    * **Quantum Simulation**: 4-qubit toy circuit computing statevector measurement alignment (strictly labeled non-clinical).
  * **Model Explainability**: Global feature importance chart showing dataset-level predictive weights.
  * **Live Session Persistence**: Anonymized session tracking via Supabase PostgreSQL and Realtime updates.
  * **Quick Demo Presets**: Pre-configured profiles (*Healthy Adult*, *Moderate Risk*, *High Risk Senior*) for rapid 2-minute hackathon demonstrations.

  ---

  ## 🛠️ Tech Stack

  * **Frontend**: React 18, TypeScript, Tailwind CSS v4, Recharts, Lucide React, Vite.
  * **Backend**: Python 3.11+, FastAPI, Pydantic v2, SQLAlchemy, Uvicorn, SlowAPI.
  * **Machine Learning**: Scikit-learn, Pandas, NumPy, Joblib.
  * **Quantum Simulation**: Qiskit 1.0+, Qiskit Aer (`AerSimulator`).
  * **Cloud & Database**: InsForge (BaaS & Web Hosting), Supabase PostgreSQL.

  ---

  ## 💻 Local Development Setup

  ### 1. Prerequisites
  * Python 3.10+
  * Node.js 18+ and `npm`

  ### 2. Backend Setup
  ```bash
  # Install Python dependencies
  pip install -r backend/requirements.txt

  # Run backend test suite
  pytest backend/tests/ -v

  # Start FastAPI server
  python backend/run.py
  ```
  Backend API will be live at `http://127.0.0.1:8000` (Swagger docs: `/docs`).

  ### 3. Frontend Setup
  ```bash
  cd frontend

  # Install Node dependencies
  npm install

  # Start Vite dev server
  npm run dev
  ```
  Frontend UI will be live at `http://localhost:5173`.

  ---

  ## ⚖️ Non-Clinical Educational Disclaimer

  > **CardioQuantum is an educational and research demonstration platform developed for the Smart India Hackathon (SIH26139).**
  > The Classical Machine Learning module represents a standard algorithmic classifier trained on research data. The 4-qubit quantum simulation is strictly an experimental educational demonstration of quantum state encoding. Neither module is clinically validated or intended for medical diagnostic use.
