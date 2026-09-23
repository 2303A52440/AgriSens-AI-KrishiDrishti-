# 🌾 AgriSens-AI (KrishiDrishti)
### On-Device AI-Powered Crop Health, Disease & Pest Management Assistant
**Bharat AI-SoC Challenge 2026–27 Submission**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Mode: 100% Offline](https://img.shields.io/badge/Mode-100%25%20Offline-blue.svg)](#key-features)
[![Edge Acceleration: Bharat AI-SoC](https://img.shields.io/badge/Hardware-Bharat%20AI--SoC-amber.svg)](#edge-hardware-benchmarks)

---

## 📌 Problem & Challenge Objective
In rural Indian agricultural communities, smallholder farmers often suffer severe crop losses due to undetected pests and diseases, lack of internet connectivity, and language barriers. 

**AgriSens-AI (KrishiDrishti)** is designed to run **100% on-device on low-power System-on-Chip (SoC) edge hardware**, providing immediate crop diagnostic feedback, severity quantification, and localized voice advisory without requiring any internet connection.

---

## 🔥 Key Features

- **⚡ 100% Offline Computer Vision:** Quantized ONNX / INT8 vision model running on-device for 38+ crop-disease conditions (Rice, Tomato, Cotton, Potato, Corn, Wheat, etc.).
- **📊 Lesion Severity Gauge:** Computer vision color segmentation calculating affected leaf surface percentage (*Healthy, Mild, Moderate, Severe, Critical*).
- **🔊 Multilingual Offline Voice Advisory:** Integrated Web Speech Synthesis API speaking remedies in **9 Indian languages**:
  - **Hindi (हिंदी)**
  - **English**
  - **Telugu (తెలుగు)**
  - **Tamil (தமிழ்)**
  - **Kannada (ಕನ್ನಡ)**
  - **Marathi (मराठी)**
  - **Bengali (বাংলা)**
  - **Punjabi (ਪੰਜਾਬੀ)**
  - **Gujarati (ગુજરાતી)**
- **🧪 Acreage Dosage Calculator:** Automatically calculates required active chemical and biological dosages based on farmer's land acreage.
- **🛡️ 4-Tab Actionable Remedies:** Organic & Biological controls, Chemical interventions, Cultural prevention, and Agro-Climatic regional guidance for North, South, East, and West India.
- **📄 Offline Farmer Advisory PDF Export:** One-click diagnostic report generator for field extension workers.
- **💻 Edge Hardware SoC Benchmarks:** Built-in hardware metrics suite for RISC-V NPU (Bharat-SoC), ARM Ethos-U55, Raspberry Pi 5, and NVIDIA Jetson.

---

## ⚡ Edge Hardware Benchmarks

| Metric | Measured Value |
| :--- | :--- |
| **Average Inference Latency** | `13.60 ms` |
| **Real-time Throughput** | `73.5 FPS` |
| **Model Size (INT8 ONNX)** | `4.8 MB` |
| **Active RAM Memory** | `38.5 MB` |
| **GFLOPs / Complexity** | `0.42 GFLOPs` |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18+ 
- Python 3.10+ (for Python benchmark server)

### Installation & Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/2303A52440/AgriSens-AI-KrishiDrishti-.git
   cd AgriSens-AI-KrishiDrishti-
   ```

2. **Install web dependencies:**
   ```bash
   npm install
   ```

3. **Start local dev server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

4. **Run Python Edge SoC Profiler:**
   ```bash
   python soc_benchmark_server.py
   ```

---

## 🏗️ System Architecture

```
[ Camera / Leaf Image ]
          │
          ▼
┌──────────────────────────────────────────────┐
│       On-Device WebAssembly / ONNX           │
│         INT8 Tensor Neural Engine            │
└──────────────────────┬───────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
[ Disease & Pest ID ]       [ Lesion Severity Meter ]
(Rice Blast, Late Blight)   (Surface Area % Calculation)
         │                           │
         └─────────────┬─────────────┘
                       ▼
┌──────────────────────────────────────────────┐
│  Offline 9-Language Multilingual Advisor     │
│   + Audio TTS Voice + Acreage Calculator     │
└──────────────────────────────────────────────┘
```

---

## 📜 License
Licensed under the [MIT License](LICENSE). Developed for the **Bharat AI-SoC Challenge 2026–27**.
