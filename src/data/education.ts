export type EducationId = 'etec';
export type EducationKind = 'technical';

export interface Education {
  id: EducationId;
  institution: string;
  kind: EducationKind;
  group: 'academic' | 'complementary';
  start: number;
  end?: number;
  expected?: boolean;
}

export const education: Education[] = [
  { id: 'etec', institution: 'ETEC - Escola Técnica Estadual de São Paulo', kind: 'technical', group: 'academic', start: 2023, end: 2025 },
];

export type LanguageId = 'pt' | 'en' | 'es';

export const languages: LanguageId[] = [];
