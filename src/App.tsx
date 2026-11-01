/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { GameSelectScreen } from './components/GameSelectScreen';
import { Play1Mode } from './components/Play1Mode';
import { Play2Mode } from './components/Play2Mode';
import { Play3Mode } from './components/Play3Mode';
import { Play3_1Mode } from './components/Play3_1Mode';
import { Play3_2Mode } from './components/Play3_2Mode';
import { Play4_1Mode } from './components/Play4_1Mode';
import { Play4T1Mode } from './components/Play4T1Mode';
import { Play4T2Mode } from './components/Play4T2Mode';
import { Play5Mode } from './components/Play5Mode';
import { Play7AirCombatMode } from './components/Play7AirCombatMode';
import { Play8AirChallengeMode } from './components/Play8AirChallengeMode';
import { DixieDictionary } from './components/DixieDictionary';
import { Game2Module1View } from './components/Game2Module1View';
import { Game2Module2View } from './components/Game2Module2View';
import { Game2Module3View } from './components/Game2Module3View';
import { Game2Module4View } from './components/Game2Module4View';
import { Game2Module5View } from './components/Game2Module5View';
import { Game2Module6View } from './components/Game2Module6View';
import { Game2Module7View } from './components/Game2Module7View';
import { Game2Module8View } from './components/Game2Module8View';
import { Game2Module9View } from './components/Game2Module9View';
import { Game2Module10View } from './components/Game2Module10View';
import { unlock, audioEngine } from './utils/audioEngine';

export default function App() {
  const [view, setView] = useState<'HOME' | 'GAME_SELECT' | 'PLAY1' | 'PLAY2' | 'PLAY3' | 'PLAY3_1' | 'PLAY3_2' | 'PLAY4' | 'PLAY4_1' | 'PLAY5' | 'PLAY6' | 'PLAY7' | 'PLAY8' | 'GAME2_DIXIE' | 'GAME2_MODULE1' | 'GAME2_MODULE2' | 'GAME2_MODULE3' | 'GAME2_MODULE4' | 'GAME2_MODULE5' | 'GAME2_MODULE6' | 'GAME2_MODULE7' | 'GAME2_MODULE8' | 'GAME2_MODULE9' | 'GAME2_MODULE10'>('HOME');
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [play1Group, setPlay1Group] = useState<1 | 2>(1);
  const [play3Group, setPlay3Group] = useState<1 | 2>(1);
  const [play3_1Group, setPlay3_1Group] = useState<1 | 2>(1);
  const [play3_2Group, setPlay3_2Group] = useState<1 | 2>(1);
  const [homeGameTab, setHomeGameTab] = useState<'GAME1' | 'GAME2'>('GAME1');

  // Cada vez que cambies de pantalla (Home -> Game1 -> Game2), vacía la cola de audios
  useEffect(() => {
    audioEngine.flushAndStop();
  }, [view, currentLevel]);

  // Unlock the speech synthesis engine on the very first tap/click of the session
  useEffect(() => {
    const handleGlobalGesture = () => {
      unlock();
      window.removeEventListener('click', handleGlobalGesture);
      window.removeEventListener('touchstart', handleGlobalGesture);
    };
    window.addEventListener('click', handleGlobalGesture);
    window.addEventListener('touchstart', handleGlobalGesture, { passive: true });
    return () => {
      window.removeEventListener('click', handleGlobalGesture);
      window.removeEventListener('touchstart', handleGlobalGesture);
    };
  }, []);

  return (
    <>
      {view === 'HOME' && (
        <HomeScreen
          initialGameTab={homeGameTab}
          onGameTabChange={setHomeGameTab}
          onSelectGame2Play={(play) => {
            setHomeGameTab('GAME2');
            if (play === 'DIXIE') {
              setView('GAME2_DIXIE');
            } else if (play === 'MODULE1') {
              setView('GAME2_MODULE1');
            } else if (play === 'MODULE2') {
              setView('GAME2_MODULE2');
            } else if (play === 'MODULE3') {
              setView('GAME2_MODULE3');
            } else if (play === 'MODULE4') {
              setView('GAME2_MODULE4');
            } else if (play === 'MODULE5') {
              setView('GAME2_MODULE5');
            } else if (play === 'MODULE6') {
              setView('GAME2_MODULE6');
            } else if (play === 'MODULE7') {
              setView('GAME2_MODULE7');
            } else if (play === 'MODULE8') {
              setView('GAME2_MODULE8');
            } else if (play === 'MODULE9') {
              setView('GAME2_MODULE9');
            } else if (play === 'MODULE10') {
              setView('GAME2_MODULE10');
            }
          }}
          onSelectLevel={lvl => {
            setCurrentLevel(lvl);
            if (lvl === 999 || lvl === 909) {
              setView('PLAY1');
            } else {
              setView('GAME_SELECT');
            }
          }}
        />
      )}
      {view === 'GAME2_MODULE1' && (
        <Game2Module1View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_MODULE2' && (
        <Game2Module2View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_MODULE3' && (
        <Game2Module3View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_MODULE4' && (
        <Game2Module4View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_MODULE5' && (
        <Game2Module5View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_MODULE6' && (
        <Game2Module6View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_MODULE7' && (
        <Game2Module7View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_MODULE8' && (
        <Game2Module8View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_MODULE9' && (
        <Game2Module9View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_MODULE10' && (
        <Game2Module10View
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME2_DIXIE' && (
        <DixieDictionary
          onBack={() => {
            setHomeGameTab('GAME2');
            setView('HOME');
          }}
        />
      )}
      {view === 'GAME_SELECT' && currentLevel && (
        <GameSelectScreen
          levelId={currentLevel}
          onBack={() => setView('HOME')}
          onPlay={(type, group) => {
            if (type === 'PLAY1' && group) setPlay1Group(group);
            if (type === 'PLAY3' && group) setPlay3Group(group);
            if (type === 'PLAY3_1' && group) setPlay3_1Group(group);
            if (type === 'PLAY3_2' && group) setPlay3_2Group(group);
            setView(type);
          }}
        />
      )}
      {view === 'PLAY1' && currentLevel && (
        <Play1Mode
          levelId={currentLevel}
          group={play1Group}
          onBack={() => {
            if (currentLevel === 999 || currentLevel === 909) {
              setView('HOME');
            } else {
              setView('GAME_SELECT');
            }
          }}
        />
      )}
      {view === 'PLAY2' && currentLevel && (
        <Play2Mode
          levelId={currentLevel}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
      {view === 'PLAY3' && currentLevel && (
        <Play3Mode
          levelId={currentLevel}
          group={play3Group}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
      {view === 'PLAY3_1' && currentLevel && (
        <Play3_1Mode
          levelId={currentLevel}
          group={play3_1Group}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
      {view === 'PLAY3_2' && currentLevel && (
        <Play3_2Mode
          levelId={currentLevel}
          group={play3_2Group}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
      {view === 'PLAY4' && currentLevel && (
        <Play5Mode
          levelId={currentLevel}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
      {view === 'PLAY4_1' && currentLevel && (
        <Play4_1Mode
          levelId={currentLevel}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
      {view === 'PLAY5' && currentLevel && (
        <Play4T1Mode
          levelId={currentLevel}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
      {view === 'PLAY6' && currentLevel && (
        <Play4T2Mode
          levelId={currentLevel}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
      {view === 'PLAY7' && currentLevel && (
        <Play7AirCombatMode
          levelId={currentLevel}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
      {view === 'PLAY8' && currentLevel && (
        <Play8AirChallengeMode
          levelId={currentLevel}
          onBack={() => setView('GAME_SELECT')}
        />
      )}
    </>
  );
}

