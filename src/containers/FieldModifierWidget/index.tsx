import { Button, cbModal } from "@contentstack/venus-components";

import parse from "html-react-parser";
import { useContext, useEffect, useState } from "react";
import Icon from "../../assets/sidebarwidget.svg";
import { MarketplaceAppContext } from "../../common/contexts/marketplaceContext";
import localeTexts from "../../common/locales/en-us/index";
import SelectModal from "../DashboardWidget/SelectModal";

const FieldModifierWidget = () => {
  const appSDK = useContext(MarketplaceAppContext).appSdk;
  const [showSection, setShowSection] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // appSDK.location.FieldModifierLocation.frame.disableAutoResizing();
    }, 1000);
    // appSDK.location.FieldModifierLocation.frame.updateDimension({ height: 600, width: 600 });
    // setTimeout(async () => {
    //   const result = await appSDK.location.FieldModifierLocation.frame.closeModal();
    //   console.log("KS APP: Result for close modal", result);
    // }, 3 * 1000);
    console.log("KS APP: Location data", appSDK.location.FieldModifierLocation.field);
  }, []);

  // const handleClick = (e) => {
  //   setShowSection(!showSection);
  // };

  const handleClick = (e) => {
    appSDK.location.FieldModifierLocation.frame.disableAutoResizing();
    cbModal({
      component: (props) => <SelectModal {...props} />,
      modalProps: {
        size: "max",
        onClose: () => {
          setTimeout(() => {
            appSDK.location.FieldModifierLocation.frame.enableAutoResizing();
          }, 1000);
          setTimeout(() => {}, 1000);
        },
      },
    });
  };

  return (
    <div style={showSection ? { width: "500px" } : { width: "auto" }}>
      <div className="entry-sidebar" style={{ minWidth: "300px" }}>
        <div className="entry-sidebar-container">
          <div className="entry-sidebar-icon">
            <img src={Icon} alt="icon" />
          </div>
          <Button buttonType="tertiary-outline" onClick={handleClick}>
            Open Modal
          </Button>

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
        </div>
      </div>
      {showSection && (
        <div style={{ background: "red", minWidth: "500px" }}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis
        </div>
      )}
    </div>
  );
};

export default FieldModifierWidget;
