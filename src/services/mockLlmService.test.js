import { describe, it, expect } from 'vitest';
import { processUserMessage } from './mockLlmService.js';

describe('mockLlmService', () => {
  it('should prompt for country initially', async () => {
    const currentState = {
      country: null,
      awaitingInput: null,
      language: 'English'
    };
    
    // Mock updateState function
    const updateState = () => {};

    const response = await processUserMessage('hello', currentState, updateState);
    
    expect(response.text).toContain('Which country are you voting in');
    expect(response.options.length).toBeGreaterThan(0);
  });

  it('should reset state on "start over" command', async () => {
    const currentState = {
      country: 'India',
      awaitingInput: 'NAME',
      language: 'English'
    };
    
    let stateUpdates = {};
    const updateState = (updates) => { stateUpdates = { ...stateUpdates, ...updates }; };

    const response = await processUserMessage('start over', currentState, updateState);
    
    expect(response.clearHistory).toBe(true);
    expect(stateUpdates.country).toBeNull();
  });
});
