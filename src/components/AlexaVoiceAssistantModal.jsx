import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, X, Volume2, Play, Flame, Zap } from 'lucide-react';
import { processBedrockVoiceCommand } from '../services/bedrockService';
import { playSound } from '../services/audioSynthesizer';
import { speakAlexaFemaleVoice, stopAlexaVoice } from '../services/voiceService';

export const AlexaVoiceAssistantModal = ({ onClose, onExecuteVoiceAction }) => {
  const [voiceQuery, setVoiceQuery] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleCommands = [
    'Alexa, make it harder',
    'Alexa, pause game',
    'Alexa, show workout recap',
    'Alexa, recommend lower body exercise'
  ];

  useEffect(() => {
    return () => {
      stopAlexaVoice();
    };
  }, []);

  const handleSendVoiceQuery = async (queryText) => {
    playSound('select');
    setVoiceQuery(queryText);
    setIsProcessing(true);
    setAiResponse(null);
    stopAlexaVoice();

    const result = await processBedrockVoiceCommand(queryText);
    setIsProcessing(false);
    setAiResponse(result);

    if (result && result.response) {
      speakAlexaFemaleVoice(result.response);
    }

    if (onExecuteVoiceAction && result.action) {
      onExecuteVoiceAction(result.action);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 7, 15, 0.92)',
      backdropFilter: 'blur(20px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '720px',
        padding: '36px',
        borderRadius: '32px',
        background: 'rgba(10, 15, 28, 0.95)',
        border: '1px solid #00F0FF',
        boxShadow: '0 0 50px rgba(0, 240, 255, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        position: 'relative'
      }}>
        {/* Top Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Top Pill */}
        <span style={{
          padding: '5px 14px',
          borderRadius: '20px',
          background: 'rgba(0, 240, 255, 0.15)',
          color: '#00F0FF',
          border: '1px solid rgba(0, 240, 255, 0.4)',
          fontWeight: '800',
          fontSize: '0.72rem',
          letterSpacing: '0.08em',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <Sparkles size={12} /> ALEXA VOICE ASSISTANT
        </span>

        {/* Center Mic Glow Circle */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00F0FF 0%, #0099FF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#000000',
          boxShadow: '0 0 40px rgba(0, 240, 255, 0.6)'
        }}>
          <Mic size={38} />
        </div>

        {/* Title & Subtitle */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em' }}>
            Listening for your workout command
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#94A3B8', marginTop: '6px' }}>
            Speak naturally — Alexa understands the quest context.
          </p>
        </div>

        {/* Pulsing Audio Equalizer Wave Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '24px' }}>
          <div style={{ width: '4px', height: '14px', background: '#9D00FF', borderRadius: '4px' }} className="animate-pulse" />
          <div style={{ width: '4px', height: '22px', background: '#00F0FF', borderRadius: '4px' }} className="animate-pulse" />
          <div style={{ width: '4px', height: '10px', background: '#9D00FF', borderRadius: '4px' }} className="animate-pulse" />
          <div style={{ width: '4px', height: '24px', background: '#00F0FF', borderRadius: '4px' }} className="animate-pulse" />
          <div style={{ width: '4px', height: '16px', background: '#9D00FF', borderRadius: '4px' }} className="animate-pulse" />
        </div>

        {/* 4 Command Cards (2x2 Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', width: '100%', marginTop: '8px' }}>
          <button
            onClick={() => handleSendVoiceQuery('Alexa, pause game')}
            onFocus={() => playSound('focus')}
            tabIndex={0}
            className="tv-focusable"
            style={{
              padding: '20px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'left'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.12)', border: '1px solid rgba(0, 240, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F0FF' }}>
              ⏸
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '1.05rem' }}>"Pause the quest"</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '2px' }}>Freeze the timer and pose tracking</div>
            </div>
          </button>

          <button
            onClick={() => handleSendVoiceQuery('Alexa, repeat move')}
            onFocus={() => playSound('focus')}
            tabIndex={0}
            className="tv-focusable"
            style={{
              padding: '20px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'left'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.12)', border: '1px solid rgba(0, 240, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F0FF' }}>
              🔊
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '1.05rem' }}>"Repeat the move"</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '2px' }}>Hear the current move again</div>
            </div>
          </button>

          <button
            onClick={() => handleSendVoiceQuery('Alexa, make it easier')}
            onFocus={() => playSound('focus')}
            tabIndex={0}
            className="tv-focusable"
            style={{
              padding: '20px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'left'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.12)', border: '1px solid rgba(0, 240, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F0FF' }}>
              ⏱
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '1.05rem' }}>"Make it easier"</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '2px' }}>Lower intensity for the next round</div>
            </div>
          </button>

          <button
            onClick={() => handleSendVoiceQuery('Alexa, how are we doing')}
            onFocus={() => playSound('focus')}
            tabIndex={0}
            className="tv-focusable"
            style={{
              padding: '20px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textAlign: 'left'
            }}
          >
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(0, 240, 255, 0.12)', border: '1px solid rgba(0, 240, 255, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00F0FF' }}>
              📊
            </div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: '800', fontSize: '1.05rem' }}>"How are we doing?"</div>
              <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '2px' }}>Get a live family score update</div>
            </div>
          </button>
        </div>

        {/* Bottom Cancel Button */}
        <button
          onClick={onClose}
          style={{
            marginTop: '8px',
            padding: '12px 28px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#CBD5E1',
            fontWeight: '700',
            fontSize: '0.9rem',
            cursor: 'pointer'
          }}
        >
          Cancel voice command ×
        </button>
      </div>
    </div>
  );
};
