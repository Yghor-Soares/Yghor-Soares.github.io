import { useReveal } from '../../hooks/useReveal';
import styles from './ConcordCase.module.css';
import { ProjectFacts, ProjectHeader } from './ProjectParts';

export function ConcordCase() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <article id="project-concord" className={styles.concord} data-tone="stage" aria-labelledby="project-concord-title">
      <div ref={reveal} className="container reveal">
        <ProjectHeader id="concord" number="01" />

        <ProjectFacts id="concord" />
      </div>
    </article>
  );
}
