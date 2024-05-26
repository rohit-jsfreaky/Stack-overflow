// Widget.js
import React from "react";
import "./RightSidebar.css";
import comment from "../../assets/comment-alt-solid.svg";
import pen from "../../assets/pen-solid.svg";
import blackLogo from "../../assets/blacklogo.svg";
import { useTranslation } from "react-i18next";

const Widget = () => {
  const { t } = useTranslation();

  return (
    <div className="widget">
      <h4>{t("1_right")}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>{t("Observability is key to the future of software (and your DevOps career)")}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width="18" />
          <p>{t("Podcast 374: How valuable is your screen name?")}</p>
        </div>
      </div>
      <h4>{t("Featured on Meta")}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>{t("Review queue workflows - Final release....")}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={comment} alt="pen" width="18" />
          <p>{t("Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG")}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blackLogo} alt="pen" width="18" />
          <p>{t("Outdated Answers: accepted answer is now unpinned on Stack Overflow")}</p>
        </div>
      </div>
      <h4>{t("Hot Meta Posts")}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>{t("Why was this spam flag declined, yet the question marked as spam?")}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>{t("What is the best course of action when a user has high enough rep to...")}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>{t("Is a link to the 'How to ask' help page a useful comment?")}</p>
        </div>
      </div>
    </div>
  );
};

export default Widget;
