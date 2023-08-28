import { ExperienceLevel, Skill } from '@prisma/client';

type Skills = {
  value: Skill;
  label: string;
}[];

export const skills: Skills = [
  { value: 'JAVASCRIPT', label: 'JavaScript' },
  {
    value: 'PYTHON',
    label: 'Python',
  },
  {
    value: 'JAVA',
    label: 'Java',
  },
  {
    value: 'CPP',
    label: 'C++',
  },
  {
    value: 'RUBY',
    label: 'Ruby',
  },
  {
    value: 'PHP',
    label: 'PHP',
  },
  {
    value: 'HTML',
    label: 'HTML',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'SQL',
    label: 'SQL',
  },
  {
    value: 'REACT',
    label: 'React',
  },
  {
    value: 'ANGULAR',
    label: 'Angular',
  },
  {
    value: 'NODEJS',
    label: 'NodeJS',
  },
  {
    value: 'CSHARP',
    label: 'C#',
  },
  {
    value: 'SWIFT',
    label: 'Swift',
  },
  {
    value: 'GO',
    label: 'Go',
  },
];

type ExperienceLevels = {
  value: ExperienceLevel;
  label: string;
}[];

export const experienceLevels: ExperienceLevels = [
  { value: 'TRAINEE', label: 'Trainee' },
  { value: 'JUNIOR', label: 'Junior' },
  { value: 'MID', label: 'Mid' },
  { value: 'SENIOR', label: 'Senior' },
];
