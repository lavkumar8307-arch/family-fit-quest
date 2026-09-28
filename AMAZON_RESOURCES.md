# Amazon Developer Resources & Developer Environment Setup

---

## 📺 Fire TV Developer Resources

- **Amazon Fire TV Web App SDK**: [Fire TV Web App Documentation](https://developer.amazon.com/docs/fire-tv/web-apps-overview.html)
- **Fire OS Silk Browser Specifications**: Supports modern WebGL, HTML5 Canvas 2D, Web Audio API, and CSS spatial navigation.
- **Fire TV Remote Mapping**:
  - `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight` -> D-Pad Directions
  - `Enter` -> Select / Action
  - `Escape` / `Backspace` -> Back Button
  - `Home` -> Return to Fire OS Home

---

## 🤖 AWS Bedrock Integration Resources

- **AWS Bedrock Runtime Endpoint**: `https://bedrock-runtime.us-east-1.amazonaws.com`
- **Supported Models**:
  - `anthropic.claude-3-5-sonnet-20241022-v2:0` (Claude 3.5 Sonnet)
  - `amazon.nova-pro-v1:0` (Amazon Nova Pro)
- **API Payload Schema**: Standard Bedrock `invokeModel` format with `anthropic_version: "bedrock-2023-05-31"`.

---

## 📦 Open Source Package (@family-fit/pose-stream)

- **Source Code Directory**: `src/packages/pose-stream/`
- **Entry File**: `src/packages/pose-stream/index.js`
- **License**: MIT License (`src/packages/pose-stream/LICENSE`)
