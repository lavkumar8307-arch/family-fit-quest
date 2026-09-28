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
      background: 'rgba(5, 7, 15, 0.88)',
      backdropFilter: 'blur(16px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div className="glass-panel-glow" style={{
        width: '100%',
        maxWidth: '700px',
        padding: '36px',
        borderRadius: '32px',
        border: '1px solid rgba(0, 240, 255, 0.5)',
        boxShadow: '0 0 50px rgba(0, 240, 255, 0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="animate-pulse-ring" style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00F0FF 0%, #0072FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF'
            }}>
              <Mic size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                Fire TV Alexa Voice Assistant
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#00F0FF', marginTop: '2px' }}>
                Multi-Modal UX Voice Trigger powered by AWS Bedrock
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Listening Indicator */}
        <div style={{
          background: 'rgba(10, 14, 26, 0.8)',
          padding: '28px',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          {isProcessing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00F0FF', fontWeight: '700' }}>
              <Sparkles size={24} className="animate-spin" /> Processing voice command on Fire TV...
            </div>
          ) : aiResponse ? (
            <div>
              <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase' }}>COMMAND: "{voiceQuery}"</span>
              <p style={{ fontSize: '1.2rem', color: '#00FF87', fontWeight: '800', marginTop: '8px' }}>
                {aiResponse.response}
              </p>
            </div>
          ) : (
            <p style={{ fontSize: '1.1rem', color: '#CBD5E1', margin: 0 }}>
              Say or select a command to speak with Alexa on Fire TV:
            </p>
          )}
        </div>

        {/* Sample Voice Prompts (10-Foot Focusable) */}
        <div>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Quick Fire TV Alexa Voice Commands:
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
            {sampleCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleSendVoiceQuery(cmd)}
                onFocus={() => playSound('focus')}
                tabIndex={0}
                className="tv-focusable focus-cyan"
                style={{
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background: 'rgba(0, 240, 255, 0.1)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Mic size={16} color="#00F0FF" />
                {cmd}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
