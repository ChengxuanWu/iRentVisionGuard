# iRent 智馭車況管家 (VisionGuard v2.0)
> 2026 和泰 AI 黑客松 · 智能租還車檢驗與動態車隊調度系統

---

## 📖 專案簡介 (Project Overview)

**iRent 智馭車況管家 (VisionGuard v2.0)** 是一套融合 Edge AI 影像檢驗技術、多視角車輛藍圖比對與雲端營運調度的全方位解決方案。針對共享汽機車「取車防呆耗時」、「還車車損難釐清」、「車內整潔爭議」三大痛點，提供消費者與後台營運人員雙向無縫的智慧體驗：

1. **📱 用戶租還車視角 (Phone Simulator)**：
   - **車頂視角雷達與 AR 藍圖線稿引導 (Blueprint Silhouette Assist)**：即時指引 5 大拍攝角度（左前 45°、右前 45°、左後 45°、右後 45°、後座整潔），磁吸對齊自動抓拍。
   - **取車安心護盾 (Guardian Shield)**：量化免責承諾，每拍一張進度提升，建立用車信賴感。
   - **地下室微光智慧防呆 (Scenario B)**：偵測環境昏暗（< 20 Lux）主動攔截並提供「一鍵開啟補光燈」，消除手晃與色差。
   - **新傷即時提醒 (Scenario C)**：還車比對秒級標記新刮痕（12cm 保險桿擦傷），趁人還在車旁提示補拍，保障雙方權益。
   - **多模態車內整潔度分析 (Scenario D)**：AI 識別遺留外帶杯與食物殘渣，溫馨提醒隨手帶走垃圾。

2. **🏢 營運調度控制台 (Fleet Command Center)**：
   - **即時全區車隊 KPI 儀表板**：監控正常在線、整備清潔、微瑕特惠（85折）、停權報修四大狀態與即時佔比。
   - **30 秒微差快審中心 (Human-in-the-Loop Triage)**：支援 Before/After 影像滑桿比對，自動過濾歷史舊傷。
   - **動態車輛可用性與價格調節 (Dynamic Availability & Pricing)**：一鍵調派微瑕特惠出租或停權報修進廠，儀表板數字即時自動聯動（+1 / -1 脈衝動畫）。
   - **外勤智慧派工與下筆預約接力保護**：串接 LINE 數位派工單、自動改派同站空閒車輛、發送補償券，確保營運無縫運轉。

---

## 🚀 核心四大展示情境 (Demo Scenarios)

| 情境代號 | 情境名稱 | 核心展現技術與業務價值 |
| :--- | :--- | :--- |
| **情境 A** | 🟢 完美無損 (Happy Path) | 5 視角精準對齊，車況接力免審直接放行，租還車流暢體驗。 |
| **情境 B** | 🟡 微光防呆 (Edge Guard) | 地下室暗光攔截防呆、一鍵開啟相機補光燈，提升影像清晰度（Laplacian > 180）。 |
| **情境 C** | 🔴 新傷防呆 (Defect Diff) | 像素級特徵比對出右後保桿 12cm 擦傷，支援調派 85 折特惠出租或報修進廠。 |
| **情境 D** | 🔵 車內整潔 (Clean Relay) | 多模態大模型標記車內髒污等級 2，即時派發外勤清潔工單與次筆預約保護。 |

---

## 🛠️ 技術架構 (Tech Stack)

- **前端框架**：React 19, Vite
- **圖示庫**：Lucide React
- **動畫特效**：Canvas Confetti, CSS Micro-animations & Glassmorphism
- **設計風格**：現代科技暗黑模式 (Dark Mode HUD)、iRent 品牌紅綠專屬調色

---

## 💻 快速本地啟動 (Getting Started)

### 1. 安裝相依套件
```bash
npm install
```

### 2. 啟動開發伺服器
```bash
npm run dev
```
瀏覽器開啟：`http://localhost:5173`

### 3. 建置生產版本
```bash
npm run build
```

---

## 👥 團隊資訊 (Team & Hackathon)
- **競賽專案**：2026 和泰 AI 黑客松 (Hotai AI Hackathon)
- **專案主題**：iRent 智馭車況管家 (VisionGuard)
