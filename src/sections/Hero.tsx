import { TermText } from '../buddy/TermText';
import { useBuddy } from '../buddy/useBuddy';
import { Icon } from '../components/Icon';
import { profile } from '../data/contacts';
import { useI18n } from '../i18n/useI18n';
import { CompanyLogoScene } from './CompanyLogoScene';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useI18n();
  const { ask } = useBuddy();

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container-wide ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{t.hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {profile.name}
          </h1>
          <p className={styles.lead}>{t.hero.lead}</p>
          <p className={styles.body}>
            <TermText text={t.hero.body} />
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#projects">
              {t.hero.ctaProjects}
              <Icon name="arrowDown" size={14} />
            </a>
            <a className={styles.secondary} href={`${import.meta.env.BASE_URL}cv/Yghor_Santos_Curriculo.pdf`} download>
              <Icon name="download" size={16} />
              {t.cv.download}
            </a>
          </div>
        </div>

        <figure className={styles.stage}>
          <a
            className={styles.companyLogoLink}
            href="https://www.instagram.com/idiomapopular/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Idioma Popular @idiomapopular"
          >
            <CompanyLogoScene className={styles.companyLogoScene} label={t.hero.spriteAlt} />
            <span className="visually-hidden"> {t.common.newTab}</span>
          </a>
          <button
            type="button"
            className={styles.shelf}
            onClick={() => ask('idioma-popular')}
            aria-label={`${t.buddy.titles['idioma-popular']}: ${t.buddy.askSuffix}`}
          >
            <span>{t.buddy.titles['idioma-popular']}</span>
          </button>
        </figure>
      </div>

      <div className="container-wide">
        <dl className={styles.facts} aria-label={t.hero.factsLabel}>
          {t.hero.facts.map((fact) => (
            <div key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
