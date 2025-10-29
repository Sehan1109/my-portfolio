export interface Project {
  id: number
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface EducationItem {
  university: string;
  degree: string;
  dateRange: string;
}