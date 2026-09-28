import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PlayerSelectionModal } from './components/PlayerSelectionModal';
import { WorkoutGameEngine } from './components/WorkoutGameEngine';
import { BedrockAIRecapModal } from './components/BedrockAIRecapModal';
import { AlexaVoiceAssistantModal } from './components/AlexaVoiceAssistantModal';
import { SubmissionHubModal } from './components/SubmissionHubModal';
import { OpenSourceModuleViewer } from './components/OpenSourceModuleViewer';
import { FireTVRemoteControlHUD } from './components/FireTVRemoteControlHUD';
import { INITIAL_FAMILY_MEMBERS } from './services/poseDetectionEngine';
import { playSound } from './services/audioSynthesizer';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [players, setPlayers] = useState(INITIAL_FAMILY_MEMBERS);
  const [workoutSummary, setWorkoutSummary] = useState(null);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [showRemoteHud, setShowRemoteHud] = useState(true);
  const [awsConfig, setAwsConfig] = useState({
    apiKey: '',
    region: 'us-east-1',
    modelId: 'anthropic.claude-3-5-sonnet-20241022-v2:0'
  });

  // Handle D-Pad Keyboard Navigation Mapping for 10-Foot TV Remote
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Fire TV Remote D-Pad keys & standard keyboard arrows
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        playSound('focus');
      } else if (e.key === 'Enter') {
        playSound('select');
      } else if (e.key === 'Escape' || e.key === 'Backspace') {
        playSound('back');
        if (showVoiceModal) setShowVoiceModal(false);
        else if (workoutSummary) setWorkoutSummary(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showVoiceModal, workoutSummary]);

  // Virtual Remote Trigger Handler
  const handleRemoteTriggerKey = (keyName) => {
    const event = new KeyboardEvent('keydown', { key: keyName, bubbles: true });
    document.dispatchEvent(event);

    // Dispatch focus shift or action trigger
    const focusables = Array.from(document.querySelectorAll('.tv-focusable, button, input'));
    const active = document.activeElement;
    let currentIndex = focusables.indexOf(active);

    if (keyName === 'ArrowRight' || keyName === 'ArrowDown') {
      const nextIdx = (currentIndex + 1) % focusables.length;
      focusables[nextIdx]?.focus();
    } else if (keyName === 'ArrowLeft' || keyName === 'ArrowUp') {
      const prevIdx = (currentIndex - 1 + focusables.length) % focusables.length;
      focusables[prevIdx]?.focus();
    } else if (keyName === 'Enter') {
      active?.click();
    }
  };

  const handleFinishWorkout = (summaryData) => {
    setWorkoutSummary(summaryData);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Fire TV Navbar Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        players={players}
        onOpenVoice={() => setShowVoiceModal(true)}
        showRemoteHud={showRemoteHud}
        setShowRemoteHud={setShowRemoteHud}
      />

      {/* Main Content Router */}
      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
        {activeTab === 'dashboard' && (
          <WorkoutGameEngine
            players={players}
            setPlayers={setPlayers}
            onFinishWorkout={handleFinishWorkout}
            awsConfig={awsConfig}
          />
        )}

        {activeTab === 'players' && (
          <PlayerSelectionModal
            players={players}
            setPlayers={setPlayers}
            onStartWorkout={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'opensource' && (
          <OpenSourceModuleViewer />
        )}

        {activeTab === 'submission' && (
          <SubmissionHubModal />
        )}
      </main>

      {/* Fire TV Remote Simulator HUD */}
      {showRemoteHud && (
        <FireTVRemoteControlHUD
          onTriggerKey={handleRemoteTriggerKey}
          onOpenVoice={() => setShowVoiceModal(true)}
          onClose={() => setShowRemoteHud(false)}
        />
      )}

      {/* AWS Bedrock AI Workout Recap Modal */}
      {workoutSummary && (
        <BedrockAIRecapModal
          workoutSummary={workoutSummary}
          onClose={() => setWorkoutSummary(null)}
          awsConfig={awsConfig}
          setAwsConfig={setAwsConfig}
        />
      )}

      {/* Alexa Voice Assistant Modal */}
      {showVoiceModal && (
        <AlexaVoiceAssistantModal
          onClose={() => setShowVoiceModal(false)}
          onExecuteVoiceAction={(action) => {
            if (action === 'SHOW_RECAP') {
              setShowVoiceModal(false);
              setWorkoutSummary({
                gameTitle: 'Jungle Dash',
                durationSeconds: 45,
                totalScore: 8450,
                maxCombo: 5,
                players: players.filter((p) => p.isTargetActive)
              });
            }
          }}
        />
      )}
    </div>
  );
}

export default App;
