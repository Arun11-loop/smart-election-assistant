import React, { Component, Suspense, lazy } from 'react';
import { ElectionProvider } from './context/ElectionContext';
import './App.css';

// Code Splitting for max efficiency
const ChatInterface = lazy(() => import('./components/Chat/ChatInterface'));
const Timeline = lazy(() => import('./components/Dashboard/Timeline'));

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
          <Suspense fallback={<div className="loading-spinner">Loading App...</div>}>
            <Timeline />
            <ChatInterface />
          </Suspense>
        </div>
      </ElectionProvider>
    </ErrorBoundary>
  );
}

export default App;
