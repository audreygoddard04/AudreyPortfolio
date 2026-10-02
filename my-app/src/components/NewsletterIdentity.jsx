"use client";
import { useId } from "react";
import ThemedSelect from "./ThemedSelect";
import styles from "./NewsletterIdentity.module.css";
export default function NewsletterIdentity({ disabled = false }) {
  const id = useId();
  return (
    <div className={styles.fields}>
      <label htmlFor={`${id}-first`}>
        First name
        <input
          id={`${id}-first`}
          name="firstName"
          autoComplete="new-password"
          maxLength={80}
          required
          disabled={disabled}
        />
      </label>
      <label htmlFor={`${id}-last`}>
        Last name
        <input
          id={`${id}-last`}
          name="lastName"
          autoComplete="new-password"
          maxLength={80}
          required
          disabled={disabled}
        />
      </label>
      <div className={styles.gender}>
        <label htmlFor={`${id}-gender`}>Gender</label>
        <ThemedSelect
          id={`${id}-gender`}
          name="gender"
          defaultValue=""
          required
          disabled={disabled}
        >
          <option value="" disabled>
            Select gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </ThemedSelect>
      </div>
    </div>
  );
}
