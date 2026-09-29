import { SectionHeader } from '../components/SectionHeader';
import { useReveal } from '../hooks/useReveal';
import { useI18n } from '../i18n/useI18n';
import styles from './About.module.css';

export function About() {
  const { t } = useI18n();
  const revealPhoto = useReveal<HTMLElement>();
  const revealText = useReveal<HTMLDivElement>();

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <figure ref={revealPhoto} className={`reveal ${styles.photo}`}>
          <div className={styles.frame}>
            <img
              src={`${import.meta.env.BASE_URL}ft.png`}
              width={800}
              height={800}
              alt={t.about.photoAlt}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>{t.about.photoCaption}</figcaption>
        </figure>

        <div className={styles.text}>
          <SectionHeader id="about-title" kicker={t.about.kicker} title={t.about.title} />
          <div ref={revealText} className={`reveal ${styles.body}`}>
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={styles.desk}>
            <dl className={styles.facts}>
              {t.about.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
