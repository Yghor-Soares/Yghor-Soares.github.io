export type EducationId =
  | 'etec'
  | 'fundamentos-ti'
  | 'admin-bd'
  | 'github-actions'
  | 'github-codespaces'
  | 'copilot-productivity'
  | 'public-service-ai-productivity'
  | 'text-topic-discovery'
  | 'predictive-solutions-r-python';
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
  {
    id: 'copilot-productivity',
    kind: 'course',
    group: 'complementary',
    certificatePdf: 'certificados/como_ser_mas_productivo_usando_copilot_turma_out2026_certificado.pdf',
    platform: 'Escola Nacional de Administração Pública (Enap)',
  },
  {
    id: 'public-service-ai-productivity',
    kind: 'course',
    group: 'complementary',
    certificatePdf: 'certificados/ia_e_produtividade_pessoal_no_servico_publico_turma_out2026_certificado.pdf',
    platform: 'Escola Nacional de Administração Pública (Enap)',
  },
  {
    id: 'text-topic-discovery',
    kind: 'course',
    group: 'complementary',
    certificatePdf: 'certificados/introducao_a_ciencia_de_dados_descoberta_de_topicos_em_texto_turma_out2026_certificado.pdf',
    platform: 'Escola Nacional de Administração Pública (Enap)',
  },
  {
    id: 'predictive-solutions-r-python',
    kind: 'course',
    group: 'complementary',
    certificatePdf: 'certificados/solucoes_preditivas_baseadas_em_dados_com_o_uso_do_r_e_do_python_turma_out2026_certificado.pdf',
    platform: 'Escola Nacional de Administração Pública (Enap)',
  },
];

export type LanguageId = 'pt' | 'en' | 'es';

export const languages: LanguageId[] = [];
