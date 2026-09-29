import { TermText } from '../../buddy/TermText';
import { Icon } from '../../components/Icon';
import { projects } from '../../data/projects';
import type { ProjectId } from '../../data/types';
import { useI18n } from '../../i18n/useI18n';
import styles from './Project.module.css';

interface PartProps {
  id: ProjectId;
}

export function ProjectHeader({ id, number }: PartProps & { number: string }) {
  const { t } = useI18n();
  const project = projects[id];
  const copy = t.projects[id];

  return (
    <header className={styles.head}>
      <span className={styles.number} aria-hidden="true">
        {number}
      </span>
      <p className={styles.kicker}>{copy.kicker}</p>
      <h3 id={`project-${id}-title`} className={styles.name}>
        {project.name}
      </h3>
      <p className={styles.tagline}>{copy.tagline}</p>
      {(project.links.site || project.links.repo) && (
        <ul role="list" className={styles.links}>
          {project.links.site && (
            <li>
              <a className={styles.linkPrimary} href={project.links.site} target="_blank" rel="noopener">
                {t.projects.labels.visit}
                <span className="visually-hidden">
                  {' '}
                  {project.name} {t.common.newTab}
                </span>
                <Icon name="external" size={14} />
              </a>
            </li>
          )}
          {project.links.repo && (
            <li>
              <a className={styles.linkSecondary} href={project.links.repo} target="_blank" rel="noopener">
                <Icon name="github" size={16} />
                {t.projects.labels.repo}
                <span className="visually-hidden">
                  {' '}
                  {project.name} {t.common.newTab}
                </span>
              </a>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}

export function ProjectFacts({ id, columns = false }: PartProps & { columns?: boolean }) {
  const { t } = useI18n();
  const copy = t.projects[id];
  const labels = t.projects.labels;

  return (
    <div className={styles.facts} data-columns={columns}>
      <section>
        <h4 className={styles.label}>{labels.need}</h4>
        <p>{copy.need}</p>
      </section>
      <section>
        <h4 className={styles.label}>{labels.features}</h4>
        <ul className={styles.features}>
          {copy.features.map((feature) => (
            <li key={feature}>
              <TermText text={feature} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h4 className={styles.label}>{labels.role}</h4>
        <p>{copy.role}</p>
      </section>
    </div>
  );
}
