import PDFDocument from 'pdfkit';
import { createWriteStream, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = path.join(root, 'public', 'cv');
const outputPath = path.join(outputDirectory, 'Yghor_Santos_Curriculo.pdf');
const photoPath = path.join(root, 'public', 'ft.png');

const colors = {
  navy: '#10243b',
  blue: '#245fae',
  pale: '#edf4fb',
  ink: '#20344a',
  muted: '#526b86',
  white: '#ffffff',
  line: '#bfd0e2',
};

const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 38;
const headerHeight = 152;
const mainX = margin;
const mainWidth = 326;
const sideX = 391;
const sideWidth = pageWidth - margin - sideX;
const doc = new PDFDocument({ size: 'A4', margin: 0, info: { Title: 'Currículo - Yghor Santos', Author: 'Yghor Santos' } });

mkdirSync(outputDirectory, { recursive: true });
doc.pipe(createWriteStream(outputPath));

function sectionHeading(title, x, y, width) {
  doc.font('Helvetica-Bold').fontSize(11).fillColor(colors.navy).text(title.toUpperCase(), x, y, { width, characterSpacing: 0.3 });
  doc.moveTo(x, y + 17).lineTo(x + width, y + 17).lineWidth(1).strokeColor(colors.line).stroke();
  return y + 26;
}

function paragraph(text, x, y, width, options = {}) {
  doc.font(options.bold ? 'Helvetica-Bold' : 'Helvetica')
    .fontSize(options.size ?? 9.1)
    .fillColor(options.color ?? colors.ink)
    .text(text, x, y, { width, lineGap: options.lineGap ?? 2.1, align: options.align ?? 'left' });
  return doc.y + (options.after ?? 6);
}

function bullet(text, x, y, width) {
  doc.circle(x + 2, y + 5, 1.8).fill(colors.blue);
  return paragraph(text, x + 10, y, width - 10, { size: 8.8, after: 4 });
}

function project(title, description, x, y, width) {
  y = paragraph(title, x, y, width, { bold: true, size: 9.3, color: colors.navy, after: 2 });
  return paragraph(description, x, y, width, { size: 8.7, after: 8 });
}

doc.rect(0, 0, pageWidth, headerHeight).fill(colors.navy);
doc.rect(sideX - 15, headerHeight + 10, sideWidth + 15, pageHeight - headerHeight - 34).fill(colors.pale);

doc.font('Helvetica-Bold').fontSize(29).fillColor(colors.white).text('Yghor Santos', margin, 32, { width: 390 });
doc.font('Helvetica').fontSize(10.3).fillColor('#d8e9fb').text(
  'DESENVOLVEDOR FRONT-END  |  UI/UX DESIGNER  |  ADS  |  EXCEL AVANÇADO',
  margin,
  73,
  { width: 420, lineGap: 2 },
);
doc.font('Helvetica').fontSize(8.6).fillColor(colors.white);
doc.text('+55 13 99753-8987', margin, 105, { link: 'https://wa.me/5513997538987', continued: true });
doc.text('   |   ', { continued: true });
doc.text('yghorsoaressantos@gmail.com', { link: 'mailto:yghorsoaressantos@gmail.com' });
doc.fillColor('#c5dcf5');
doc.text('github.com/Yghor-Soares', margin, 122, { link: 'https://github.com/Yghor-Soares', continued: true });
doc.text('   |   ', { continued: true });
doc.text('linkedin.com/in/yghorsantos', { link: 'https://www.linkedin.com/in/yghorsantos/' });

const photoSize = 76;
const photoX = pageWidth - margin - photoSize;
const photoY = 35;
doc.save();
doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2).clip();
doc.image(photoPath, photoX, photoY, { fit: [photoSize, photoSize], align: 'center', valign: 'center' });
doc.restore();
doc.circle(photoX + photoSize / 2, photoY + photoSize / 2, photoSize / 2).lineWidth(2).strokeColor('#a9cefa').stroke();

