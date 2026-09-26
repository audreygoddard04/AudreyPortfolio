import Image from "next/image";
import styles from "./GoldFrame.module.css";

/** Use the ornamental border for any content, or preserve the complete supplied artwork. */
export default function GoldFrame({
  children,
  className = "",
  artwork = false,
}) {
  if (artwork)
    return (
      <div className={`${styles.artwork} ${className}`}>
        <Image
          src="/brand/email-popup.png"
          alt=""
          aria-hidden="true"
          width={766}
          height={968}
          unoptimized
        />
        {children}
      </div>
    );
  return (
    <div className={`${styles.frame} ${className}`}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
