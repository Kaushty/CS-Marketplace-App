import { Button, openUploadAssetModal } from "@contentstack/venus-components";
import { useContext, useEffect } from "react";
import Icon from "../../assets/customfield.svg";
import { MarketplaceAppContext } from "../../common/contexts/marketplaceContext";
import localeTexts from "../../common/locales/en-us/index";

function getHTML(iframe) {
  if (iframe.getInnerHTML) {
    return iframe.getInnerHTML({ includeShadowRoots: true });
  }
  const dom = iframe;
  Array.from(dom.querySelectorAll("*")).forEach((el: any) => {
    if (el.shadowRoot) {
      el.innerHTML = el.shadowRoot.innerHTML;
    }
  });
  return dom.innerHTML;
}

function getStyleSheet() {
  let styleSheets = "";
  Array.from(document.styleSheets).forEach((sheet: CSSStyleSheet) => {
    //@ts-ignore
    styleSheets += sheet.ownerNode.outerHTML;
  });
  return styleSheets;
}

const GreenBox = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        backgroundColor: "#4CAF50",
      }}>
      <h1 style={{ color: "white" }}>Hello World!</h1>
    </div>
  );
};

const CustomFieldExtension = () => {
  const appSDK = useContext(MarketplaceAppContext).appSdk;
  // appSDK.location.CustomField.stack.getData();

  const handleClick = (e) => {
    console.log("APP CLICK", Date.now());
    openUploadAssetModal({
      sdk: appSDK,
      onSubmit: (e) => {
        console.log("KS APP: Upload", e);
      },
    });
  };

  useEffect(() => {
    // const modularField = appSDK.location.CustomField.entry.getField("single_line");
    // const data = modularField.getData();
    // console.log("KS APP: MODULAR FIELD DATA", modularField);

    async function asyncOperation() {
      // await modularField.setData(`[
      //   {
      //     block1: {
      //       single_line: "Sample Text Updated",
      //       multi_line: "Some Field Updated",
      //     },
      //   },
      // ]`);
    }

    setTimeout(() => {
      asyncOperation();
    }, 1000);
  }, []);

  return (
    <div className="x-field">
      <div className="custom-field-container">
        <div className="custom-field-icon">
          <img src={Icon} alt="icon" />
        </div>
        <div className="app-component-content">
          <h4>{localeTexts.CustomField.title}</h4>
          <div onClick={handleClick} className="action-button">
            Select Asset
          </div>
          <Button buttonType="primary" onClick={handleClick}>
            Open Modal
          </Button>
        </div>
        <GreenBox />
      </div>
    </div>
  );
};

export default CustomFieldExtension;

/**
 * [
    {
        "block1": {
            "single_line": "Sample Text",
            "_metadata": {
                "uid": "cs180f80cf5939154a"
            },
            "multi_line": "Some Field"
        }
    }
]
 */
