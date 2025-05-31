import { useState } from 'react';

const useSidebarToggle = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setMobileOpen((prev) => !prev);
  };

  return {
    mobileOpen,
    toggleSidebar,
  };
};

export default useSidebarToggle;
