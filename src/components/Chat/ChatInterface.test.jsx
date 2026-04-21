import { render, screen } from '@testing-library/react';
import ChatInterface from './ChatInterface';
import { ElectionProvider } from '../../context/ElectionContext';

// Mock the CSS
vi.mock('./ChatInterface.css', () => ({}));

describe('ChatInterface Component', () => {
  it('renders the chat interface with default welcome message', () => {
    render(
      <ElectionProvider>
        <ChatInterface />
      </ElectionProvider>
    );
    
    expect(screen.getByText(/Smart Election Assistant/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Type your message/i)).toBeInTheDocument();
  });
});
