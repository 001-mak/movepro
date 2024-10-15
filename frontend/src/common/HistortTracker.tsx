import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePreviousPath = () => {
  const location = useLocation();

  useEffect(() => {
    // Store the previous path in localStorage
    localStorage.setItem('previousPath', location.pathname);
  }, [location]);
};

export default usePreviousPath;
