"use client";

import { useId, useState } from "react";
import { examples } from "./examples";
import styles from "./abstractFineTuning.module.css";

export default function AbstractFineTuning() {
  const selectId = useId();
  const [selectedId, setSelectedId] = useState<string>(examples[0].id);
  const example = examples.find((item) => item.id === selectedId) ?? examples[0];

  return (
    <div className={styles.showcase}>
      <div className={styles.toolbar}>
        <div className={styles.field}>
          <label htmlFor={selectId} className={styles.selectLabel}>Choose an example</label>
          <div className={styles.selectWrap}>
            <select
              id={selectId}
              className={styles.select}
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
            >
              {examples.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.comparison}>
        <section className={styles.source} aria-label="Sample abstract">
          <h4 className={styles.label}>Abstract</h4>
          <p className={styles.body}>{example.abstract}</p>
        </section>
        <section className={styles.output} aria-label="Plain explanation" aria-live="polite" aria-atomic="true">
          <h4 className={styles.label}>Plain explanation</h4>
          <p className={styles.body}>{example.plain}</p>
        </section>
        <section className={styles.output} aria-label="Target-style explanation" aria-live="polite" aria-atomic="true">
          <h4 className={styles.label}>Target style</h4>
          <div className={styles.structured}>
            {example.structured.map((section) => (
              <div key={section.heading}>
                <h5 className={styles.sectionTitle}>{section.heading}</h5>
                <p className={styles.body}>{section.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <p className={styles.caption}>Illustrative abstracts and explanations showing the target style, not live model outputs.</p>

    </div>
  );
}
