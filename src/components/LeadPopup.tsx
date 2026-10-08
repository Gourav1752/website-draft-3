import React, { useEffect, useState } from 'react';
import { LeadModal } from './LeadModal';

export const LeadPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen or closed popup in this session
    const hasSeen = sessionStorage.getItem('phoenix_lead_popup_seen');
    if (!hasSeen) {
      // Gentle delay of 6 seconds before appearing
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('phoenix_lead_popup_seen', 'true');
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <LeadModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Let's Help You Find the Right Financial Solution"
      subtitle="Share your details and our financial expert will contact you."
    />
  );
};
