import classes from "../styles/PageContainer.module.css";
import { useLanguage } from "../LanguageContext";

function PageContainer({ title, children }) {
  const { lang } = useLanguage();

  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContainer;
