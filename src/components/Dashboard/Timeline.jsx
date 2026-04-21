import React, { useRef, useState } from 'react';
import { useElection } from '../../context/ElectionContext';
import staticRules from '../../services/staticRules.json';
import html2canvas from 'html2canvas';
import './Timeline.css';

const Timeline = () => {
  const { currentStep, userState } = useElection();
  const certificateRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShare = async () => {
    if (!certificateRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(certificateRef.current, { scale: 2, backgroundColor: '#1e293b' });
      const image = canvas.toDataURL("image/png");
      
      if (navigator.share) {
        const blob = await (await fetch(image)).blob();
        const file = new File([blob], 'voter-certificate.png', { type: 'image/png' });
        await navigator.share({
          title: 'I am ready to vote!',
          text: `I just prepared for the upcoming election using the Smart Election Assistant!`,
          files: [file]
        });
      } else {
        const link = document.createElement('a');
        link.href = image;
        link.download = 'voter-certificate.png';
        link.click();
      }
    } catch (err) {
      console.error("Failed to generate certificate", err);
    }
    setIsGenerating(false);
  };

  return (
    <div className="card dashboard-container">
      <div className="dashboard-header">
        <h2>Your Voting Journey</h2>
        <p className="subtitle">Follow the steps to be ready for election day.</p>
      </div>

      <div className="timeline">
        {staticRules.steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          let statusClass = '';
          if (isCompleted) statusClass = 'completed';
          if (isActive) statusClass = 'active';

          return (
            <div key={step.id} className={`timeline-item ${statusClass}`}>
              <div className="step-indicator">
                <div className="circle">
                  {isCompleted ? '✓' : index + 1}
                </div>
                {index < staticRules.steps.length - 1 && <div className="line" />}
              </div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                
                {/* Dynamic Status Badges based on State */}
                {isCompleted && step.id === 'verification' && userState.isVerified && (
                  <div className="status-badge success animate-fade-in">Verified: {userState.name} ({userState.country})</div>
                )}
                {isActive && step.id === 'eligibility' && userState.isEligible === false && (
                  <div className="status-badge error animate-fade-in">Not Eligible</div>
                )}
                {isCompleted && step.id === 'eligibility' && userState.isEligible && (
                  <div className="status-badge success animate-fade-in">Verified Eligible</div>
                )}
                {isCompleted && step.id === 'registration' && userState.isRegistered && (
                  <div className="status-badge success animate-fade-in">Registered</div>
                )}
                {isCompleted && step.id === 'polling' && userState.pollingStationFound && (
                  <div className="status-badge success animate-fade-in">Location Found ({userState.state})</div>
                )}
                {isCompleted && step.id === 'voting' && userState.voted && (
                  <div className="status-badge success animate-fade-in">Voted! 🎉</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats/Info Section */}
      {!userState.pollingStationFound && (
        <div className="info-cards">
          <div className="info-card">
            <h4>Voter ID Status</h4>
            <span className={userState.isRegistered ? 'success-text' : 'warning-text'}>
              {userState.isRegistered ? 'Ready' : 'Pending Registration'}
            </span>
          </div>
          <div className="info-card">
            <h4>Polling Location</h4>
            <span className={userState.pollingStationFound ? 'success-text' : 'warning-text'}>
              {userState.pollingStationFound ? 'Confirmed' : 'Not Set'}
            </span>
          </div>
        </div>
      )}

      {/* Shareable Certificate Section */}
      {userState.pollingStationFound && (
        <div className="certificate-section animate-fade-in">
          <div className="certificate-card" ref={certificateRef}>
            <div className="cert-header">
              <h3>Voter Readiness Certificate</h3>
              <span className="cert-year">2026</span>
            </div>
            <div className="cert-body">
              <p>This certifies that</p>
              <h2>{userState.name || 'Citizen'}</h2>
              <p>is fully verified and prepared to vote in</p>
              <h3>{userState.country || 'their country'}</h3>
            </div>
            <div className="cert-footer">
              <div className="seal">✓ Verified</div>
              <div className="timestamp">Smart Election Assistant</div>
            </div>
          </div>
          <button 
            className="share-btn" 
            onClick={handleShare} 
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : '📸 Share My Certificate'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Timeline;
