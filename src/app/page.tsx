// src/app/page.tsx
import Image from "next/image";
import styles from "./home.module.css";

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <Image
          src="/assets/icons/logo-white.svg"
          alt="The Family Forge Logo"
          width={200}
          height={200}
        />
        <h1 className={styles.title}>The Family Forge</h1>
      </div>
    </div>
  );
}
