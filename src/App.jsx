import React, { Component } from 'react';
import { ElectionProvider } from './context/ElectionContext';
import ChatInterface from './components/Chat/ChatInterface';
import Timeline from './components/Dashboard/Timeline';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please refresh the page.</h2>;
    }
    return this.props.children; 
  }
}

function App() {
  return (
    <ErrorBoundary>
      <ElectionProvider>
        <div className="app-container">
          <Timeline />
          <ChatInterface />
        </div>
      </ElectionProvider>
    </ErrorBoundary>
  );
}

export default App;
