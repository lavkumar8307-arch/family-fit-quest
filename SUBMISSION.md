# Devpost Submission Text Copy — Family Fit Quest

---

## 📌 Submission Overview

### Project Title
**Family Fit Quest — AI Multi-Player Family Fitness Game on Fire TV**

### Primary Track
- **Fire TV Track**: Launch a demo-ready application on Fire OS / Vega OS using React web technology.

### Mini-Challenges Entered
1. **AWS Builder**: Integrated Amazon Bedrock Runtime APIs (Claude 3.5 Sonnet `anthropic.claude-3-5-sonnet-20241022-v2:0` & Amazon Nova Pro `amazon.nova-pro-v1:0`) for post-workout family summaries, form score evaluation, adaptive AI coaching, and Alexa voice command handling.
2. **Open Source**: Created and released `@family-fit/pose-stream` under the MIT License (`src/packages/pose-stream/`) for streaming smartphone camera pose vectors to Fire TV over WebSockets.

---

## 📝 Text Description of Project

### What It Does
**Family Fit Quest** transforms the living room into an interactive workout arcade for the whole family on Amazon Fire TV. Up to 4 family members (kids and adults) participate simultaneously in gamified fitness adventures (Jungle Dash, Cosmic Dance-Off, Lava Temple Escape, Superhero Academy).

### How It Works
1. **10-Foot Remote UI**: Designed specifically for Amazon Fire TV remote spatial navigation with Arrow Keys, Select, Back/Esc, Home key bindings, glowing focus states, and Web Audio API feedback.
2. **Multi-Player AI Vision Overlay**: Renders 2D skeletal joint nodes (head, shoulders, elbows, wrists, hips, knees, ankles) for 1 to 4 active players at 60fps on canvas.
3. **AWS Bedrock AI Fitness Companion**: Processes posture stability and movement counts to output personalized, kid-friendly narrative recaps read aloud in an authentic female Alexa voice.
4. **Alexa Voice Integration**: Fire TV remote Alexa Mic trigger processes natural language voice commands ("Alexa, make it harder", "Alexa, pause workout").
5. **@family-fit/pose-stream Relay**: Relays pose keypoints from a coffee-table smartphone camera to Fire TV over WebSockets, avoiding the need for an external TV webcam.

---

## 💬 Product Feedback on Amazon Developer Tools

### 1. Fire TV Web App SDK & 10-Foot UI
- **What we used it for**: Building 10-foot spatial navigation, TV remote D-Pad key handling, and multi-player video game HUD.
- **What worked well**: Web view performance on Fire OS is fast, with WebGL/Canvas rendering 60fps skeletal joint tracking smoothly.
- **What needs work**: Fire TV SDK could include an official `@amazon/firetv-react-spatial-focus` hook library to standardize focus glow states.

### 2. AWS Bedrock Runtime APIs
- **What we used it for**: AWS Builder Mini Challenge – Generating kid-friendly post-workout stories, adaptive exercise plans, and Alexa voice assistance.
- **What worked well**: Claude 3.5 Sonnet on AWS Bedrock delivered structured JSON responses under 500ms, ideal for live TV voice interactions.

---

## 🔒 Private GitHub Collaborators Checklist

The following Amazon team members have been added as collaborators on our private GitHub repository:
- `chris-trag` (Chris Traganos)
- `knmeiss` (Kourtney Meiss)
- `giolaq` (Giovanni Laquidara)
- `anishamalde` (Anisha Malde)
- `mosesroth` (Moses Roth)
- `emersonsklar` (Emerson Sklar)
- `testing@devpost.com`
