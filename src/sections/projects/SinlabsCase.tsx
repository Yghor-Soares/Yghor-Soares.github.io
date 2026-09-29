import { useReveal } from '../../hooks/useReveal';
import { ProjectFacts, ProjectHeader } from './ProjectParts';
import styles from './SinlabsCase.module.css';

export function SinlabsCase() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <article id="project-sinlabs" className={styles.sinlabs} aria-labelledby="project-sinlabs-title">
      <div ref={reveal} className="container reveal">
        <ProjectHeader id="sinlabs" number="02" />

        <ProjectFacts id="sinlabs" />
      </div>
    </article>
  );
}
