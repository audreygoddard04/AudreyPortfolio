"use client";
import { Children, useEffect, useId, useRef, useState } from "react";
import styles from "./ThemedSelect.module.css";
export default function ThemedSelect({
  children,
  value,
  defaultValue,
  onChange,
  disabled = false,
  required = false,
  name,
  id: suppliedId,
  className = "",
  ...props
}) {
  const generatedId = useId();
  const id = suppliedId || generatedId;
  const choices = Children.toArray(children).map((child) => ({
    value: String(child.props.value),
    label: child.props.children,
    disabled: child.props.disabled,
  }));
  const initial = defaultValue ?? choices[0]?.value ?? "";
  const [internal, setInternal] = useState(initial);
  const selected = String(value ?? internal);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const container = useRef(null);
  const trigger = useRef(null);
  const native = useRef(null);
  useEffect(() => {
    const close = (event) => {
      if (!container.current?.contains(event.target)) setOpen(false);
    };
    const reset = () => {
      setInternal(initial);
      setOpen(false);
    };
    const form = container.current?.closest("form");
    document.addEventListener("pointerdown", close);
    form?.addEventListener("reset", reset);
    return () => {
      document.removeEventListener("pointerdown", close);
      form?.removeEventListener("reset", reset);
    };
  }, [initial]);
  useEffect(() => {
    if (open)
      document
        .getElementById(`${id}-option-${active}`)
        ?.scrollIntoView({ block: "nearest" });
  }, [open, active, id]);
  function choose(index) {
    if (choices[index]?.disabled) return;
    setInternal(choices[index].value);
    if (native.current) native.current.value = choices[index].value;
    onChange?.({ target: native.current, currentTarget: native.current });
    setActive(index);
    setOpen(false);
    trigger.current?.focus();
  }
  function firstActive() {
    const index = choices.findIndex((c) => c.value === selected && !c.disabled);
    return index < 0 ? choices.findIndex((c) => !c.disabled) : index;
  }
  function onKeyDown(event) {
    const enabled = choices
      .map((c, i) => (!c.disabled ? i : -1))
      .filter((i) => i >= 0);
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      const direction = event.key === "ArrowUp" ? -1 : 1;
      setActive(
        event.key === "Home"
          ? enabled[0]
          : event.key === "End"
            ? enabled.at(-1)
            : !open
              ? firstActive()
              : enabled[
                  (enabled.indexOf(active) + direction + enabled.length) %
                    enabled.length
                ],
      );
      setOpen(true);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active);
      else {
        setActive(firstActive());
        setOpen(true);
      }
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    } else if (event.key === "Tab") setOpen(false);
    else if (event.key.length === 1) {
      const match = choices.findIndex(
        (c) =>
          !c.disabled &&
          String(c.label).toLowerCase().startsWith(event.key.toLowerCase()),
      );
      if (match >= 0) {
        event.preventDefault();
        setActive(match);
        setOpen(true);
      }
    }
  }
  return (
    <div ref={container} className={styles.container}>
      <select
        ref={native}
        className={styles.native}
        name={name}
        value={selected}
        required={required}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          setInternal(event.target.value);
          onChange?.(event);
        }}
        onInvalid={(event) => {
          event.preventDefault();
          setActive(firstActive());
          setOpen(true);
          trigger.current?.focus();
        }}
      >
        {children}
      </select>
      <button
        {...props}
        ref={trigger}
        id={id}
        type="button"
        className={`${styles.trigger} ${className}`}
        role="combobox"
        aria-required={required || undefined}
        aria-expanded={open && !disabled}
        aria-controls={`${id}-options`}
        aria-haspopup="listbox"
        aria-activedescendant={open ? `${id}-option-${active}` : undefined}
        disabled={disabled}
        onClick={() => {
          setActive(firstActive());
          setOpen(!open);
        }}
        onKeyDown={onKeyDown}
        onBlur={(event) => {
          if (!container.current?.contains(event.relatedTarget)) setOpen(false);
        }}
      >
        <span>{choices.find((c) => c.value === selected)?.label}</span>
        <span className={styles.chevron} aria-hidden="true" />
      </button>
      {open && !disabled && (
        <div
          id={`${id}-options`}
          role="listbox"
          aria-labelledby={id}
          className={styles.options}
        >
          {choices.map(
            (choice, index) =>
              !choice.disabled && (
                <div
                  key={choice.value}
                  id={`${id}-option-${index}`}
                  role="option"
                  aria-selected={selected === choice.value}
                  className={active === index ? styles.active : undefined}
                  onPointerDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(index)}
                >
                  <span>{choice.label}</span>
                  <span aria-hidden="true">
                    {selected === choice.value ? "✓" : ""}
                  </span>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}
