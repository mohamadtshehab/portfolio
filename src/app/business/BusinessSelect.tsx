'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './business.module.css';

type BusinessSelectProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  values: readonly string[];
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  fullWidth?: boolean;
};

export default function BusinessSelect({ id, name, label, placeholder, values, options, value, onChange, disabled = false, invalid = false, fullWidth = false }: BusinessSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [opensAbove, setOpensAbove] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const selectedIndex = values.indexOf(value);
  const listId = `${id}-options`;

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  useEffect(() => { if (disabled) setOpen(false); }, [disabled]);

  function openList() {
    const rect = triggerRef.current?.getBoundingClientRect();
    const menuHeight = Math.min(options.length * 44 + 12, 264, window.innerHeight * .5);
    setOpensAbove(!!rect && window.innerHeight - rect.bottom < menuHeight && rect.top > menuHeight);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function choose(index: number) {
    onChange(values[index]);
    setActiveIndex(index);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) openList();
      else setActiveIndex(index => (index + (event.key === 'ArrowDown' ? 1 : values.length - 1)) % values.length);
    } else if (event.key === 'Home' && open) {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === 'End' && open) {
      event.preventDefault();
      setActiveIndex(values.length - 1);
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) choose(activeIndex);
      else openList();
    } else if (event.key === 'Tab' && open) {
      setOpen(false);
    }
  }

  return <div className={fullWidth ? styles.fullField : styles.field} ref={wrapperRef}>
    <label id={`${id}-label`} htmlFor={id}>{label}</label>
    <input type="hidden" name={name} value={value} />
    <div className={styles.selectControl}>
      <button id={id} ref={triggerRef} type="button" role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={open ? listId : undefined}
        aria-activedescendant={open ? `${id}-option-${activeIndex}` : undefined} aria-labelledby={`${id}-label ${id}-value`}
        aria-required="true" aria-invalid={invalid} aria-describedby={invalid ? `${id}-error` : undefined} disabled={disabled} className={styles.selectTrigger}
        onClick={() => open ? setOpen(false) : openList()} onKeyDown={handleKeyDown}>
        <span id={`${id}-value`} className={selectedIndex < 0 ? styles.selectPlaceholder : undefined}>{selectedIndex < 0 ? placeholder : options[selectedIndex]}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      {open && <div id={listId} role="listbox" aria-labelledby={`${id}-label`} className={`${styles.selectMenu} ${opensAbove ? styles.selectMenuAbove : ''}`}>
        {values.map((optionValue, index) => <button key={optionValue} id={`${id}-option-${index}`} type="button" role="option"
          aria-selected={optionValue === value} data-active={index === activeIndex} tabIndex={-1} className={styles.selectOption}
          onMouseEnter={() => setActiveIndex(index)} onClick={() => choose(index)}>{options[index]}</button>)}
      </div>}
    </div>
    {invalid && <p id={`${id}-error`} className={styles.selectError} role="alert">{placeholder}</p>}
  </div>;
}
