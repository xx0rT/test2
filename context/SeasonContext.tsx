import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Season = 'winter' | 'summer';

interface SeasonContextType {
  season: Season;
  toggleSeason: () => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export const SeasonProvider = ({ children }: { children: ReactNode }) => {
  const [season, setSeason] = useState<Season>('winter');

  useEffect(() => {
    const savedSeason = localStorage.getItem('vilaSeason') as Season;
    if (savedSeason && (savedSeason === 'winter' || savedSeason === 'summer')) {
      setSeason(savedSeason);
    }
  }, []);

  const toggleSeason = () => {
    const newSeason = season === 'winter' ? 'summer' : 'winter';
    setSeason(newSeason);
    localStorage.setItem('vilaSeason', newSeason);
  };

  return (
    <SeasonContext.Provider value={{ season, toggleSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (context === undefined) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
};
