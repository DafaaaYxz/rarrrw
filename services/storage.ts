
import { Project, Admin, ChatMessage } from '../types';
import { INITIAL_PROJECTS, ADMINS } from '../constants';

const PROJECTS_KEY = 'source_code_hub_projects';
const ADMINS_KEY = 'source_code_hub_admins';
const CHATS_KEY = 'source_code_hub_chats';

export const getProjects = (): Project[] => {
  const stored = localStorage.getItem(PROJECTS_KEY);
  if (!stored) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(INITIAL_PROJECTS));
    return INITIAL_PROJECTS;
  }
  return JSON.parse(stored);
};

export const saveProject = (project: Project) => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  if (index >= 0) {
    projects[index] = project;
  } else {
    projects.unshift(project);
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
};

export const deleteProject = (id: string) => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));
};

export const getAdmins = (): Admin[] => {
  const stored = localStorage.getItem(ADMINS_KEY);
  if (!stored) {
    localStorage.setItem(ADMINS_KEY, JSON.stringify(ADMINS));
    return ADMINS;
  }
  return JSON.parse(stored);
};

export const updateAdmin = (updated: Admin) => {
  const admins = getAdmins();
  const index = admins.findIndex(a => a.id === updated.id);
  if (index >= 0) {
    admins[index] = updated;
    localStorage.setItem(ADMINS_KEY, JSON.stringify(admins));
  }
};

export const getChatMessages = (): ChatMessage[] => {
  const stored = localStorage.getItem(CHATS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveChatMessage = (msg: ChatMessage) => {
  const msgs = getChatMessages();
  msgs.push(msg);
  localStorage.setItem(CHATS_KEY, JSON.stringify(msgs));
};
