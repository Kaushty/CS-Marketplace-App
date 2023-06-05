import { useContext, useEffect, useRef } from "react";
import { Button, cbModal } from "@contentstack/venus-components";

import "@contentstack/venus-components/build/main.css";
import Icon from "../../assets/Icon.svg";
import localeTexts from "../../common/locales/en-us/index";
import parse from "html-react-parser";
import { MarketplaceAppContext } from "../../common/contexts/marketplaceContext";
import SelectModal from "./SelectModal";
import "./styles.css";

const StackDashboardExtension = () => {
  const appSDK = useContext(MarketplaceAppContext).appSdk;
  const ref = useRef(null);

  useEffect(() => {
    appSDK?.pulse("Stack Dashboard UI Location loaded", { appUid: appSDK.appUID });
    const iframeWrapperRef = ref.current;
    (window as any).iframeRef = iframeWrapperRef;
    (window as any).postRobot = appSDK.postRobot;
  }, []);

  const handleClick = (e) => {
    cbModal({
      component: (props) => <SelectModal {...props} />,
      modalProps: {
        size: "max",
      },
    });
  };

  return (
    <div ref={ref} className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-icon">
          <img src={Icon} alt="icon" />
        </div>
        <Button buttonType="tertiary-outline" onClick={handleClick}>
          Open Modal
        </Button>
        <div className="app-component-content">
          <h4>{localeTexts.DashboardWidget.title}</h4>
          <p>{parse(localeTexts.DashboardWidget.body)}</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.contentstack.com/docs/developers/developer-hub/dashboard-location/">
            {localeTexts.DashboardWidget.button.learnMore}
          </a>
        </div>
      </div>
    </div>
  );
};

export default StackDashboardExtension;
