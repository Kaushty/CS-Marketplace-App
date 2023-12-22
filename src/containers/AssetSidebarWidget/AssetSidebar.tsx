import { Button, openUploadAssetModal } from "@contentstack/venus-components";

import parse from "html-react-parser";
import { useContext, useEffect } from "react";
import Icon from "../../assets/assetsidebar.svg";
import { MarketplaceAppContext } from "../../common/contexts/marketplaceContext";
import localeTexts from "../../common/locales/en-us/index";

const AssetSidebarExtension = () => {
  const appSDK = useContext(MarketplaceAppContext).appSdk;

  useEffect(() => {
    async function asyncOp() {
      const fileData = "Hello, this is a test file!"; // Replace this with your file data
      const fileName = "text.txt"; // Replace this with your desired file name
      const fileType = "text/plain"; // Replace this with the appropriate MIME type

      // Create a Blob object from the file data
      const fileBlob = new Blob([fileData], { type: fileType });

      // Create a File object from the Blob
      const file = new File([fileBlob], fileName);
      const res = await appSDK?.location?.AssetSidebarWidget?.replaceAsset(file);
      console.log("KS APP: Dashboard", res);
    }
    const updateCallback = (e) => {
      console.log("KS APP: On Change", e);
    };
    const saveCallback = (e) => {
      console.log("KS APP: On Save", e);
    };
    appSDK?.location?.AssetSidebarWidget?.onChange(updateCallback);
    appSDK?.location?.AssetSidebarWidget?.onSave(saveCallback);
    setTimeout(() => {
      asyncOp();
    }, 1000);
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
    <div className="asset-sidebar">
      <div className="asset-sidebar-container">
        <div className="asset-sidebar-icon">
          <img src={Icon} alt="icon" />
        </div>
        <div className="app-component-content">
          <h4>{localeTexts.AssetSidebarWidget.title}</h4>
          <p>{parse(localeTexts.AssetSidebarWidget.body)}</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.contentstack.com/docs/developers/developer-hub/asset-sidebar-location/">
            {localeTexts.AssetSidebarWidget.button.learnMore}
          </a>
        </div>
        <Button buttonType="primary" onClick={handleClick}>
          Open Modal
        </Button>
      </div>
    </div>
  );
};

export default AssetSidebarExtension;
