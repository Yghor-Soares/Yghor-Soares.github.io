import { SectionHeader } from '../components/SectionHeader';
import { experience, type Experience as ExperienceEntry } from '../data/experience';
import { useReveal } from '../hooks/useReveal';
import { useI18n } from '../i18n/useI18n';
import styles from './Experience.module.css';

function Entry({ entry }: { entry: ExperienceEntry }) {
  const { t } = useI18n();
  const copy = t.experience.entries[entry.id];
  const reveal = useReveal<HTMLElement>();

  return (
    <article ref={reveal} className={`reveal ${styles.entry}`} data-lane={entry.lane} aria-labelledby={`experience-${entry.id}`}>
      <p className={styles.lane}>{t.experience.lanes[entry.lane]}</p>
      <h3 id={`experience-${entry.id}`} className={styles.company}>
        {entry.company}
      </h3>
      <ol role="list" className={styles.roles}>
        {entry.roles.map((role) => (
          <li key={role.id}>
            <span className={styles.role}>{t.experience.roles[role.id]}</span>
            <span className={styles.period}>
              <time dateTime={String(role.startYear)}>{role.startYear}</time>
              <span aria-hidden="true"> → </span>
              <span className="visually-hidden"> {t.common.until} </span>
              <time dateTime={String(role.endYear)}>{role.endYear}</time>
            </span>
          </li>
        ))}
      </ol>
      <p className={styles.summary}>{copy.summary}</p>
      {copy.highlights.length > 0 && (
        <ul className={styles.highlights} aria-label={t.experience.highlightsLabel}>
          {copy.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      {entry.stack.length > 0 && (
        <ul role="list" className={styles.stack} aria-label={t.experience.stackLabel}>
          {entry.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function Experience() {
  const { t } = useI18n();

  return (
    <section id="experience" className={styles.experience} aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader id="experience-title" kicker={t.experience.kicker} title={t.experience.title} />

        <div className={styles.timeline}>
          {experience.map((entry) => (
            <Entry key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
