import React, { createContext, useState, useContext } from 'react';

const ElectionContext = createContext();

export const useElection = () => useContext(ElectionContext);

export const ElectionProvider = ({ children }) => {
  // Global state for user journey
  const [userState, setUserState] = useState({
    country: null,
    name: null,
    dob: null,
    isVerified: false,
    eligibilityChecked: false,
    isEligible: null,
    isRegistered: null,
    voterIdVerified: null,
    pollingStationFound: null,
    voted: false,
    language: 'English',
    state: null,
    awaitingInput: null
  });

  // Derived current step index
  // 0: Verification, 1: Eligibility, 2: Registration, 3: Polling, 4: Voting
  const getCurrentStep = () => {
    if (!userState.isVerified) return 0;
    if (!userState.eligibilityChecked) return 1;
    if (userState.isEligible === false) return 1; // Stuck at eligibility
    if (!userState.isRegistered) return 2;
    if (!userState.pollingStationFound) return 3;
    return 4;
  };

  const updateState = (updates) => {
    setUserState((prev) => ({ ...prev, ...updates }));
  };

  return (
    <ElectionContext.Provider value={{ userState, updateState, currentStep: getCurrentStep() }}>
      {children}
    </ElectionContext.Provider>
  );
};
