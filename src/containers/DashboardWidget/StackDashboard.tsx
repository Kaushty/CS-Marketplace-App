import { useContext, useEffect } from "react";
import Icon from "../../assets/Icon.svg";
import localeTexts from "../../common/locales/en-us/index";
import parse from "html-react-parser";
import { MarketplaceAppContext } from "../../common/contexts/marketplaceContext";

const StackDashboardExtension = () => {
  const appSDK = useContext(MarketplaceAppContext).appSdk;

  useEffect(() => {
    // appSDK?.pulse("Stack Dashboard UI Location loaded", { appUid: appSDK.appUID });
    const iframeWrapperRef = ref.current;
    (window as any).iframeRef = null;
    // appSDK.modal.setBackgroundElement(iframeWrapperRef);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-icon">
          <img src={Icon} alt="icon" />
        </div>
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
