import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Flame, Zap, Trophy, Video, Volume2, Sparkles, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { GAME_MODES, generateSimulatedPoseTelemetry } from '../services/poseDetectionEngine';
import { playSound } from '../services/audioSynthesizer';
import confetti from 'canvas-confetti';

export const WorkoutGameEngine = ({ players, setPlayers, onFinishWorkout, awsConfig }) => {
  const [selectedGame, setSelectedGame] = useState(GAME_MODES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameTimeLeft, setGameTimeLeft] = useState(45);
  const [totalScore, setTotalScore] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [recentActionText, setRecentActionText] = useState('');
  
  const canvasRef = useRef(null);
  const activePlayers = players.filter((p) => p.isTargetActive);

  const prompts = [
    { action: 'SQUAT', text: '🏃 SQUAT LOW TO DODGE BRANCHES!', icon: '⬇️', color: '#FF9900' },
    { action: 'JUMP', text: '⚡ JUMP HIGH OVER THE LAVA!', icon: '⬆️', color: '#00F0FF' },
    { action: 'PUNCH', text: '💥 POWER PUNCH SHADOW TARGETS!', icon: '🥊', color: '#FF007A' },
    { action: 'SIDE_STEP', text: '↔️ SIDE STEP RIGHT & REACH!', icon: '👉', color: '#00FF87' }
  ];

  // Game Loop Timer & Pose Telemetry Loop
  useEffect(() => {
    let timerInterval = null;
    let animFrame = null;

    if (isPlaying) {
      timerInterval = setInterval(() => {
        setGameTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleGameComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Rotate movement prompts every 4 seconds
      const promptInterval = setInterval(() => {
        setActivePromptIndex((prev) => (prev + 1) % prompts.length);
      }, 4000);

      // Render Skeleton Joints on Fire TV AI Vision Canvas
      const renderCanvas = (time) => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          const width = canvas.width;
          const height = canvas.height;

          // Dark Vision background
          ctx.clearRect(0, 0, width, height);

          // Render Pose Telemetry
          const telemetryData = generateSimulatedPoseTelemetry(time, players);

          telemetryData.forEach((pData) => {
            const j = pData.joints;
            ctx.lineWidth = 4;
            ctx.strokeStyle = pData.playerColor;

            // Draw Bone Skeleton connections
            const connections = [
              [j.head, j.leftShoulder], [j.head, j.rightShoulder],
              [j.leftShoulder, j.rightShoulder],
              [j.leftShoulder, j.leftElbow], [j.leftElbow, j.leftWrist],
              [j.rightShoulder, j.rightElbow], [j.rightElbow, j.rightWrist],
              [j.leftShoulder, j.leftHip], [j.rightShoulder, j.rightHip],
              [j.leftHip, j.rightHip],
              [j.leftHip, j.leftKnee], [j.leftKnee, j.leftAnkle],
              [j.rightHip, j.rightKnee], [j.rightKnee, j.rightAnkle]
            ];

            connections.forEach(([start, end]) => {
              ctx.beginPath();
              ctx.moveTo(start.x * width, start.y * height);
              ctx.lineTo(end.x * width, end.y * height);
              ctx.stroke();
            });

            // Draw Glowing Joint Dots
            Object.values(j).forEach((node) => {
              ctx.beginPath();
              ctx.arc(node.x * width, node.y * height, 6, 0, 2 * Math.PI);
              ctx.fillStyle = '#FFFFFF';
              ctx.shadowColor = pData.playerColor;
              ctx.shadowBlur = 10;
              ctx.fill();
            });

            // Player Tag above head
            ctx.font = 'bold 16px Outfit, sans-serif';
            ctx.fillStyle = pData.playerColor;
            ctx.shadowBlur = 4;
            ctx.fillText(`${pData.playerName} (${pData.detectedAction})`, j.head.x * width - 40, j.head.y * height - 16);
          });
        }
        animFrame = requestAnimationFrame(renderCanvas);
      };

      animFrame = requestAnimationFrame(renderCanvas);

      return () => {
        clearInterval(timerInterval);
        clearInterval(promptInterval);
        if (animFrame) cancelAnimationFrame(animFrame);
      };
    }
  }, [isPlaying, players]);

  // Handle Action Trigger (Simulated or Camera Detected)
  const triggerMotionScore = (actionType, playerId = null) => {
    playSound('point');
    const pts = 150 * comboMultiplier;
    setTotalScore((prev) => prev + pts);
    setComboMultiplier((prev) => Math.min(8, prev + 1));
    setRecentActionText(`+${pts} PTS! ${actionType} MATCH!`);

    // Update active player's rep count
    setPlayers((prev) =>
      prev.map((p) => {
        if (!p.isTargetActive) return p;
        if (!playerId || p.id === playerId) {
          return { ...p, repsDone: (p.repsDone || 0) + 1, score: (p.score || 0) + pts };
        }
        return p;
      })
    );

    // Burst confetti if combo multiplier reaches 5x
    if (comboMultiplier >= 4) {
      playSound('combo');
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleGameComplete = () => {
    setIsPlaying(false);
    playSound('victory');
    confetti({ particleCount: 120, spread: 100, origin: { y: 0.4 } });
    onFinishWorkout({
      gameTitle: selectedGame.title,
      durationSeconds: 45 - gameTimeLeft || 45,
      totalScore,
      maxCombo: comboMultiplier,
      players: activePlayers
    });
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1360px',
      margin: '0 auto',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      {/* Game Mode Selector Carousel (When not in active game) */}
      {!isPlaying && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                Select Adventure Game Mode
              </h2>
              <p style={{ color: '#94A3B8', marginTop: '4px' }}>
                Use Fire TV remote Arrow Keys to browse modes. Press Select to launch workout!
              </p>
            </div>

            {/* Active Players Summary Badge */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {activePlayers.map((p) => (
                <div
                  key={p.id}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '16px',
                    background: `${p.color}22`,
                    border: `1px solid ${p.color}`,
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{p.avatar}</span> {p.name}
                </div>
              ))}
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {GAME_MODES.map((game) => {
              const isSelected = selectedGame.id === game.id;
              return (
                <div
                  key={game.id}
                  onClick={() => {
                    playSound('select');
                    setSelectedGame(game);
                  }}
                  onFocus={() => playSound('focus')}
                  tabIndex={0}
                  className={`tv-focusable glass-panel ${isSelected ? 'is-focused' : ''}`}
                  style={{
                    padding: '24px',
                    borderRadius: '24px',
                    borderColor: isSelected ? game.accentColor : 'rgba(255, 255, 255, 0.1)',
                    background: isSelected
                      ? `linear-gradient(135deg, ${game.accentColor}25 0%, rgba(10, 14, 26, 0.95) 100%)`
                      : 'rgba(15, 20, 32, 0.6)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '3rem' }}>{game.icon}</span>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(255, 153, 0, 0.2)',
                      color: '#FF9900',
                      fontWeight: '800',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase'
                    }}>
                      {game.difficulty}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                      {game.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#94A3B8', marginTop: '6px', lineHeight: '1.4' }}>
                      {game.description}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    fontSize: '0.85rem',
                    color: '#CBD5E1'
                  }}>
                    <span>Target: <strong>{game.requiredMotion}</strong></span>
                    <span style={{ color: game.accentColor, fontWeight: '700' }}>Goal: {game.targetReps} reps</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Big Start Quest Button */}
          <button
            onClick={() => {
              playSound('select');
              setGameTimeLeft(45);
              setTotalScore(0);
              setComboMultiplier(1);
              setIsPlaying(true);
            }}
            onFocus={() => playSound('focus')}
            tabIndex={0}
            className="tv-focusable focus-cyan"
            style={{
              width: '100%',
              padding: '24px',
              borderRadius: '24px',
              background: `linear-gradient(135deg, ${selectedGame.accentColor} 0%, #FF007A 100%)`,
              color: '#FFFFFF',
              fontWeight: '900',
              fontSize: '1.5rem',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              boxShadow: `0 0 40px ${selectedGame.accentColor}55`,
              marginTop: '12px'
            }}
          >
            <Play size={32} fill="#FFFFFF" />
            Launch {selectedGame.title} (Fire TV 10-Foot AI Experience)
          </button>
        </div>
      )}

      {/* Active Game Stage View */}
      {isPlaying && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Top Game HUD Bar */}
          <div className="glass-panel" style={{ padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span style={{ fontSize: '2.5rem' }}>{selectedGame.icon}</span>
              <div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                  {selectedGame.title}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <span style={{ color: '#00F0FF', fontWeight: '700', fontSize: '0.9rem' }}>
                    Multi-Player Vision Active ({activePlayers.length})
                  </span>
                </div>
              </div>
            </div>

            {/* Score & Combo Gauge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  TEAM SCORE
                </span>
                <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#FF9900', fontFamily: 'Space Grotesk, monospace' }}>
                  {totalScore.toLocaleString()}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  COMBO MULTIPLIER
                </span>
                <div style={{
                  fontSize: '2.2rem',
                  fontWeight: '900',
                  color: comboMultiplier >= 4 ? '#00FF87' : '#00F0FF',
                  fontFamily: 'Space Grotesk, monospace'
                }}>
                  {comboMultiplier}x 🔥
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.8rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  TIME REMAINING
                </span>
                <div style={{
                  fontSize: '2.4rem',
                  fontWeight: '900',
                  color: gameTimeLeft <= 10 ? '#FF007A' : '#FFFFFF',
                  fontFamily: 'Space Grotesk, monospace'
                }}>
                  {gameTimeLeft}s
                </div>
              </div>
            </div>

            {/* Quit Game Button */}
            <button
              onClick={handleGameComplete}
              onFocus={() => playSound('focus')}
              tabIndex={0}
              className="tv-focusable"
              style={{
                padding: '12px 20px',
                borderRadius: '16px',
                background: 'rgba(255,0,122,0.2)',
                color: '#FF007A',
                border: '1px solid rgba(255,0,122,0.4)',
                fontWeight: '800',
                fontSize: '0.95rem'
              }}
            >
              Finish Quest
            </button>
          </div>

          {/* Action Prompt Banner */}
          <div className="glass-panel-glow" style={{
            padding: '20px 32px',
            borderColor: prompts[activePromptIndex].color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: `0 0 30px ${prompts[activePromptIndex].color}44`
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '2.5rem' }}>{prompts[activePromptIndex].icon}</span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#FFFFFF', margin: 0 }}>
                {prompts[activePromptIndex].text}
              </h2>
            </div>
            {recentActionText && (
              <span style={{
                fontSize: '1.3rem',
                fontWeight: '900',
                color: '#00FF87',
                background: 'rgba(0, 255, 135, 0.15)',
                padding: '8px 20px',
                borderRadius: '20px',
                border: '1px solid #00FF87'
              }}>
                {recentActionText}
              </span>
            )}
          </div>

          {/* Split Stage: Live AI Vision Canvas + Interactive Pose Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', height: '440px' }}>
            {/* AI Vision Skeleton Canvas */}
            <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', borderRadius: '24px', background: '#05070F' }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={440}
                style={{ width: '100%', height: '100%', display: 'block' }}
              />

              {/* Video Overlay Tag */}
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'rgba(10, 14, 26, 0.85)',
                padding: '8px 16px',
                borderRadius: '14px',
                border: '1px solid rgba(0, 240, 255, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: '#00F0FF',
                fontWeight: '700'
              }}>
                <Video size={16} /> Fire TV AI Vision Engine: 4-Player Telemetry Active
              </div>
            </div>

            {/* Simulated Motion Triggers & Player Telemetry Side Panel */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#FF9900" /> Pose Motion Triggers
                </h4>
                <p style={{ fontSize: '0.8rem', color: '#94A3B8', marginTop: '4px' }}>
                  Perform physical movements or click below to simulate joint accuracy score:
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={() => triggerMotionScore('SQUAT')}
                  onFocus={() => playSound('focus')}
                  tabIndex={0}
                  className="tv-focusable"
                  style={{
                    padding: '14px',
                    borderRadius: '16px',
                    background: 'rgba(255, 153, 0, 0.2)',
                    color: '#FF9900',
                    border: '1px solid #FF9900',
                    fontWeight: '800',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>⬇️ Execute Squat</span>
                  <span style={{ fontSize: '0.8rem', background: '#FF9900', color: '#000', padding: '2px 8px', borderRadius: '10px' }}>+150 PTS</span>
                </button>

                <button
                  onClick={() => triggerMotionScore('JUMP')}
                  onFocus={() => playSound('focus')}
                  tabIndex={0}
                  className="tv-focusable focus-cyan"
                  style={{
                    padding: '14px',
                    borderRadius: '16px',
                    background: 'rgba(0, 240, 255, 0.2)',
                    color: '#00F0FF',
                    border: '1px solid #00F0FF',
                    fontWeight: '800',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>⚡ Execute Jump</span>
                  <span style={{ fontSize: '0.8rem', background: '#00F0FF', color: '#000', padding: '2px 8px', borderRadius: '10px' }}>+150 PTS</span>
                </button>

                <button
                  onClick={() => triggerMotionScore('PUNCH')}
                  onFocus={() => playSound('focus')}
                  tabIndex={0}
                  className="tv-focusable focus-pink"
                  style={{
                    padding: '14px',
                    borderRadius: '16px',
                    background: 'rgba(255, 0, 122, 0.2)',
                    color: '#FF007A',
                    border: '1px solid #FF007A',
                    fontWeight: '800',
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>🥊 Power Punch</span>
                  <span style={{ fontSize: '0.8rem', background: '#FF007A', color: '#FFF', padding: '2px 8px', borderRadius: '10px' }}>+150 PTS</span>
                </button>
              </div>

              {/* Live Player Rep Count */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                {activePlayers.map((p) => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span style={{ color: p.color, fontWeight: '700' }}>{p.avatar} {p.name}</span>
                    <span style={{ color: '#FFFFFF', fontWeight: '800' }}>{p.repsDone || 0} reps • {p.score || 0} pts</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
