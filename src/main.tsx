import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ConnectionGuard } from './components/ConnectionGuard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { initAudioEngine, unlockAudioEngine } from './utils/audioEngine';

initAudioEngine();

// Register global gesture once to unlock Web Speech TTS Engine
if (typeof window !== 'undefined') {
  const handleGlobalGesture = () => {
    unlockAudioEngine();
    window.removeEventListener('click', handleGlobalGesture);
    window.removeEventListener('touchstart', handleGlobalGesture);
  };
  window.addEventListener('click', handleGlobalGesture, { capture: true, passive: true });
  window.addEventListener('touchstart', handleGlobalGesture, { capture: true, passive: true });
}

// Register Service Worker for PWA functionality (Only in production; in dev, clean stale registrations)
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  if (import.meta.env.DEV) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const reg of registrations) {
        reg.unregister();
      }
    });
    if ('caches' in window) {
      caches.keys().then((keys) => {
        for (const k of keys) caches.delete(k);
      });
    }
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        console.log('PWA ServiceWorker registered with scope:', registration.scope);
      }).catch((error) => {
        console.log('PWA ServiceWorker registration failed:', error);
      });
    });
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ConnectionGuard>
        <App />
      </ConnectionGuard>
    </ErrorBoundary>
  </StrictMode>,
);

