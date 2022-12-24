import styles from "../../styles/Home.module.css";
import App from "../../components/App";

//import Custom Style scss
export default function Home() {
  return (
    <div className={styles.container}>
      <main>
        <App />
      </main>

      <footer className={styles.footer}>
        Powered by <span className={styles.logo}></span>
      </footer>
    </div>
  );
}