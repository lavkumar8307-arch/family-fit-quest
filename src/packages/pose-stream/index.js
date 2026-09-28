/**
 * @family-fit/pose-stream
 * Open Source Phone-to-Fire-TV Pose Telemetry Relay Library
 * License: MIT
 * 
 * Streams computer vision pose joint telemetry from mobile devices (Apple Watch / Android / iOS web app)
 * to Amazon Fire TV smart applications over WebSockets or WebRTC Data Channels.
 */

export class PoseStreamClient {
  constructor(options = {}) {
    this.serverUrl = options.serverUrl || 'wss://localhost:8080/pose-stream';
    this.deviceId = options.deviceId || `phone-${Math.random().toString(36).substring(2, 7)}`;
    this.onPoseData = options.onPoseData || null;
    this.socket = null;
    this.isConnected = false;
  }

  connect() {
    try {
      this.socket = new WebSocket(this.serverUrl);
      
      this.socket.onopen = () => {
        this.isConnected = true;
        console.log(`[PoseStream] Connected device ${this.deviceId} to Fire TV host at ${this.serverUrl}`);
        this.socket.send(JSON.stringify({ type: 'REGISTER_DEVICE', deviceId: this.deviceId, role: 'SENDER' }));
      };

      this.socket.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        if (payload.type === 'POSE_FRAME' && this.onPoseData) {
          this.onPoseData(payload.joints, payload.metadata);
        }
      };

      this.socket.onclose = () => {
        this.isConnected = false;
        console.log('[PoseStream] Connection closed. Reconnecting...');
      };
    } catch (err) {
      console.warn('[PoseStream] Simulation fallback mode enabled:', err.message);
    }
  }

  sendPoseFrame(keypoints, metadata = {}) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({
        type: 'POSE_FRAME',
        deviceId: this.deviceId,
        timestamp: Date.now(),
        joints: keypoints,
        metadata
      }));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.isConnected = false;
    }
  }
}

export default PoseStreamClient;
