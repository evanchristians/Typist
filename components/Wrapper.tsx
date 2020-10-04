import styles from "../styles/Wrapper.module.scss";

interface WrapperProps {}
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
