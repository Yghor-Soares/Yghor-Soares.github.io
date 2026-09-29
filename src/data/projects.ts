import type { ProjectId, Shot } from './types';

export interface ProjectLinks {
  site?: string;
  repo?: string;
}

export interface Project {
  id: ProjectId;
  name: string;
  links: ProjectLinks;
  stack: string[];
  shots: Shot[];
}

export interface Annotation {
  /** Posição do marcador em porcentagem da largura e da altura da imagem. */
  x: number;
  y: number;
}

export const projects: Record<ProjectId, Project> = {
  concord: {
    id: 'concord',
    name: 'SEMASPE',
    links: {},
    stack: [],
    shots: [],
  },
  sinlabs: {
    id: 'sinlabs',
    name: 'Automações Educacionais',
    links: {},
    stack: [],
    shots: [],
  },
  deepwokendle: {
    id: 'deepwokendle',
    name: 'Projetos no GitHub',
    links: { repo: 'https://github.com/Yghor-Soares' },
    stack: [],
    shots: [],
  },
};

/** Marcadores sobre a captura de perfis do Sinlabs, na mesma ordem das legendas. */
export const sinlabsAnnotations: Annotation[] = [
  { x: 2.3, y: 27 },
  { x: 30, y: 22.5 },
  { x: 77.6, y: 22.5 },
  { x: 8.3, y: 33.5 },
  { x: 95.2, y: 38.5 },
  { x: 89.5, y: 83.5 },
];

