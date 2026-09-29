import type { ContextId } from './types';

export type SkillAreaId = 'backend' | 'frontend' | 'data' | 'realtime' | 'architecture' | 'ai';
export type TechKind = 'language' | 'platform' | 'framework' | 'library' | 'database' | 'tool' | 'standard';

export interface Skill {
  id: string;
  /** Nome exibido quando não há tradução em `skills.names` nos arquivos de idioma. */
  name: string;
  core?: boolean;
  /** Onde a tecnologia aparece. Lista vazia indica experiência geral, sem projeto listado no portfólio. */
  usedIn: ContextId[];
  kind?: TechKind;
  /** Ano de lançamento, usado apenas na demonstração de adivinhação. */
  released?: number;
}

export interface SkillArea {
  id: SkillAreaId;
  skills: Skill[];
}

export const contexts: ContextId[] = [];

export const skillAreas: SkillArea[] = [
  {
    id: 'frontend',
    skills: [
      { id: 'excel', name: 'Excel Avançado', core: true, usedIn: [] },
      { id: 'javascript', name: 'JavaScript', core: true, usedIn: [], kind: 'language', released: 1995 },
      { id: 'react', name: 'React', core: true, usedIn: [], kind: 'library', released: 2013 },
      { id: 'angular', name: 'Angular', core: true, usedIn: [], kind: 'framework', released: 2016 },
      { id: 'nodejs', name: 'Node.js', core: true, usedIn: [], kind: 'platform', released: 2009 },
      { id: 'uiux', name: 'UI/UX Design', core: true, usedIn: [] },
      { id: 'figma', name: 'Figma', core: true, usedIn: [], kind: 'tool' },
      { id: 'infrastructure', name: 'Infraestrutura de TI', usedIn: [] },
      { id: 'responsive', name: 'Desenvolvimento Responsivo', usedIn: [] },
    ],
  },
];

export interface GuessableSkill extends Skill {
  kind: TechKind;
  released: number;
  area: SkillAreaId;
}

/** Tecnologias com dados suficientes para a demonstração de adivinhação. */
export const guessableSkills: GuessableSkill[] = skillAreas.flatMap((area) =>
  area.skills.flatMap((skill) =>
    skill.kind && skill.released ? [{ ...skill, kind: skill.kind, released: skill.released, area: area.id }] : [],
  ),
);

/** Relaciona o nome exibido nas stacks dos projetos ao id da tecnologia. */
export const skillIdByName: Record<string, string> = Object.fromEntries(
  skillAreas.flatMap((area) => area.skills.map((skill) => [skill.name, skill.id])),
);
