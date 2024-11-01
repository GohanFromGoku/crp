import { TranslationContext } from "../components/TranslationsProvider";
import { useContext } from "react";

const useTranslations = () => {
  const { language = "en", changeLanguage = () => {}, translate = () => {} } = useContext(TranslationContext);
  return { language, changeLanguage, translate };
};
export default useTranslations;
