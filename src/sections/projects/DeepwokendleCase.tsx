import { useReveal } from '../../hooks/useReveal';
import styles from './DeepwokendleCase.module.css';
import { ProjectFacts, ProjectHeader } from './ProjectParts';

export function DeepwokendleCase() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <article id="project-deepwokendle" className={styles.deepwokendle} aria-labelledby="project-deepwokendle-title">
      <div ref={reveal} className="container reveal">
        <ProjectHeader id="deepwokendle" number="03" />

        <ProjectFacts id="deepwokendle" />
      </div>
    </article>
  );
}
