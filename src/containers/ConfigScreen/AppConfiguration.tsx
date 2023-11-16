import parse from "html-react-parser";
import { useContext, useEffect, useRef, useState } from "react";

import Icon from "../../assets/appconfig.svg";
import { MarketplaceAppContext } from "../../common/contexts/marketplaceContext";
import localeTexts from "../../common/locales/en-us/index";

const AppConfigurationExtension = () => {
  const appSDK = useContext(MarketplaceAppContext).appSdk;
  const [isValid, setIsValid] = useState(false);
  const appConfig = useRef<any>();

  useEffect(() => {
    appConfig.current = appSDK?.location.AppConfigWidget;
    appConfig.current?.installation.setValidity(isValid, { message: "Invalid Configuration" });

    async function asyncOp() {
      const branches = await appSDK.stack.getAllBranches();
      console.log("KS APP: All Branches", branches);
    }
    const region = appSDK.getCurrentRegion();
    console.log("KS APP: Region", region);
    asyncOp();
  }, []);

  return (
    <div className="app-config">
      <div className="app-config-container">
        <div className="app-config-icon">
          <img src={Icon} alt="icon" />
        </div>
        <div className="app-component-content">
          <h4>{localeTexts.ConfigScreen.title}</h4>
          <p>{parse(localeTexts.ConfigScreen.body)}</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.contentstack.com/docs/developers/developer-hub/app-config-location/">
            {localeTexts.ConfigScreen.button.learnMore}
          </a>
        </div>
        <button
          onClick={() => {
            appConfig.current?.installation.setValidity(!isValid);
            setIsValid((isValid) => !isValid);
          }}>
          Toggle Save
        </button>
      </div>
    </div>
  );
};

export default AppConfigurationExtension;
