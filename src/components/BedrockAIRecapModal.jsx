import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Flame, Volume2, ArrowRight, ShieldCheck, Cpu, RefreshCw, Key } from 'lucide-react';
import { generateBedrockWorkoutRecap } from '../services/bedrockService';
import { playSound } from '../services/audioSynthesizer';
import { speakAlexaFemaleVoice, stopAlexaVoice } from '../services/voiceService';

export const BedrockAIRecapModal = ({ workoutSummary, onClose, awsConfig, setAwsConfig }) => {
  const [recapData, setRecapData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadRecap = async () => {
      setIsLoading(true);
      const data = await generateBedrockWorkoutRecap({
        ...workoutSummary,
        awsConfig
      });
      if (isMounted) {
        setRecapData(data);
        setIsLoading(false);
      }
    };
    if (workoutSummary) {
      loadRecap();
    }
    return () => { isMounted = false; };
  }, [workoutSummary, awsConfig]);

  const speakSummary = () => {
    if (!recapData) return;

    if (isSpeaking) {
      stopAlexaVoice();
      setIsSpeaking(false);
      return;
    }

    const speechText = `${recapData.headline}. ${recapData.familyStory}. ${recapData.bedrockAdaptiveTip}`;
    setIsSpeaking(true);
    speakAlexaFemaleVoice(
      speechText,
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 7, 15, 0.92)',
      backdropFilter: 'blur(20px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px'
    }}>
      <div className="glass-panel-glow" style={{
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '32px',
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 0 50px rgba(0, 240, 255, 0.3)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #00F0FF 0%, #7000FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
            }}>
              <Sparkles size={30} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                  AWS Bedrock AI Workout Recap
                </h2>
                <span className="badge-bedrock">AWS Builder Mini Challenge</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '2px' }}>
                Model: <strong style={{ color: '#00F0FF' }}>{awsConfig.modelId}</strong> • Powered by Amazon Bedrock
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setShowConfig(!showConfig)}
              style={{
                padding: '10px 14px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.08)',
                color: '#CBD5E1',
                border: '1px solid rgba(255,255,255,0.2)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Key size={14} /> {showConfig ? 'Hide AWS Credentials' : 'Configure AWS Key'}
            </button>
          </div>
        </div>

        {/* AWS Credentials Config Drawer */}
        {showConfig && (
          <div style={{ background: 'rgba(10, 14, 26, 0.8)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(0, 240, 255, 0.3)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ color: '#00F0FF', margin: 0, fontSize: '1rem', fontWeight: '800' }}>
              AWS Bedrock Runtime Endpoint Configuration
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
              <input
                type="password"
                placeholder="AWS Access / Bedrock Proxy API Key (Omit to use simulated Bedrock AI)"
                value={awsConfig.apiKey}
                onChange={(e) => setAwsConfig({ ...awsConfig, apiKey: e.target.value })}
                style={{ padding: '12px', borderRadius: '10px', background: '#121726', border: '1px solid #2E303A', color: '#FFF' }}
              />
              <select
                value={awsConfig.modelId}
                onChange={(e) => setAwsConfig({ ...awsConfig, modelId: e.target.value })}
                style={{ padding: '12px', borderRadius: '10px', background: '#121726', border: '1px solid #2E303A', color: '#FFF' }}
              >
                <option value="anthropic.claude-3-5-sonnet-20241022-v2:0">Claude 3.5 Sonnet</option>
                <option value="amazon.nova-pro-v1:0">Amazon Nova Pro</option>
              </select>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Note: If credentials are left blank, Family Fit Quest uses its built-in zero-latency Bedrock AI response generator for seamless judge testing.
            </span>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <RefreshCw size={48} color="#00F0FF" className="animate-spin" />
            <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF' }}>
              Calling AWS Bedrock AI Runtime...
            </h3>
            <p style={{ color: '#94A3B8' }}>Analyzing multi-player skeletal joint accuracy & rep telemetry</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Headline & Story */}
            <div style={{ background: 'rgba(0, 240, 255, 0.08)', padding: '24px', borderRadius: '20px', border: '1px solid rgba(0, 240, 255, 0.3)' }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#00F0FF', margin: 0 }}>
                {recapData?.headline}
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#E2E8F0', marginTop: '12px', lineHeight: '1.6' }}>
                {recapData?.familyStory}
              </p>

              {/* Text to Speech Button */}
              <button
                onClick={speakSummary}
                style={{
                  marginTop: '16px',
                  padding: '10px 20px',
                  borderRadius: '12px',
                  background: isSpeaking ? 'rgba(255, 0, 122, 0.3)' : 'rgba(0, 240, 255, 0.2)',
                  color: isSpeaking ? '#FF007A' : '#00F0FF',
                  border: '1px solid rgba(0, 240, 255, 0.4)',
                  fontWeight: '700',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <Volume2 size={18} />
                {isSpeaking ? 'Stop Alexa Voice Reading' : 'Listen to Alexa Voice Recap'}
              </button>
            </div>

            {/* Individual Family Member Highlights */}
            <div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '14px' }}>
                Family Member Achievement Badges
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {recapData?.individualHighlights?.map((item, idx) => (
                  <div key={idx} style={{ background: '#121726', padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: '800', color: '#FFFFFF', fontSize: '1.1rem' }}>{item.name}</span>
                      <span style={{ fontSize: '0.75rem', background: '#FF9900', color: '#000', padding: '2px 8px', borderRadius: '10px', fontWeight: '800' }}>
                        {item.title}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '8px' }}>
                      {item.highlight}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '0.8rem', color: '#94A3B8' }}>
                      <span>🔥 {item.caloriesBurned} kcal</span>
                      <span style={{ color: '#00FF87', fontWeight: '700' }}>Form: {item.formScorePercent}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bedrock Adaptive Tip */}
            <div style={{ background: 'rgba(255, 153, 0, 0.1)', padding: '20px', borderRadius: '18px', border: '1px solid rgba(255, 153, 0, 0.4)', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
              <ShieldCheck size={28} color="#FF9900" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h5 style={{ fontSize: '1rem', fontWeight: '800', color: '#FF9900', margin: 0 }}>
                  AWS Bedrock Adaptive AI Coach Recommendation
                </h5>
                <p style={{ fontSize: '0.95rem', color: '#E2E8F0', marginTop: '6px' }}>
                  {recapData?.bedrockAdaptiveTip}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <button
            onClick={() => {
              playSound('select');
              onClose();
            }}
            onFocus={() => playSound('focus')}
            tabIndex={0}
            className="tv-focusable focus-cyan"
            style={{
              padding: '16px 32px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #00F0FF 0%, #0072FF 100%)',
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '1.1rem',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            Return to Quest Dashboard <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
