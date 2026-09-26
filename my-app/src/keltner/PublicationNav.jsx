"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, getCategory } from "./config";
import styles from "./publication.module.css";
export default function PublicationNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = getCategory(pathname.split("/")[2]);
  return (
    <div className={styles.navigation}>
      <button
        className={styles.menuButton}
        aria-expanded={open}
        aria-controls="publication-navigation"
        onClick={() => setOpen(!open)}
      >
        <span aria-hidden="true">{open ? "−" : "+"}</span>{" "}
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="publication-navigation"
        className={`${styles.nav} ${open ? styles.navOpen : ""}`}
        aria-label="Publication"
      >
        <div className={styles.navSections}>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/keltner/${category.slug}`}
              aria-current={
                current?.slug === category.slug ? "page" : undefined
              }
              onClick={() => setOpen(false)}
            >
              {category.title}
            </Link>
          ))}
        </div>
        <div className={styles.navSecondary}>
          <Link href="/keltner#journal" onClick={() => setOpen(false)}>
            The Journal
          </Link>
          <Link
            href="/keltner/about"
            aria-current={pathname === "/keltner/about" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="/keltner/newsletter"
            aria-current={
              pathname === "/keltner/newsletter" ? "page" : undefined
            }
            onClick={() => setOpen(false)}
          >
            Newsletter
          </Link>
        </div>
      </nav>
    </div>
  );
}
