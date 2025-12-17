export interface LandingStats {
  ctfsPlayed: string;
  hackathons: string;
  projectsBuilt: string;
  researchLogs: string;
}

const defaultStats: LandingStats = {
  ctfsPlayed: '47',
  hackathons: '12',
  projectsBuilt: '23',
  researchLogs: '156',
};

const STATS_STORAGE_KEY = 'hackertroupe_landing_stats';

export const getLandingStats = (): LandingStats => {
  if (typeof window === 'undefined') return defaultStats;
  
  const stored = localStorage.getItem(STATS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse landing stats from localStorage', e);
    }
  }
  
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(defaultStats));
  return defaultStats;
};

export const saveLandingStats = (stats: LandingStats): void => {
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
};
