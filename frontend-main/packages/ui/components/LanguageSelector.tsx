import {
  Button,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import trFlag from "@repo/ui/english.png";
import enFlag from "@repo/ui/turkish.png";

const languageOptions = new Map([
  ["tr", trFlag],
  ["en", enFlag],
]);

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(trFlag);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage") || "tr";
    setLang(languageOptions.get(savedLanguage));
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  const handleClick = useCallback(
    (lng) => {
      setLang(languageOptions.get(lng));
      i18n.changeLanguage(lng);
      localStorage.setItem("selectedLanguage", lng);
    },
    [i18n, setLang]
  );

  const languagesArray = useMemo(() => [...languageOptions.entries()], []);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        width="40%"
        float="left"
        position="relative"
      >
        <Image borderRadius="50%" src={lang} width="70%" />
      </MenuButton>
      <MenuList minWidth="25px" marginLeft="-9px">
        {languagesArray.map(([id, src]) => (
          <MenuItem key={id} onClick={() => handleClick(id)}>
            <Image src={src} width="25px" />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageSelector;
