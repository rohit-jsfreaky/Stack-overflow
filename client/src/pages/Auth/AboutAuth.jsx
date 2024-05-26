import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutAuth = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="auth-container-1">
        <h1>{t("about.joinCommunity")}</h1>
        <p>{t("about.getUnstuck")}</p>
        <p>{t("about.unlockPrivileges")}</p>
        <p>{t("about.saveFavorites")}</p>
        <p>{t("about.earnReputation")}</p>
        <p style={{ fontSize: "13px", color: "#666767" }}>
          {t("about.collaborateShare")}
        </p>
        <p style={{ fontSize: "13px", color: "#007ac6" }}>
          {t("about.getTeamsFree")}
        </p>
      </div>
    </div>
  );
}

export default AboutAuth;
