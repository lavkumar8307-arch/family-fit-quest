/**
 * Family Fit Quest - Computer Vision & Multi-Player Pose Detection Engine
 * Priority Categories: Multi-Modal UX, Computer Vision, Fitness, Family Entertainment
 */

export const INITIAL_FAMILY_MEMBERS = [
  { id: 'p1', name: 'Maya', role: 'kid', avatar: '👧', color: '#00F0FF', repsDone: 0, score: 0, formAccuracy: 94, isTargetActive: true },
  { id: 'p2', name: 'Liam', role: 'kid', avatar: '👦', color: '#FF9900', repsDone: 0, score: 0, formAccuracy: 91, isTargetActive: true },
  { id: 'p3', name: 'Elena', role: 'mom', avatar: '👩', color: '#FF007A', repsDone: 0, score: 0, formAccuracy: 96, isTargetActive: false },
  { id: 'p4', name: 'Leo', role: 'dad', avatar: '👨', color: '#00FF87', repsDone: 0, score: 0, formAccuracy: 89, isTargetActive: false }
];

export const GAME_MODES = [
  {
    id: 'jungle-dash',
    title: 'Jungle Dash',
    category: 'Obstacle Course & Sprints',
    description: 'Dodge low branches with squats, leap over muddy logs, and sprint through golden jungle ruins!',
    icon: '🌴',
    accentColor: '#FF9900',
    requiredMotion: 'Squats & Jumps',
    difficulty: 'Medium',
    targetReps: 25
  },
  {
    id: 'cosmic-dance',
    title: 'Cosmic Dance-Off',
    category: 'Multi-Modal Rhythm Challenge',
    description: 'Strike glowing galaxy poses in rhythm! Align your arms and shoulders with cosmic constellations.',
    icon: '🚀',
    accentColor: '#00F0FF',
    requiredMotion: 'Pose Alignment',
    difficulty: 'Fun / Family',
    targetReps: 30
  },
  {
    id: 'lava-escape',
    title: 'Lava Temple Escape',
    category: 'Agility & Side Reaches',
    description: 'Dodge erupting magma rocks by sliding left and right while ducking under rolling boulders!',
    icon: '🌋',
    accentColor: '#FF007A',
    requiredMotion: 'Side Steps & Ducking',
    difficulty: 'High Energy',
    targetReps: 20
  },
  {
    id: 'hero-training',
    title: 'Superhero Academy',
    category: 'Power Punches & High Knees',
    description: 'Blast away shadow targets with dual power punches and charge your hero shield with high knee runs!',
    icon: '⚡',
    accentColor: '#00FF87',
    requiredMotion: 'Punches & Knees',
    difficulty: 'Hard',
    targetReps: 35
  }
];

/**
 * Generate simulated human pose skeleton joint telemetry for 1-4 players
 * @param {number} timestamp 
 * @param {Array} players 
 */
export const generateSimulatedPoseTelemetry = (timestamp, players) => {
  const activeCount = players.filter(p => p.isTargetActive).length || 1;
  const cycleTime = timestamp / 1000;

  return players.map((player, idx) => {
    if (!player.isTargetActive) return null;

    // Distribute players across camera frame X coordinates (0.2, 0.4, 0.6, 0.8)
    const baseX = (idx + 1) / (activeCount + 1);
    
    // Simulate motion based on sine wave harmonics
    const phaseOffset = idx * 1.5;
    const squatDepth = Math.sin(cycleTime * 2.5 + phaseOffset);
    const jumpHeight = Math.max(0, Math.sin(cycleTime * 3.5 + phaseOffset));
    const armAngle = Math.sin(cycleTime * 4.0 + phaseOffset);

    // Compute joint coordinates (Normalized 0.0 to 1.0)
    const headY = 0.25 - (jumpHeight * 0.08) + (squatDepth > 0.5 ? 0.12 : 0);
    const shoulderY = headY + 0.12;
    const hipY = shoulderY + 0.22 + (squatDepth > 0.5 ? 0.08 : 0);
    const kneeY = hipY + 0.18 - (squatDepth > 0.5 ? 0.06 : 0);
    const ankleY = 0.88;

    const leftWristX = baseX - 0.08 - (armAngle * 0.06);
    const leftWristY = shoulderY - 0.05 + (armAngle * 0.1);
    const rightWristX = baseX + 0.08 + (armAngle * 0.06);
    const rightWristY = shoulderY - 0.05 - (armAngle * 0.1);

    const isSquatting = squatDepth > 0.6;
    const isJumping = jumpHeight > 0.5;

    return {
      playerId: player.id,
      playerName: player.name,
      playerColor: player.color,
      joints: {
        head: { x: baseX, y: headY },
        leftShoulder: { x: baseX - 0.07, y: shoulderY },
        rightShoulder: { x: baseX + 0.07, y: shoulderY },
        leftElbow: { x: baseX - 0.11, y: shoulderY + 0.08 },
        rightElbow: { x: baseX + 0.11, y: shoulderY + 0.08 },
        leftWrist: { x: leftWristX, y: leftWristY },
        rightWrist: { x: rightWristX, y: rightWristY },
        leftHip: { x: baseX - 0.05, y: hipY },
        rightHip: { x: baseX + 0.05, y: hipY },
        leftKnee: { x: baseX - 0.06, y: kneeY },
        rightKnee: { x: baseX + 0.06, y: kneeY },
        leftAnkle: { x: baseX - 0.05, y: ankleY },
        rightAnkle: { x: baseX + 0.05, y: ankleY }
      },
      detectedAction: isJumping ? 'JUMP' : (isSquatting ? 'SQUAT' : 'PUNCH'),
      confidenceScore: 0.94 + Math.random() * 0.05
    };
  }).filter(Boolean);
};
