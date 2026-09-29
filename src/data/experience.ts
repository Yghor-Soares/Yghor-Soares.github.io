export type ExperienceId = 'microlins';
export type RoleId = 'teacher';

export interface Role {
  id: RoleId;
  startYear: number;
  endYear: number;
}

export interface Experience {
  id: ExperienceId;
  company: string;
  lane: 'main' | 'parallel';
  /** Cargos do mais recente para o mais antigo. */
  roles: Role[];
  stack: string[];
}

export const experience: Experience[] = [
  {
    id: 'microlins',
    company: 'Microlins Praia Grande',
    lane: 'main',
    roles: [{ id: 'teacher', startYear: 2024, endYear: 2026 }],
    stack: ['Excel Avançado', 'JavaScript', 'React', 'Angular', 'Node.js'],
  },
];

