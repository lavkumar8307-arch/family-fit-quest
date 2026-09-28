import React, { useState } from 'react';
import { Code2, GitBranch, Check, Copy, ExternalLink, ShieldAlert, Cpu, Sparkles } from 'lucide-react';
import { playSound } from '../services/audioSynthesizer';

export const OpenSourceModuleViewer = () => {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `/**
 * @family-fit/pose-stream v1.0.0
 * Open-Source Phone-to-Fire-TV Pose Telemetry Streaming Engine
 * License: MIT
 */
import { PoseStreamClient } from '@family-fit/pose-stream';

// Initialize mobile client on smartphone/watch
const client = new PoseStreamClient({
  serverUrl: 'wss://firetv.local:8080/pose-stream',
  deviceId: 'family-phone-01',
  onPoseData: (joints, metadata) => {
    console.log('Received 17-point skeletal joint array on Fire TV', joints);
  }
});

// Connect to Fire TV WebSocket Host
client.connect();

// Stream 30fps pose keypoints
client.sendPoseFrame({
  head: { x: 0.5, y: 0.2 },
  leftKnee: { x: 0.42, y: 0.65 },
  rightKnee: { x: 0.58, y: 0.65 }
}, { action: 'SQUAT', formAccuracy: 95 });`;

  const copyCode = () => {
    playSound('select');
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Header Panel */}
      <div className="glass-panel-glow" style={{ padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #00FF87 0%, #00B862 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 25px rgba(0, 255, 135, 0.4)'
          }}>
            <Code2 size={32} color="#000000" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                @family-fit/pose-stream
              </h2>
              <span className="badge-amazon" style={{ background: '#00FF87', color: '#000' }}>
                Open Source Mini Challenge
              </span>
            </div>
            <p style={{ color: '#94A3B8', marginTop: '4px', fontSize: '1rem' }}>
              MIT Licensed standalone phone-to-TV pose streaming module for Fire TV applications.
            </p>
          </div>
        </div>

        <button
          onClick={copyCode}
          onFocus={() => playSound('focus')}
          tabIndex={0}
          className="tv-focusable focus-green"
          style={{
            padding: '14px 24px',
            borderRadius: '16px',
            background: copied ? 'rgba(0, 255, 135, 0.3)' : 'rgba(255, 255, 255, 0.1)',
            color: '#00FF87',
            fontWeight: '800',
            fontSize: '0.95rem',
            border: '1px solid #00FF87',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
          {copied ? 'Copied to Clipboard!' : 'Copy Code Snippet'}
        </button>
      </div>

      {/* Code Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '24px', background: '#0A0E1A', border: '1px solid rgba(0, 255, 135, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#00FF87', fontWeight: '700', fontFamily: 'Space Grotesk, monospace' }}>
              packages/pose-stream/index.js (MIT License)
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>npm install @family-fit/pose-stream</span>
          </div>
          <pre style={{ margin: 0, padding: '16px', background: '#05070F', borderRadius: '16px', color: '#E2E8F0', fontSize: '0.88rem', lineHeight: '1.5', fontFamily: 'Space Grotesk, monospace', overflowX: 'auto' }}>
            {codeSnippet}
          </pre>
        </div>

        {/* Architecture Details */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#FF9900" /> Hackathon Mini-Challenge Info
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: '#CBD5E1' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '14px' }}>
              <strong style={{ color: '#00FF87' }}>License:</strong> MIT Open Source License File included in repository.
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '14px' }}>
              <strong style={{ color: '#00F0FF' }}>Decoupled Architecture:</strong> Works on any TV web app frame without requiring TV built-in webcam.
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: '14px' }}>
              <strong style={{ color: '#FF9900' }}>Protocol:</strong> WebSockets / WebRTC Data Channel with sub-15ms joint vector latency.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
