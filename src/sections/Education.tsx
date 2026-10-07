import { CuriousTerm } from '../buddy/CuriousTerm';
import { SectionHeader } from '../components/SectionHeader';
import { education, languages, type Education as EducationItem } from '../data/education';
import { useReveal } from '../hooks/useReveal';
import { useI18n } from '../i18n/useI18n';
import styles from './Education.module.css';

function Years({ item }: { item: EducationItem }) {
  const { t } = useI18n();
  if (!item.start) return null;
  if (!item.end) return <time dateTime={String(item.start)}>{item.start}</time>;
  return (
    <>
      <time dateTime={String(item.start)}>{item.start}</time>
      <span aria-hidden="true"> → </span>
      <span className="visually-hidden"> {t.common.until} </span>
      <time dateTime={String(item.end)}>{item.end}</time>
      {item.expected && <span> ({t.education.expected})</span>}
    </>
  );
}

function platformTermId(platform: string) {
  if (platform === 'GitHub') return 'github';
  if (platform === 'Fundação Bradesco') return 'fundacao-bradesco';
  if (platform.startsWith('Escola Nacional de Administração Pública')) return 'enap';
  return platform;
}

function Card({
  item,
  featured = false,
  showPlatform = true,
}: {
  item: EducationItem;
  featured?: boolean;
  showPlatform?: boolean;
}) {
  const { t } = useI18n();
  const copy = t.education.items[item.id];

  return (
    <li className={styles.card} data-featured={featured}>
      <p className={styles.kind}>{t.education.kinds[item.kind]}</p>
      <h4 className={styles.title}>
        <CuriousTerm id={item.id}>{copy.title}</CuriousTerm>
      </h4>
      {item.institution && (
        <p className={styles.institution}>
          <CuriousTerm id={item.id}>{item.institution}</CuriousTerm>
        </p>
      )}
      {showPlatform && item.platform && (
        <p className={styles.institution}>
          {t.education.platformLabel}:{' '}
          <CuriousTerm id={platformTermId(item.platform)}>{item.platform}</CuriousTerm>
        </p>
      )}
      {item.start && (
        <p className={styles.years}>
          <Years item={item} />
        </p>
      )}
      {copy.note && <p className={styles.note}>{copy.note}</p>}
      {item.certificatePdf && (
        <a className={styles.certificate} href={`${import.meta.env.BASE_URL}${item.certificatePdf}`} target="_blank" rel="noopener">
          {t.education.certificateLink}
          <span className="visually-hidden"> {t.common.newTab}</span>
        </a>
      )}
    </li>
  );
}

export function Education() {
  const { t } = useI18n();
  const reveal = useReveal<HTMLDivElement>();
  const academic = education.filter((item) => item.group === 'academic');
  const complementary = education.filter((item) => item.group === 'complementary');
  const complementaryByPlatform = new Map<string, EducationItem[]>();
  complementary.forEach((item) => {
    const platform = item.platform ?? t.education.otherPlatform;
    const courses = complementaryByPlatform.get(platform) ?? [];
    courses.push(item);
    complementaryByPlatform.set(platform, courses);
  });

  return (
    <section id="education" className={styles.education} aria-labelledby="education-title">
      <div className="container">
        <SectionHeader id="education-title" kicker={t.education.kicker} title={t.education.title} />

        <div ref={reveal} className={`reveal ${styles.layout}`}>
          <section aria-labelledby="education-academic">
            <h3 id="education-academic" className={styles.group}>
              {t.education.groups.academic}
            </h3>
            <ul role="list" className={styles.cards}>
              {academic.map((item, index) => (
                <Card key={item.id} item={item} featured={index === 0} />
              ))}
            </ul>
          </section>

          {(complementary.length > 0 || languages.length > 0) && (
            <div className={styles.side}>
              {complementary.length > 0 && (
                <section aria-labelledby="education-complementary">
                  <h3 id="education-complementary" className={styles.group}>
                    {t.education.groups.complementary}
                  </h3>
                  <ul role="list" className={styles.platformFolders}>
                    {[...complementaryByPlatform].map(([platform, courses]) => (
                      <li key={platform} className={styles.platformFolder}>
                        <details className={styles.folderDetails}>
                          <summary className={styles.folderCover}>
                            <svg className={styles.folderIcon} viewBox="0 0 64 48" aria-hidden="true">
                              <path
                                className={styles.folderBack}
                                d="M4 11a5 5 0 0 1 5-5h18l7 6h21a5 5 0 0 1 5 5v23a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V11Z"
                              />
                              <path
                                className={styles.folderPaper}
                                d="M10 17h44a3 3 0 0 1 3 3v17H10a3 3 0 0 1-3-3V20a3 3 0 0 1 3-3Z"
                              />
                              <path
                                className={styles.folderFront}
                                d="M4 19a5 5 0 0 1 5-5h46a5 5 0 0 1 5 5v20a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V19Z"
                              />
                            </svg>
                            <span className={styles.folderName}>{platform}</span>
                            <span className={styles.folderCount} aria-hidden="true">
                              {courses.length}
                            </span>
                            <span className={styles.folderChevron} aria-hidden="true" />
                          </summary>
                          <ul role="list" className={`${styles.cards} ${styles.folderCourses}`}>
                            {courses.map((item) => (
                              <Card key={item.id} item={item} showPlatform={false} />
                            ))}
                          </ul>
                        </details>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {languages.length > 0 && (
                <section aria-labelledby="education-languages">
                  <h3 id="education-languages" className={styles.group}>
                    {t.education.languagesTitle}
                  </h3>
                  <dl className={styles.languages}>
                    {languages.map((id) => (
                      <div key={id}>
                        <dt>{t.education.languages[id].name}</dt>
                        <dd>{t.education.languages[id].level}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
