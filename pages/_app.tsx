import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Link from "next/link";
import styles from '../styles/rashidStyles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <nav className={styles.navbar}>
        <ul>
          <Link href="/"><li>Home</li></Link>
          <Link href="/Blog"><li>Blog</li></Link>
          <Link href="/contact"><li>Contact</li></Link>
        </ul>
      </nav>
      <Component {...pageProps} />
    </>
  );
}
