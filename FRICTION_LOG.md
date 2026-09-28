# Amazon Developer Friction Log (+10% Judging Bonus)

Project: **Family Fit Quest**  
Track: **Fire TV Track**  
Mini Challenges: **AWS Builder** & **Open Source**  

---

## 🛠️ Friction Log Entry 1: Multi-Person Computer Vision on Fire TV Web Apps

### 1. Task Attempted
Implement multi-person live posture and joint movement tracking on Amazon Fire TV without forcing end-users to purchase external USB TV camera accessories.

### 2. Steps Taken
1. Evaluated `navigator.mediaDevices.getUserMedia` within Fire OS Silk Browser web views.
2. Observed camera availability limitations across various TV hardware models.
3. Designed a WebSockets pose telemetry relay architecture linking a coffee-table smartphone camera to Fire TV.

### 3. What We Expected vs. What Actually Happened
- **Expected**: Native Web view API or Fire TV SDK helper for streaming smartphone video/pose data to TV apps.
- **Actual**: No pre-built phone-to-TV pose streaming SDK existed in the current Fire TV web developer documentation.

### 4. Severity Rating
**Medium** (Resolved with open-source workaround).

### 5. Workaround Used
Created `@family-fit/pose-stream` — an open-source MIT-licensed standalone npm package (`src/packages/pose-stream/`) that captures pose keypoints on mobile devices and broadcasts joint telemetry over WebSockets to Fire TV apps at 30fps.

### 6. Actionable Suggestion for Amazon
Provide an official **Amazon Fire TV Mobile Camera Relay SDK** or companion app module allowing Fire OS developers to easily receive phone camera vision feeds.

---

## 🛠️ Friction Log Entry 2: D-Pad Spatial Focus Management in Fire TV React Web Apps

### 1. Task Attempted
Implement spatial D-Pad navigation for Fire TV remote controls (ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Enter, Escape).

### 2. Steps Taken
1. Attached `keydown` event listeners for standard keyboard arrow keys.
2. Formatted focusable components with CSS glow highlights.
3. Noticed default browser focus scrolling occasionally skips grid elements on TV screens.

### 3. Severity Rating
**Low / Quality of Life improvement**.

### 4. Workaround Used
Developed an explicit spatial focus ring state management system with Web Audio API sound feedback (`src/services/audioSynthesizer.js`).

### 5. Actionable Suggestion for Amazon
Publish a `@amazon/firetv-react-spatial-navigation` React hook package to streamline 10-foot remote focus management for web app developers.
