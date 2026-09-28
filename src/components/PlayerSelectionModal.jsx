import React from 'react';
import { Users, CheckCircle2, UserPlus, QrCode, Smartphone, Sparkles, ShieldCheck } from 'lucide-react';
import { playSound } from '../services/audioSynthesizer';

export const PlayerSelectionModal = ({ players, setPlayers, onStartWorkout }) => {
  const togglePlayerActive = (playerId) => {
    playSound('select');
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, isTargetActive: !p.isTargetActive } : p))
    );
  };

  const activeCount = players.filter((p) => p.isTargetActive).length;

  return (
    <div style={{
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '36px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '28px'
    }}>
      {/* Header Banner */}
      <div className="glass-panel-glow" style={{ padding: '28px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '2rem' }}>👨‍👩‍👧‍👦</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
              Family Multi-Player Roster
            </h2>
            <span className="badge-amazon" style={{ fontSize: '0.8rem' }}>Up to 4 Active Players</span>
          </div>
          <p style={{ color: '#94A3B8', marginTop: '8px', fontSize: '1.05rem' }}>
            Choose who is playing today! Fire TV AI Vision engine tracks everyone simultaneously over mobile camera or built-in simulator.
          </p>
        </div>

        <button
          onClick={onStartWorkout}
          onFocus={() => playSound('focus')}
          tabIndex={0}
          className="tv-focusable focus-green"
          style={{
            padding: '16px 36px',
            borderRadius: '20px',
            background: activeCount > 0 ? 'linear-gradient(135deg, #00FF87 0%, #00B862 100%)' : 'rgba(255,255,255,0.1)',
            color: '#000000',
            fontWeight: '900',
            fontSize: '1.25rem',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 0 30px rgba(0, 255, 135, 0.4)'
          }}
          disabled={activeCount === 0}
        >
          <Sparkles size={24} />
          Start Quest with {activeCount} Player{activeCount > 1 ? 's' : ''}
        </button>
      </div>

      {/* Player Cards Grid (Focusable 10-Foot UI) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
        gap: '24px'
      }}>
        {players.map((player) => {
          const isActive = player.isTargetActive;
          return (
            <div
              key={player.id}
              onClick={() => togglePlayerActive(player.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  togglePlayerActive(player.id);
                }
              }}
              onFocus={() => playSound('focus')}
              tabIndex={0}
              className={`tv-focusable glass-panel ${isActive ? 'is-focused' : ''}`}
              style={{
                padding: '28px',
                borderRadius: '24px',
                borderColor: isActive ? player.color : 'rgba(255, 255, 255, 0.1)',
                background: isActive
                  ? `linear-gradient(145deg, rgba(20, 28, 48, 0.9) 0%, rgba(10, 14, 26, 0.95) 100%)`
                  : 'rgba(15, 20, 32, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'relative'
              }}
            >
              {/* Active Checkbox Badge */}
              <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                {isActive ? (
                  <CheckCircle2 size={28} color={player.color} />
                ) : (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
                )}
              </div>

              {/* Avatar */}
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '24px',
                background: `${player.color}22`,
                border: `2px solid ${player.color}`,
                fontSize: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: isActive ? `0 0 20px ${player.color}44` : 'none'
              }}>
                {player.avatar}
              </div>

              {/* Info */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                    {player.name}
                  </h3>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: player.role === 'kid' ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 153, 0, 0.2)',
                    color: player.role === 'kid' ? '#00F0FF' : '#FF9900',
                    fontWeight: '700',
                    textTransform: 'uppercase'
                  }}>
                    {player.role}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '4px' }}>
                  Form Target: {player.formAccuracy}% Accuracy • Adaptive AI Scaling
                </p>
              </div>

              {/* Player Stats */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '0.85rem',
                color: '#CBD5E1'
              }}>
                <span>Joint Tracking: <strong style={{ color: player.color }}>Ready</strong></span>
                <span>Pose: MediaPipe CV</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Phone Sync Mobile Relay Box */}
      <div className="glass-panel" style={{ padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            padding: '14px',
            borderRadius: '16px',
            background: 'rgba(0, 240, 255, 0.15)',
            color: '#00F0FF',
            border: '1px solid rgba(0, 240, 255, 0.3)'
          }}>
            <Smartphone size={32} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
              Optional: Pair Smartphone Camera over @family-fit/pose-stream
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#94A3B8', marginTop: '2px' }}>
              Prop your smartphone on the coffee table. No TV camera required! Streams skeletal joint vectors to Fire TV over WebSockets.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.4)', padding: '10px 16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <QrCode size={24} color="#FF9900" />
          <span style={{ fontSize: '0.85rem', color: '#FF9900', fontWeight: '700' }}>
            SCAN QR / CODE: FIT-7782
          </span>
        </div>
      </div>
    </div>
  );
};
