
import { Admin, ProjectType, Project } from './types';

export const COLORS = {
  black: '#000000',
  red: '#FF0000',
  zinc: '#18181b',
};

export const ADMINS: Admin[] = [
  {
    id: 'admin_1',
    username: 'Silverhold',
    name: 'SilverHold Official',
    role: 'Admin',
    quote: "Jangan lupa sholat walaupun kamu seorang pendosa, Allah lebih suka orang pendosa yang sering bertaubat daripada orang yang merasa suci",
    hashtags: ['#bismillahcalonustad'],
    photoUrl: 'https://picsum.photos/seed/silver/200/200',
  },
  {
    id: 'admin_2',
    username: 'BraynOfficial',
    name: 'Brayn Official',
    role: 'Owner',
    quote: "Tidak Semua Orang Suka Kita Berkembang Pesat!",
    hashtags: ['#backenddev', '#frontenddev', '#BraynOfficial'],
    photoUrl: 'https://picsum.photos/seed/brayn/200/200',
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Cyberpunk Portfolio Template',
    language: 'React / Tailwind',
    type: ProjectType.CODE,
    content: `// Cyberpunk Portfolio
import React from 'react';
const Portfolio = () => {
  return <div className="bg-black text-red-600">Active Node</div>;
};
export default Portfolio;`,
    notes: 'A modern, futuristic portfolio layout built with React.',
    previewUrl: 'https://picsum.photos/seed/project1/800/400',
    likes: 124,
    downloads: 56,
    authorId: 'admin_1',
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Neural Network Asset Pack',
    language: 'Unity / C#',
    type: ProjectType.FILE,
    content: 'https://example.com/download/neural-assets.zip',
    notes: '3D assets for building neural network visualizations.',
    previewUrl: 'https://picsum.photos/seed/project2/800/400',
    likes: 89,
    downloads: 312,
    authorId: 'admin_2',
    createdAt: '2024-03-02T12:00:00Z'
  }
];
