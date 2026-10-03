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
      padding: '14px 28px',
      background: 'rgba(8, 10, 18, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 100
    }}>
      {/* Brand & Sub-labels */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #FF5500 0%, #FF007A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(255, 85, 0, 0.4)'
          }}>
            <Flame size={22} color="#FFFFFF" />
          </div>
          <div>
            <h1 style={{
              fontSize: '1.25rem',
              fontWeight: '900',
              color: '#FFFFFF',
              margin: 0,
              lineHeight: '1.1',
              letterSpacing: '-0.01em'
            }}>
              Family Fit Quest
            </h1>
            <span style={{ fontSize: '0.65rem', color: '#FF9900', fontWeight: '800', letterSpacing: '0.08em' }}>
              AMAZON FIRE TV
            </span>
          </div>
        </div>

        {/* Header Tech Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            padding: '5px 12px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#CBD5E1',
            fontSize: '0.75rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Tv size={13} color="#94A3B8" /> Fire TV
          </span>
          <span style={{
            padding: '5px 12px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#CBD5E1',
            fontSize: '0.75rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={13} color="#94A3B8" /> AWS Bedrock
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                padding: '8px 16px',
                borderRadius: '20px',
                background: isActive ? 'rgba(255, 153, 0, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                color: isActive ? '#FF9900' : '#CBD5E1',
                fontWeight: '700',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                border: isActive ? '1px solid #FF9900' : '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}

        {/* Alexa Voice Trigger Button */}
        <button
          onClick={onOpenVoice}
          onFocus={() => playSound('focus')}
          tabIndex={0}
          className="tv-focusable focus-cyan"
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            background: 'rgba(255, 153, 0, 0.15)',
            color: '#FF9900',
            fontWeight: '700',
            fontSize: '0.85rem',
            border: '1px solid #FF9900',
            display: 'flex',
            alignItems: 'center',
            gap: '7px'
          }}
        >
          <Mic size={15} color="#FF9900" />
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
            padding: '8px 14px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.04)',
            color: '#94A3B8',
            fontWeight: '600',
            fontSize: '0.82rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Tv size={15} />
          {showRemoteHud ? 'Hide Remote' : 'Show Remote'}
        </button>
      </nav>
    </header>
  );
};
