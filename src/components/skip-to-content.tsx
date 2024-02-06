import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faForward } from "@fortawesome/pro-solid-svg-icons"

import { Alert, AlertDescription, AlertTitle } from "./ui/alert"
import { useTranslations } from "next-intl"

export default function SkipToContent() {
  const t = useTranslations("SYSTEM.skipToContent")
  return (
    <Alert className="fixed w-auto -translate-x-full translate-y-5 transition-transform duration-500 ease-in focus-within:translate-x-5 focus-within:ease-out">
      <FontAwesomeIcon icon={faForward} className="size-4" />
      <AlertTitle>
        <a href="#main">{t("label")}</a>
      </AlertTitle>
      <AlertDescription className="flex space-x-1">
        <span>({t("if")})</span>
        <span>{t("or")}</span>
        <a href="#list">{t("jumpToList")}</a>
        <span>({t("if")})</span>
      </AlertDescription>
    </Alert>
  )
}
