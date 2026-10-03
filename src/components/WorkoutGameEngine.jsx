import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Flame, Zap, Trophy, Video, Volume2, Sparkles, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { GAME_MODES, generateSimulatedPoseTelemetry } from '../services/poseDetectionEngine';
import { playSound } from '../services/audioSynthesizer';
import confetti from 'canvas-confetti';

import jungleDashImg from '../assets/jungle_dash.png';
import cosmicDanceImg from '../assets/cosmic_dance.png';
import lavaTempleImg from '../assets/lava_temple.png';
import superheroAcademyImg from '../assets/superhero_academy.png';

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div style={{ width: '16px', height: '2px', background: '#FF9900' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#FF9900', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                ADVENTURE MODE
              </span>
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#FFFFFF', margin: 0, letterSpacing: '-0.02em' }}>
              Choose your family adventure
            </h2>
            <p style={{ color: '#94A3B8', marginTop: '6px', fontSize: '1.05rem' }}>
              Move together, score together. Each quest adapts to your players and celebrates every win.
            </p>
          </div>

          {/* 4 Quest Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {[
              {
                id: 'jungle-dash',
                title: 'Jungle Dash',
                description: 'Sprint, duck, and leap through a glowing rainforest trail.',
                stats: '⏱ 12 min • Cardio • All ages',
                icon: '🌲',
                image: jungleDashImg,
                accentColor: '#00FF87',
                badgeText: 'REMOTE FOCUS',
                badgeBg: '#FF9900'
              },
              {
                id: 'cosmic-dance',
                title: 'Cosmic Dance-Off',
                description: 'Match the beat and power the family spaceship together.',
                stats: '⏱ 10 min • Dance • Easy',
                icon: '🎵',
                image: cosmicDanceImg,
                accentColor: '#9D00FF',
                badgeText: 'READY',
                badgeBg: 'rgba(255, 255, 255, 0.15)'
              },
              {
                id: 'lava-escape',
                title: 'Lava Temple Escape',
                description: 'Balance and squat across ancient platforms before time runs out.',
                stats: '⏱ 14 min • Agility • Medium',
                icon: '🔥',
                image: lavaTempleImg,
                accentColor: '#FF5500',
                badgeText: 'READY',
                badgeBg: 'rgba(255, 255, 255, 0.15)'
              },
              {
                id: 'hero-training',
                title: 'Superhero Academy',
                description: 'Train your powers with punches, poses, and super-speed reps.',
                stats: '⏱ 15 min • Strength • Medium',
                icon: '🛡️',
                image: superheroAcademyImg,
                accentColor: '#00F0FF',
                badgeText: 'READY',
                badgeBg: 'rgba(255, 255, 255, 0.15)'
              }
            ].map((game) => {
              const isSelected = selectedGame.id === game.id;
              return (
                <div
                  key={game.id}
                  onClick={() => {
                    playSound('select');
                    const fullGame = GAME_MODES.find(g => g.id === game.id) || GAME_MODES[0];
                    setSelectedGame(fullGame);
                  }}
                  onFocus={() => playSound('focus')}
                  tabIndex={0}
                  className={`tv-focusable glass-panel ${isSelected ? 'is-focused' : ''}`}
                  style={{
                    borderRadius: '24px',
                    border: isSelected ? '2px solid #FF9900' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'rgba(12, 17, 30, 0.85)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: isSelected ? '0 0 30px rgba(255, 153, 0, 0.4)' : 'none'
                  }}
                >
                  {/* Image Banner */}
                  <div style={{
                    width: '100%',
                    height: '160px',
                    backgroundImage: `url(${game.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(12,17,30,0.95) 100%)'
                    }} />

                    {/* Top Left Icon Circle */}
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `${game.accentColor}33`,
                      border: `1px solid ${game.accentColor}66`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      zIndex: 1,
                      backdropFilter: 'blur(8px)'
                    }}>
                      {game.icon}
                    </div>

                    {/* Top Right Status Badge */}
                    <span style={{
                      zIndex: 1,
                      padding: '4px 10px',
                      borderRadius: '10px',
                      background: game.badgeBg,
                      color: game.badgeText === 'REMOTE FOCUS' ? '#000000' : '#E2E8F0',
                      fontWeight: '800',
                      fontSize: '0.68rem',
                      letterSpacing: '0.05em'
                    }}>
                      {game.badgeText}
                    </span>
                  </div>

                  {/* Body Text */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                      {game.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.4', margin: 0 }}>
                      {game.description}
                    </p>
                    <div style={{ marginTop: 'auto', paddingTop: '10px', fontSize: '0.8rem', color: '#00F0FF', fontWeight: '700' }}>
                      {game.stats}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Launch Bar Banner */}
          <div style={{
            background: 'rgba(12, 17, 30, 0.85)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                background: 'rgba(0, 255, 135, 0.15)',
                border: '1px solid #00FF87',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem'
              }}>
                🌲
              </div>
              <div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#FFFFFF', margin: 0 }}>
                  {selectedGame.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginTop: '3px' }}>
                  2 players ready • Camera connected • Adaptive mode on
                </p>
              </div>
            </div>

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
                padding: '14px 28px',
                borderRadius: '16px',
                background: 'linear-gradient(90deg, #FF9900 0%, #FF007A 100%)',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '1.05rem',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 0 25px rgba(255, 153, 0, 0.4)'
              }}
            >
              Launch {selectedGame.title} ▷
            </button>
          </div>
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
