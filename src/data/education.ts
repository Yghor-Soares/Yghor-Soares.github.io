export type EducationId = 'etec' | 'fundamentos-ti' | 'admin-bd' | 'github-actions' | 'github-codespaces';
export type EducationKind = 'technical' | 'course';

export interface Education {
  id: EducationId;
  institution?: string;
  kind: EducationKind;
  group: 'academic' | 'complementary';
  start?: number;
  end?: number;
  expected?: boolean;
  certificatePdf?: string;
  platform?: string;
}

export const education: Education[] = [
  {
    id: 'etec',
    institution: 'ETEC - Escola Técnica Estadual de São Paulo',
    kind: 'technical',
    group: 'academic',
    start: 2023,
    end: 2025,
    certificatePdf: 'certificados/etec-analise-desenvolvimento-sistemas.pdf',
  },
  {
    id: 'fundamentos-ti',
    kind: 'course',
    group: 'complementary',
    certificatePdf: 'certificados/fundamentos-ti-hardware-software.pdf',
    platform: 'Fundação Bradesco',
  },
  {
    id: 'admin-bd',
    kind: 'course',
    group: 'complementary',
    certificatePdf: 'certificados/Certificado de Conclusão - Administração Banco de Dados.pdf',
    platform: 'Fundação Bradesco',
  },
  {
    id: 'github-actions',
    kind: 'course',
    group: 'complementary',
    certificatePdf: 'certificados/github_actions_turma_out2026_certificado.pdf',
    platform: 'Escola Nacional de Administração Pública (Enap)',
  },
  {
    id: 'github-codespaces',
    kind: 'course',
    group: 'complementary',
    certificatePdf: 'certificados/github_codespaces_turma_out2026_certificado.pdf',
    platform: 'Escola Nacional de Administração Pública (Enap)',
  },
];

export type LanguageId = 'pt' | 'en' | 'es';

export const languages: LanguageId[] = [];
