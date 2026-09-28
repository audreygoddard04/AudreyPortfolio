"use client";
import { useId } from "react";
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
          autoComplete="given-name"
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
          autoComplete="family-name"
          maxLength={80}
          required
          disabled={disabled}
        />
      </label>
      <label className={styles.gender} htmlFor={`${id}-gender`}>
        Gender
        <select
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
        </select>
      </label>
    </div>
  );
}
