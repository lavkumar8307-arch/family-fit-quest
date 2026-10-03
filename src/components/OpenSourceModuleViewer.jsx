import React, { useState } from 'react';
import { Code2, Play, Check, Copy, Camera, Radio } from 'lucide-react';
import { playSound } from '../services/audioSynthesizer';
import balanceBlitzImg from '../assets/balance_blitz.png';

export const OpenSourceModuleViewer = () => {
  const [isRunning, setIsRunning] = useState(false);

  const codeSnippet = `import { PoseStream } from '@family-fit/pose-stream'

const stream = new PoseStream({
  source: 'firetv://camera/family-room',
  players: 4,
  confidence: 0.82,
  smoothing: 'adaptive'
})

stream.on('pose', ({ player, joints }) => {
  game.updateSkeleton(player.id, joints)
  if (joints.knee.angle < 88) {
    coach.say('Great squat - hold it!')
  }
})

// Fire TV remote-friendly challenge state
export const challenge = {
  id: 'balance-blitz',
  duration: 45_000,
  voiceHints: true
}`;

  return (
    <div style={{
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <div style={{ width: '16px', height: '2px', background: '#FF9900' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#FF9900', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              DEVELOPER TOOLS
            </span>
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
            PoseStream JS
          </h2>
          <p style={{ color: '#94A3B8', marginTop: '6px', fontSize: '1rem' }}>
            A tiny WebSocket pose pipeline built for fluid Fire TV co-play — camera in, confidence out.
          </p>
        </div>

        <button
          onClick={() => {
            playSound('select');
            setIsRunning(!isRunning);
          }}
          onFocus={() => playSound('focus')}
          tabIndex={0}
          className="tv-focusable focus-cyan"
          style={{
            padding: '14px 28px',
            borderRadius: '16px',
            background: 'linear-gradient(90deg, #00F0FF 0%, #00A3FF 100%)',
            color: '#000000',
            fontWeight: '900',
            fontSize: '1rem',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)'
          }}
        >
          Run mini-challenge ▷
        </button>
      </div>

      {/* Code Editor & Mini-Challenge Preview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        {/* Left Panel: Code Console */}
        <div style={{
          background: 'rgba(8, 12, 22, 0.95)',
          borderRadius: '24px',
          border: '1px solid rgba(0, 240, 255, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Editor Header Bar */}
          <div style={{
            padding: '14px 20px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Code2 size={16} color="#00F0FF" />
              <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#FFFFFF', fontFamily: 'Space Grotesk, monospace' }}>
                poseStream.js
              </span>
              <span style={{ padding: '2px 8px', borderRadius: '8px', background: 'rgba(0, 255, 135, 0.15)', color: '#00FF87', fontSize: '0.65rem', fontWeight: '800' }}>
                ((•)) LIVE
              </span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', color: '#94A3B8', fontSize: '0.68rem', fontWeight: '700' }}>JAVASCRIPT</span>
              <span style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(0,240,255,0.15)', color: '#00F0FF', fontSize: '0.68rem', fontWeight: '700' }}>WEBSOCKET</span>
            </div>
          </div>

          {/* Editor Code Body */}
          <pre style={{
            margin: 0,
            padding: '20px 24px',
            color: '#E2E8F0',
            fontSize: '0.88rem',
            lineHeight: '1.6',
            fontFamily: 'Space Grotesk, monospace',
            overflowX: 'auto',
            flex: 1
          }}>
            {codeSnippet}
          </pre>

          {/* Editor Status Footer Bar */}
          <div style={{
            padding: '12px 20px',
            background: 'rgba(0,0,0,0.4)',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            fontSize: '0.78rem',
            color: '#00FF87',
            fontFamily: 'Space Grotesk, monospace'
          }}>
            &gt;_ PoseStream connected • 30 FPS • 2 players tracked • 18 ms latency
          </div>
        </div>

        {/* Right Panel: Balance Blitz Mini-Challenge */}
        <div style={{
          background: 'rgba(12, 17, 30, 0.85)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Header Pills */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ padding: '4px 10px', borderRadius: '10px', background: 'rgba(255,153,0,0.2)', color: '#FF9900', fontWeight: '800', fontSize: '0.68rem' }}>
              🏅 MINI-CHALLENGE
            </span>
            <span style={{ padding: '4px 10px', borderRadius: '10px', background: 'rgba(0,255,135,0.15)', color: '#00FF87', fontWeight: '800', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Camera size={12} /> CAMERA READY
            </span>
          </div>

          <div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
              Balance Blitz
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '4px', lineHeight: '1.4' }}>
              Hold three family-friendly poses while PoseStream scores stability in real time.
            </p>
          </div>

          {/* Camera Image Preview Banner */}
          <div style={{
            width: '100%',
            height: '150px',
            borderRadius: '16px',
            backgroundImage: `url(${balanceBlitzImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            padding: '12px',
            display: 'flex',
            alignItems: 'flex-start'
          }}>
            <span style={{ padding: '4px 10px', borderRadius: '8px', background: 'rgba(0,240,255,0.8)', color: '#000000', fontWeight: '900', fontSize: '0.65rem' }}>
              ((•)) LIVE PREVIEW
            </span>
          </div>

          {/* Pose Checklist Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,153,0,0.15)', border: '1px solid #FF9900', color: '#FFFFFF', fontWeight: '700', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#FF9900', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.75rem' }}>1</span>
              Tree pose • 15 sec
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#CBD5E1', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>2</span>
              Side reach • 15 sec
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#CBD5E1', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>3</span>
              Hero hold • 15 sec
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800' }}>
              <span style={{ color: '#94A3B8' }}>Pose confidence</span>
              <span style={{ color: '#00F0FF' }}>92%</span>
            </div>
            <div style={{ width: '100%', height: '6px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              <div style={{ width: '92%', height: '100%', background: '#00F0FF', borderRadius: '10px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
