import React from 'react';
import { Tv, Cpu, Flame, Mic, Sparkles, Code2, Trophy, HelpCircle } from 'lucide-react';
import { playSound } from '../services/audioSynthesizer';

export const Navbar = ({
  activeTab,
  setActiveTab,
  players = [],
  onOpenVoice,
  onOpenSubmission,
  showRemoteHud,
  setShowRemoteHud
}) => {
  const activePlayers = players.filter((p) => p.isTargetActive);

  const handleTabSelect = (tabId) => {
    playSound('select');
    setActiveTab(tabId);
  };

  return (
    <header style={{
      width: '100%',
      padding: '16px 36px',
      background: 'rgba(10, 14, 26, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100
    }}>
      {/* Brand & Amazon Track Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #FF9900 0%, #FF007A 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(255, 153, 0, 0.5)'
        }}>
          <Flame size={28} color="#FFFFFF" />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{
              fontSize: '1.6rem',
              fontWeight: '900',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(90deg, #FFFFFF 0%, #E2E8F0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              FAMILY FIT QUEST
            </h1>
            <span className="badge-amazon" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Tv size={12} /> Fire TV
            </span>
            <span className="badge-bedrock" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} /> AWS Bedrock
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '2px' }}>
            Multi-Modal Family AI Fitness Game • 10-Foot Remote Spatial Navigation
          </p>
        </div>
      </div>

      {/* Navigation Tabs (10-Foot D-Pad Focusable Buttons) */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {[
          { id: 'dashboard', label: 'Play Quest', icon: Flame },
          { id: 'players', label: `Players (${activePlayers.length})`, icon: Cpu },
          { id: 'opensource', label: 'PoseStream JS', icon: Code2 },
          { id: 'submission', label: 'Devpost Hub', icon: Trophy }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabSelect(tab.id)}
              onFocus={() => playSound('focus')}
              tabIndex={0}
              className={`tv-focusable ${isActive ? 'is-focused' : ''}`}
              style={{
                padding: '10px 18px',
                borderRadius: '12px',
                background: isActive ? 'rgba(255, 153, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                color: isActive ? '#FF9900' : '#E2E8F0',
                fontWeight: '700',
                fontSize: '0.95rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: isActive ? '1px solid #FF9900' : '1px solid rgba(255,255,255,0.1)'
              }}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Action Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Alexa Voice Trigger Button */}
        <button
          onClick={onOpenVoice}
          onFocus={() => playSound('focus')}
          tabIndex={0}
          className="tv-focusable focus-cyan"
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2) 0%, rgba(0, 150, 255, 0.3) 100%)',
            color: '#00F0FF',
            fontWeight: '700',
            fontSize: '0.9rem',
            border: '1px solid rgba(0, 240, 255, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Mic size={18} className="animate-pulse-ring" />
          Alexa Voice
        </button>

        {/* Fire TV Controller HUD Toggle */}
        <button
          onClick={() => {
            playSound('select');
            setShowRemoteHud(!showRemoteHud);
          }}
          onFocus={() => playSound('focus')}
          tabIndex={0}
          className="tv-focusable"
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
            background: showRemoteHud ? 'rgba(255, 153, 0, 0.3)' : 'rgba(255, 255, 255, 0.08)',
            color: '#FFFFFF',
            fontWeight: '700',
            fontSize: '0.85rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Tv size={16} />
          {showRemoteHud ? 'Hide Remote' : 'Show Remote'}
        </button>
      </div>
    </header>
  );
};
