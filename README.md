# 🚀 Family Fit Quest — Amazon Developer Hackathon (Fire TV Track)

> **Level Up Your Living Room — Play, Move, and Fit Together!**  
> *Multi-Modal Family AI Fitness Game & 10-Foot Remote Spatial UI Experience built for Amazon Fire TV with AWS Bedrock AI.*

---

## 🏆 Hackathon Track & Mini-Challenges Entered

- **Primary Track**: **Fire TV Track**
  - Launch demo-ready app for Fire OS / Vega OS using React web technology.
  - Priority Categories Addressed: **Multi-Modal UX**, **Computer Vision**, **Fitness**, **Family Entertainment**, **AI-Enhanced Viewing**.
- **Mini-Challenge 1**: **AWS Builder**
  - Integrated **AWS Bedrock Runtime APIs** (Claude 3.5 Sonnet `anthropic.claude-3-5-sonnet-20241022-v2:0` & Amazon Nova `amazon.nova-pro-v1:0`) to generate kid-friendly post-workout stories, adaptive fitness advice, form score breakdown, and Alexa voice command handling.
- **Mini-Challenge 2**: **Open Source**
  - Decoupled MIT-licensed standalone package: `@family-fit/pose-stream` (located under `src/packages/pose-stream/`), allowing coffee-table smartphones to relay pose telemetry over WebSockets to Fire TV without requiring a built-in TV camera.

---

## 🎮 Features & Experience Highlights

1. **10-Foot Fire TV Remote Spatial Navigation**:
   - Designed for Fire TV D-Pad remote control (ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Select/Enter, Esc/Back, Home).
   - Dynamic glowing focus rings with Fire TV Orange (`#FF9900`) and Neon Cyan (`#00F0FF`) visual feedback.
   - Built-in **Fire TV Remote Simulator HUD** for easy testing on laptop or browser without physical TV hardware.

2. **Up to 4-Player Simultaneous Family Tracking**:
   - Supports 1 to 4 active family members (e.g. Maya [Kid], Liam [Kid], Elena [Mom], Leo [Dad]).
   - Real-time computer vision skeleton overlay with 17 joint node tracking (head, shoulders, elbows, wrists, hips, knees, ankles) and accuracy score metrics.

3. **4 Gamified Adventure Workout Modes**:
   - 🌴 **Jungle Dash**: Dodge low branches with squats, leap over muddy logs, and sprint!
   - 🚀 **Cosmic Dance-Off**: Strike glowing galaxy pose alignments in tempo!
   - 🌋 **Lava Temple Escape**: Slide left and right to dodge rolling boulders!
   - ⚡ **Superhero Academy**: Power punches and high knee charges!

4. **AWS Bedrock AI Fitness Companion & Recaps**:
   - Post-workout recaps with kid-friendly narrative achievements.
   - Text-to-Speech Web Speech synthesis to read AI recaps aloud.
   - Adaptive workout recommendation engine based on individual form stability.

5. **Alexa Voice Control Simulation**:
   - Press the Alexa Mic button on the Fire TV Remote HUD to execute voice commands ("Alexa, make it harder", "Alexa, pause game", "Alexa, summarize workout").

---

## 👥 GitHub Collaborators Setup (For Amazon Reviewers)

This repository is set up for private sharing with the Amazon Developer Relations team as required by hackathon rules:

**Invited Amazon Reviewers**:
- `chris-trag` (Chris Traganos)
- `knmeiss` (Kourtney Meiss)
- `giolaq` (Giovanni Laquidara)
- `anishamalde` (Anisha Malde)
- `mosesroth` (Moses Roth)
- `emersonsklar` (Emerson Sklar)
- `testing@devpost.com` (Devpost Review Team)

---

## 🛠️ Getting Started & Local Running Instructions

### Prerequisites
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later

### Installation & Launch

```bash
# 1. Clone the repository
git clone https://github.com/your-username/family-fit-quest.git
cd family-fit-quest

# 2. Install dependencies
npm install

# 3. Start local dev server (Fire TV Simulator Mode)
Open your browser locally or navigate to your live **Vercel Deployment URL**. Use your keyboard arrow keys or click the on-screen **Fire TV Remote HUD** to navigate.

### 🚀 Deploying to Vercel
1. Push project to GitHub or run `vercel` CLI.
2. Production build output is located in `dist/`.
3. Vercel automatically detects Vite settings from `vercel.json`.

---

## 📄 Open Source Mini Challenge Package

- **Package**: `@family-fit/pose-stream`
- **Location**: `src/packages/pose-stream/`
- **License**: MIT License (`src/packages/pose-stream/LICENSE`)
- **Description**: Lightweight WebSocket & WebRTC pose telemetry client streaming 30fps joint keypoints from smartphones or wearables to Fire TV host apps.

---

## 📋 Amazon Developer Product Feedback & Friction Log

### Product Feedback
1. **Fire TV Web App & Silk Browser**: High canvas 60fps rendering performance. Suggest adding standard spatial focus CSS custom properties in Fire OS docs.
2. **AWS Bedrock Runtime API**: Claude 3.5 Sonnet on Bedrock provided sub-500ms latency for generating multi-player JSON workout summaries.

### Friction Log (+10% Judging Bonus)
- **Task Attempted**: Multi-person posture tracking on Fire TV without requiring a native TV USB camera.
- **Steps Taken**: Evaluated WebRTC & WebSockets streaming from a coffee-table smartphone camera.
- **Expected vs Actual**: Expected built-in Fire TV Web view spatial focus engine; actually required custom D-Pad focus mapping.
- **Workaround**: Created open-source `@family-fit/pose-stream` relay package.
- **Actionable Suggestion**: Provide a official `@amazon/firetv-react-focus` hook library.

---

*Family Fit Quest — Built for Amazon Developer Hackathon 2026*