let mainY = headerHeight + 25;
mainY = sectionHeading('Resumo profissional', mainX, mainY, mainWidth);
mainY = paragraph(
  'Profissional de tecnologia formado em Análise e Desenvolvimento de Sistemas, com experiência em desenvolvimento Front-end, UI/UX, automação de processos e criação de dashboards. Atua em projetos para educação e saúde pública.',
  mainX,
  mainY,
  mainWidth,
  { size: 9.1, after: 15 },
);

mainY = sectionHeading('Experiência', mainX, mainY, mainWidth);
doc.font('Helvetica-Bold').fontSize(10).fillColor(colors.navy).text('Instrutor Pedagógico', mainX, mainY, { width: 220 });
doc.font('Helvetica-Bold').fontSize(8.5).fillColor(colors.blue).text('2024 - 2026', mainX + 230, mainY + 1, { width: mainWidth - 230, align: 'right' });
mainY += 15;
mainY = paragraph('Microlins Praia Grande', mainX, mainY, mainWidth, { bold: true, size: 9, color: colors.muted, after: 5 });
mainY = bullet('Automação de rotinas pedagógicas e implementação de soluções para otimização de processos.', mainX, mainY, mainWidth);
mainY = bullet('Criação de dashboards para acompanhamento do desempenho acadêmico.', mainX, mainY, mainWidth);
mainY += 8;

mainY = sectionHeading('Projetos em destaque', mainX, mainY, mainWidth);
mainY = project(
  'SEMASPE | Saúde pública',
  'Plataforma de apoio à saúde pública com histórico de pacientes, comunicação entre unidades e digitalização de processos.',
  mainX,
  mainY,
  mainWidth,
);
mainY = project(
  'Automações educacionais',
  'Automações pedagógicas, dashboards acadêmicos e sistemas de recomendação para acompanhamento de alunos.',
  mainX,
  mainY,
  mainWidth,
);
mainY = project(
  'Projetos no GitHub',
  'Outros repositórios e projetos de desenvolvimento: github.com/Yghor-Soares.',
  mainX,
  mainY,
  mainWidth,
);

let sideY = headerHeight + 25;
sideY = sectionHeading('Formação', sideX, sideY, sideWidth);
sideY = paragraph('Análise e Desenvolvimento de Sistemas', sideX, sideY, sideWidth, { bold: true, size: 9.1, after: 3 });
sideY = paragraph('ETEC - Escola Técnica Estadual de São Paulo', sideX, sideY, sideWidth, { size: 8.5, color: colors.muted, after: 3 });
sideY = paragraph('2023 - 2025', sideX, sideY, sideWidth, { bold: true, size: 8.5, color: colors.blue, after: 15 });

sideY = sectionHeading('Formação complementar', sideX, sideY, sideWidth);
for (const [title, platform] of [
  ['Fundamentos de TI: Hardware e Software', 'Fundação Bradesco'],
  ['Administração de Banco de Dados', 'Fundação Bradesco'],
  ['GitHub Actions', 'Enap'],
  ['GitHub Codespaces', 'Enap'],
]) {
  sideY = paragraph(title, sideX, sideY, sideWidth, { bold: true, size: 8.2, after: 2 });
  sideY = paragraph(platform, sideX, sideY, sideWidth, { size: 7.8, color: colors.muted, after: 7 });
}

sideY = sectionHeading('Competências', sideX, sideY, sideWidth);
for (const skill of [
  'Excel Avançado',
  'JavaScript',
  'React',
  'Angular',
  'Node.js',
  'UI/UX Design',
  'Figma',
  'Infraestrutura de TI',
  'Desenvolvimento responsivo',
]) {
  sideY = bullet(skill, sideX, sideY, sideWidth);
}

if (mainY > pageHeight - 30 || sideY > pageHeight - 30) {
  throw new Error(`O conteúdo ultrapassou a página A4: coluna principal ${mainY}, lateral ${sideY}.`);
}

doc.end();
console.log(`Currículo gerado: ${path.relative(root, outputPath)}`);