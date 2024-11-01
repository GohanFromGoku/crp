import PropTypes from "prop-types";
import i18n from "i18next";
import React, { createContext, useEffect } from "react";

export const TranslationContext = createContext();

const getLanguages = (langs = {}) => {
  const l = {};
  Object.keys(langs).forEach((i) => {
    l[i] = { translation: langs[i] };
  });
  return l;
};

const TranslationsProvider = ({ children, languages = { en: {} } }) => {
  const [isTranslationsInitiated, setIsTranslationsInitiated] = React.useState(false);
  const localStorageLanguage = window.localStorage.getItem("language") || "en";
  const [language, setLanguage] = React.useState(localStorageLanguage || "en");

  const initTranslations = React.useCallback(
    async (langs) => {
      await i18n.init({
        resources: langs,
        fallbackLng: "en",
      });
      await changeLanguage(language);
      setIsTranslationsInitiated(true);
      return;
    },
    [language]
  );

  const init = React.useCallback(async () => {
    try {
      if (Object.keys(languages).length > 0) {
        const langs = getLanguages(languages);
        await initTranslations(langs);
      }
    } catch (e) {
      throw e.message;
    }
  }, [initTranslations, languages]);

  useEffect(() => {
    init();
  }, [init]);

  const changeLanguage = async (lng) => {
    try {
      setLanguage(lng);
      window.localStorage.setItem("language", lng);
      await i18n.changeLanguage(lng);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const translate = (key, data) => {
    if (i18n.exists(key)) {
      return i18n.t(key, data);
    }
    return key;
  };

  return <TranslationContext.Provider value={{ language, changeLanguage, translate }}>{isTranslationsInitiated && children}</TranslationContext.Provider>;
};

TranslationsProvider.propTypes = {
  children: PropTypes.any.isRequired,
  languages: PropTypes.object,
};

export default TranslationsProvider;
