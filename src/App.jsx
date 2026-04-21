import React from 'react';
import { ElectionProvider } from './context/ElectionContext';
import ChatInterface from './components/Chat/ChatInterface';
import Timeline from './components/Dashboard/Timeline';

function App() {
  return (
    <ElectionProvider>
      <div className="app-container">
        <Timeline />
        <ChatInterface />
      </div>
    </ElectionProvider>
  );
}

export default App;
