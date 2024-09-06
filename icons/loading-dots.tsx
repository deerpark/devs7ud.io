import styles from "./loading-dots.module.css";

const LoadingDots = () => {
  return (
    <span className={styles.loading}>
      <span className="bg-primary" />
      <span className="bg-primary" />
      <span className="bg-primary" />
    </span>
  );
};

export default LoadingDots;
