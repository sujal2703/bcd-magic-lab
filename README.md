# 💻 BCD Arithmetic Simulator  
### *A Computer Organization & Architecture Project by Sujal Thumar*

---

## 📘 Overview
The **BCD Arithmetic Simulator** is an interactive web application that visually demonstrates **Binary Coded Decimal (BCD)** arithmetic operations — addition, subtraction, multiplication, and division — through step-by-step simulation.

It is designed as an **educational tool** to help students understand how computers perform decimal arithmetic using BCD representation and correction logic.

---

## 🎯 Objectives
- Simulate BCD addition, subtraction, multiplication, and division.
- Show **step-by-step hardware-like correction logic** (+6 rule).
- Display both **BCD** and **Decimal** results.
- Provide a **visual and interactive** experience for learning.

---

## ⚙️ Tech Stack
| Category | Tools |
|-----------|-------|
| Frontend | React.js |
| Styling | TailwindCSS |
| Animations | Framer Motion |
| Build Tool | Vite |
| Logic Modules | Custom JavaScript (bcdAddition, bcdConversion, etc.) |

---

## 🧩 Features
✅ Decimal to BCD and BCD to Decimal conversion  
✅ Stepwise arithmetic simulation with visual feedback  
✅ Highlighting of carries, corrections, and overflows  
✅ Light/Dark mode toggle  
✅ Responsive and modern glassmorphic UI  
✅ Smooth animations for every computation step  
✅ Download simulation summary (optional feature)  

---

## 🧠 How It Works
1. Enter **two decimal numbers**.  
2. Choose the **operation** (+, −, ×, ÷).  
3. Click **“Simulate”**.  
4. The simulator shows:
   - Decimal → BCD conversion  
   - Binary operation  
   - Detection and correction (+6 rule for invalid BCDs)  
   - Final BCD and decimal result  
5. Use **Next / Prev / Auto Simulate** buttons to navigate through steps.

---

## 🖥️ Project Structure
bcd-arithmetic-simulator/
│
├── src/
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── InputSection.jsx
│ │ ├── StepVisualizer.jsx
│ │ ├── ResultDisplay.jsx
│ │ ├── ControlButtons.jsx
│ │ └── Footer.jsx
│ │
│ ├── utils/
│ │ ├── bcdConversion.js
│ │ ├── bcdAddition.js
│ │ ├── bcdSubtraction.js
│ │ ├── bcdMultiply.js
│ │ └── bcdDivide.js
│ │
│ ├── App.jsx
│ ├── index.css
│ └── main.jsx
│
├── package.json
├── tailwind.config.js
└── README.md

yaml
Copy code

---

## 🚀 Running the Project
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/bcd-arithmetic-simulator.git

# 2. Go inside project folder
cd bcd-arithmetic-simulator

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
Then open → http://localhost:5173/

🎨 UI Theme
Glassmorphic Design with frosted cards

Neon cyan and magenta glows for highlights

Poppins + Space Mono fonts for elegance and readability

Smooth Framer Motion transitions

🧑‍💻 Developer Info
Author: Sujal Thumar
Course: Computer Organization & Architecture (COA)
Department: CSE, SRM Institute of Science and Technology

📜 License
This project is for educational and academic use only.
© 2025 Sujal Thumar. All rights reserved.

