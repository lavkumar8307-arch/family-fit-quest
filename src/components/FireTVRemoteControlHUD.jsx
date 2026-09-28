import React from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Circle, RotateCcw, Home, Mic, Volume2 } from 'lucide-react';
import { playSound } from '../services/audioSynthesizer';

export const FireTVRemoteControlHUD = ({ onTriggerKey, onOpenVoice, onClose }) => {
  const triggerRemoteButton = (keyName, audioType = 'focus') => {
    playSound(audioType);
    onTriggerKey(keyName);
  };

  return (
    <div className="remote-hud animate-float">
      {/* HUD Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderBottom: '1px solid rgba(255,153,0,0.2)', paddingBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF9900', boxShadow: '0 0 10px #FF9900' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#FF9900', letterSpacing: '0.05em' }}>
            FIRE TV REMOTE SIMULATOR
          </span>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '0.8rem' }}
        >
          ✕
        </button>
      </div>

      {/* Alexa Mic Button */}
      <button
        onClick={() => {
          playSound('select');
          onOpenVoice();
        }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00F0FF 0%, #0072FF 100%)',
          border: 'none',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)',
          cursor: 'pointer'
        }}
      >
        <Mic size={24} />
      </button>

      {/* Fire TV D-Pad Ring */}
      <div style={{
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: '#1A2235',
        border: '2px solid rgba(255, 153, 0, 0.4)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.8)'
      }}>
        {/* D-Pad Up */}
        <button
          onClick={() => triggerRemoteButton('ArrowUp')}
          style={{
            position: 'absolute',
            top: '6px',
            background: 'none',
            border: 'none',
            color: '#FF9900',
            cursor: 'pointer'
          }}
        >
          <ChevronUp size={28} />
        </button>

        {/* D-Pad Down */}
        <button
          onClick={() => triggerRemoteButton('ArrowDown')}
          style={{
            position: 'absolute',
            bottom: '6px',
            background: 'none',
            border: 'none',
            color: '#FF9900',
            cursor: 'pointer'
          }}
        >
          <ChevronDown size={28} />
        </button>

        {/* D-Pad Left */}
        <button
          onClick={() => triggerRemoteButton('ArrowLeft')}
          style={{
            position: 'absolute',
            left: '6px',
            background: 'none',
            border: 'none',
            color: '#FF9900',
            cursor: 'pointer'
          }}
        >
          <ChevronLeft size={28} />
        </button>

        {/* D-Pad Right */}
        <button
          onClick={() => triggerRemoteButton('ArrowRight')}
          style={{
            position: 'absolute',
            right: '6px',
            background: 'none',
            border: 'none',
            color: '#FF9900',
            cursor: 'pointer'
          }}
        >
          <ChevronRight size={28} />
        </button>

        {/* Select / Enter Center Button */}
        <button
          onClick={() => triggerRemoteButton('Enter', 'select')}
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF9900 0%, #FF5500 100%)',
            border: 'none',
            color: '#000000',
            fontWeight: '900',
            fontSize: '0.75rem',
            cursor: 'pointer',
            boxShadow: '0 0 12px rgba(255, 153, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          SELECT
        </button>
      </div>

      {/* Secondary Controls (Back, Home, Options) */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={() => triggerRemoteButton('Escape', 'back')}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Back Button (Escape)"
        >
          <RotateCcw size={16} />
        </button>

        <button
          onClick={() => triggerRemoteButton('Home', 'select')}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title="Home Button"
        >
          <Home size={16} />
        </button>
      </div>

      <div style={{ fontSize: '0.7rem', color: '#64748B', textAlign: 'center' }}>
        Keyboard Shortcuts: <br />
        <code style={{ fontSize: '0.65rem', background: '#121726', color: '#FF9900' }}>
          Arrow Keys • Enter • Esc
        </code>
      </div>
    </div>
  );
};
