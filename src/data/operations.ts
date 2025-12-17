export interface Operation {
  id: string;
  category: 'CTF' | 'Hackathon' | 'Research';
  name: string;
  role: string;
  focus: string;
  outcome: string;
  date: string;
}

const defaultOperations: Operation[] = [
  {
    id: '1',
    category: 'CTF',
    name: 'DEFCON CTF Qualifiers 2024',
    role: 'Team Participant',
    focus: 'Binary exploitation, cryptography',
    outcome: 'Top 50 globally, developed custom fuzzing tool',
    date: '2024-05',
  },
  {
    id: '2',
    category: 'Research',
    name: 'API Security Research Sprint',
    role: 'Lead Researcher',
    focus: 'GraphQL injection vulnerabilities',
    outcome: 'Published whitepaper, 3 CVEs discovered',
    date: '2024-03',
  },
  {
    id: '3',
    category: 'Hackathon',
    name: 'SecureCode Hackathon',
    role: 'Team Lead',
    focus: 'Automated SAST tool development',
    outcome: '1st place, prototype deployed in production',
    date: '2024-01',
  },
  {
    id: '4',
    category: 'CTF',
    name: 'Google CTF 2023',
    role: 'Team Participant',
    focus: 'Web exploitation, reverse engineering',
    outcome: 'Top 100, developed Chrome extension for recon',
    date: '2023-11',
  },
  {
    id: '5',
    category: 'Research',
    name: 'ML Model Security Analysis',
    role: 'Collaborative Research',
    focus: 'Adversarial attacks on image classifiers',
    outcome: 'Research paper submitted, proof-of-concept tool',
    date: '2023-09',
  },
  {
    id: '6',
    category: 'Hackathon',
    name: 'CyberDefense Challenge',
    role: 'Infrastructure Lead',
    focus: 'Real-time threat detection system',
    outcome: '2nd place, system adopted by 3 companies',
    date: '2023-07',
  },
  {
    id: '7',
    category: 'CTF',
    name: 'PicoCTF 2023',
    role: 'Team Participant',
    focus: 'Forensics, OSINT, cryptography',
    outcome: 'Top 25, documented complete writeups',
    date: '2023-03',
  },
  {
    id: '8',
    category: 'Research',
    name: 'Container Escape Techniques',
    role: 'Solo Research',
    focus: 'Docker & Kubernetes security',
    outcome: 'Blog series, presented at local security meetup',
    date: '2023-01',
  },
];

const OPERATIONS_STORAGE_KEY = 'hackertroupe_operations';

export const getOperations = (): Operation[] => {
  if (typeof window === 'undefined') return defaultOperations;
  
  const stored = localStorage.getItem(OPERATIONS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse operations from localStorage', e);
    }
  }
  
  localStorage.setItem(OPERATIONS_STORAGE_KEY, JSON.stringify(defaultOperations));
  return defaultOperations;
};

export const saveOperations = (operations: Operation[]): void => {
  localStorage.setItem(OPERATIONS_STORAGE_KEY, JSON.stringify(operations));
};

export const addOperation = (operation: Operation): void => {
  const currentOperations = getOperations();
  currentOperations.push(operation);
  saveOperations(currentOperations);
};

export const updateOperation = (id: string, updatedOperation: Operation): void => {
  const currentOperations = getOperations();
  const index = currentOperations.findIndex(o => o.id === id);
  if (index !== -1) {
    currentOperations[index] = updatedOperation;
    saveOperations(currentOperations);
  }
};

export const deleteOperation = (id: string): void => {
  const currentOperations = getOperations();
  const filtered = currentOperations.filter(o => o.id !== id);
  saveOperations(filtered);
};
