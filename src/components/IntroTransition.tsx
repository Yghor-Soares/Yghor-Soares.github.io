import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import styles from './IntroTransition.module.css';

const INTRO_DURATION_MS = 5000;

function CameraIcon() {
  return (
    <svg className={styles.camera} viewBox="0 0 240 170" role="presentation" aria-hidden="true">
      <path
        className={styles.cameraBody}
        d="M35 48h40l16-22h59l17 22h38a12 12 0 0 1 12 12v78a12 12 0 0 1-12 12H35a12 12 0 0 1-12-12V60a12 12 0 0 1 12-12Z"
      />
      <path className={styles.cameraTop} d="M91 27h59l11 15H80l11-15Z" />
      <circle className={styles.lensOuter} cx="125" cy="96" r="42" />
      <circle className={styles.lensInner} cx="125" cy="96" r="29" />
      <circle className={styles.lensGlint} cx="115" cy="85" r="8" />
      <rect className={styles.cameraFlash} x="178" y="60" width="20" height="13" rx="4" />
      <circle className={styles.cameraLight} cx="49" cy="67" r="5" />
    </svg>
  );
}

function PortfolioPhoto() {
  return (
    <div className={styles.photo} aria-hidden="true">
      <div className={styles.photoHeader}>
        <span className={styles.photoMark}>YS</span>
        <span className={styles.photoNav} />
        <span className={styles.photoNav} />
        <span className={styles.photoNav} />
      </div>
      <div className={styles.photoContent}>
        <div className={styles.photoCopy}>
          <span className={styles.photoEyebrow} />
          <span className={styles.photoTitle} />
          <span className={styles.photoLine} />
          <span className={styles.photoLineShort} />
          <span className={styles.photoButton} />
        </div>
        <div className={styles.photoArtwork}>
          <img className={styles.companyLogo} src={`${import.meta.env.BASE_URL}idiomapopular.png`} alt="" />
        </div>
      </div>
    </div>
  );
}

export function IntroTransition() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timeoutId = window.setTimeout(() => setDismissed(true), INTRO_DURATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion || dismissed) return null;

  return (
    <div className={styles.curtain} aria-hidden="true">
      <div className={styles.flash} />
      <PortfolioPhoto />
      <div className={styles.cameraWrap}>
        <CameraIcon />
      </div>
    </div>
  );
}
