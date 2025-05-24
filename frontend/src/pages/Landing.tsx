import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeProvider';
import { markdown } from '@/utils/markdown';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '@/contexts/FirebaseContext';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Tech from '@/components/landing/Tech';
import CTA from '@/components/landing/CTA';

function Landing() {
  const { signInWithGitHub } = UserAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithGitHub();
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-color-mode', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);
    
  return (
    <div className="absolute z-10 w-full bg-gray-100 dark:bg-neutral-950 py-8 p-4 md:p-6 xl-p-0 flex flex-col gap-y-[3.5rem]">
      <Hero 
        handleLogin={handleLogin}
        markdown={markdown}
      />
      <Features />
      <Tech />
      <CTA
        handleLogin={handleLogin}
      />
    </div>
  )
}

export default Landing;