# Performance Standard

Performance is part of the luxury experience.

## External thresholds

At the 75th percentile of field visits, target Google “good” thresholds:

- LCP ≤ 2.5 s.
- INP ≤ 200 ms.
- CLS ≤ 0.1.

Source: [web.dev — Core Web Vitals thresholds](https://web.dev/articles/defining-core-web-vitals-thresholds).

## Internal launch budgets

- Route-specific first-party client JavaScript: target ≤ 150 KB gzip on core marketing routes; justify exceptions.
- Critical hero image: target ≤ 300 KB on common mobile delivery; responsive variants mandatory.
- Initial font transfer: target ≤ 180 KB total; subset and limit weights.
- Third-party scripts: load only with a defined owner, purpose and measured cost.
- Signature GSAP sequence: one primary timeline per major section; avoid many concurrent ScrollTriggers.
- No layout shift from media, fonts or CMS content.

Use Sanity image transformations, responsive `sizes`, modern formats and Next.js Image where appropriate. Next.js documents automatic modern image formats and layout-shift prevention in its [production checklist](https://nextjs.org/docs/app/guides/production-checklist).

