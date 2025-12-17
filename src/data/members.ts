export interface Member {
  id: string;
  alias: string;
  realName?: string;
  domain: string;
  skills: string;
  year: string; // N21, N22, etc.
  isLeader?: boolean; // Leader of the year
  github?: string;
  linkedin?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  email?: string;
  image: string;
}

export const members: Member[] = [
  {
    id: 'N2100001',
    alias: 'cipher_',
    realName: 'Alex Chen',
    domain: 'Web Security',
    skills: 'Server-side exploitation & API security',
    year: 'N21',
    isLeader: true,
    github: 'cipheralex',
    linkedin: 'alex-chen-sec',
    image: 'https://images.unsplash.com/photo-1660644807804-ffacfd7a4137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY1ODg1MTM1fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 'N2100002',
    alias: 'null_byte',
    realName: 'Sarah Kim',
    domain: 'Reverse Engineering',
    skills: 'Binary analysis & malware research',
    year: 'N21',
    github: 'nullbyte',
    linkedin: 'sarah-kim-re',
    image: 'https://images.unsplash.com/photo-1565687981296-535f09db714e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrZXIlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU4ODUxMzV8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 'N2200001',
    alias: 'forge',
    realName: 'Marcus Rodriguez',
    domain: 'Systems Engineering',
    skills: 'Infrastructure hardening & automation',
    isLeader: true,
    year: 'N22',
    github: 'forgedev',
    linkedin: 'marcus-rodriguez',
    image: 'https://images.unsplash.com/photo-1752859951149-7d3fc700a7ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY1ODYwODM3fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 'N2200002',
    alias: 'quantum',
    realName: 'Emily Zhang',
    domain: 'AI Security',
    skills: 'Adversarial ML & model security',
    year: 'N22',
    github: 'quantumsec',
    linkedin: 'emily-zhang-ai',
    image: 'https://images.unsplash.com/photo-1681164315430-6159b2361615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyJTIwaGVhZHNob3R8ZW58MXx8fHwxNzY1ODg1MTM2fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 'N2100003',
    alias: 'trace',
    realName: 'David Park',
    domain: 'Digital Forensics',
    skills: 'Incident response & memory analysis',
    year: 'N21',
    github: 'tracesec',
    linkedin: 'david-park-dfir',
    image: 'https://images.unsplash.com/photo-1635366795162-90b6041fd292?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cml0eSUyMHJlc2VhcmNoZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU4ODUxMzZ8MA&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: 'N2200003',
    alias: 'echo',
    realName: 'Nina Patel',
    domain: 'OSINT',
    skills: 'Intelligence gathering & reconnaissance',
    year: 'N22',
    github: 'echoint',
    linkedin: 'nina-patel-osint',
    image: 'https://images.unsplash.com/photo-1555963153-11ff60182d08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZlbG9wZXIlMjBoZWFkc2hvdCUyMGRhcmt8ZW58MXx8fHwxNzY1ODg1MTM3fDA&ixlib=rb-4.1.0&q=80&w=400',
  },
];

// Local storage key for members
const MEMBERS_STORAGE_KEY = 'hackertroupe_members';

export const getMembers = (): Member[] => {
  if (typeof window === 'undefined') return members;
  
  const stored = localStorage.getItem(MEMBERS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse members from localStorage', e);
    }
  }
  
  // Initialize with default members
  localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(members));
  return members;
};

export const saveMembers = (newMembers: Member[]): void => {
  localStorage.setItem(MEMBERS_STORAGE_KEY, JSON.stringify(newMembers));
};

export const addMember = (member: Member): void => {
  const currentMembers = getMembers();
  currentMembers.push(member);
  saveMembers(currentMembers);
};

export const updateMember = (id: string, updatedMember: Member): void => {
  const currentMembers = getMembers();
  const index = currentMembers.findIndex(m => m.id === id);
  if (index !== -1) {
    currentMembers[index] = updatedMember;
    saveMembers(currentMembers);
  }
};

export const deleteMember = (id: string): void => {
  const currentMembers = getMembers();
  const filtered = currentMembers.filter(m => m.id !== id);
  saveMembers(filtered);
};
