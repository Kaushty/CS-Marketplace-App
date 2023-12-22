import { Button, openUploadAssetModal } from "@contentstack/venus-components";
import parse from "html-react-parser";

import { useContext, useEffect } from "react";
import Icon from "../../assets/sidebarwidget.svg";
import { MarketplaceAppContext } from "../../common/contexts/marketplaceContext";
import localeTexts from "../../common/locales/en-us/index";

const EntrySidebarExtension = () => {
  const appSDK = useContext(MarketplaceAppContext).appSdk;

  useEffect(() => {
    async function asyncOp() {
      const field = appSDK.location.SidebarWidget.entry.getField("title");
      // setTimeout(() => {
      //   field.setData("Hello World");
      // }, 2000);
    }
    asyncOp();
  }, []);

  const handleClick = (e) => {
    console.log("APP CLICK", Date.now());
    openUploadAssetModal({
      sdk: appSDK,
      onSubmit: (e) => {
        console.log("KS APP: Upload", e);
      },
    });
  };

  return (
    <div className="entry-sidebar">
      <div className="entry-sidebar-container">
        <div className="entry-sidebar-icon">
          <img src={Icon} alt="icon" />
        </div>
        <div className="app-component-content">
          <h4>{localeTexts.SidebarWidget.title}</h4>
          <p>{parse(localeTexts.SidebarWidget.body)}</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.contentstack.com/docs/developers/developer-hub/sidebar-location/">
            {localeTexts.SidebarWidget.button.learnMore}
          </a>
        </div>
        <Button buttonType="primary" onClick={handleClick}>
          Open Modal
        </Button>
      </div>
    </div>
  );
};

export default EntrySidebarExtension;
