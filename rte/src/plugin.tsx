import React from "react";
import ContentstackSDK from "@contentstack/app-sdk";
import parse from "html-react-parser";
import editIcon from "./public/edit.svg";
import plugin from "./public/plugin.svg";
import localeTexts from "./common/locales/en-us/index";
import "./index.css";

export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk["location"];
  sdk.pulse("JSON RTE UI Location loaded", { uid: sdk.currentUser?.uid });
  const RTE = await extensionObj["RTEPlugin"];
  if (!RTE) return;
  console.log("KS APP: SDK INIT", sdk);

  const RtePlugin = RTE("RTE Plugin", (rte) => {
    console.log("KS APP: RTE INIT", rte);
    return {
      title: "JSON-RTE-Plugin",
      icon: <img style={{ padding: "0 6px" }} src={editIcon} />,
      render: (props: any) => {
        return (
          <div className="rte-container" {...props.attributes}>
            {props.children}
            <div className="custom-field">
              <div className="custom-field-container">
                <div className="custom-field-icon">
                  <img src={plugin} alt="icon" />
                </div>
                <div className="app-component-content">
                  <h4>{localeTexts.RTE.title}</h4>
                  <p>{localeTexts.RTE.description}</p>
                </div>
              </div>
            </div>
            <div className="app-component-content">
              <p>{parse(localeTexts.RTE.body)}</p>
              <a href="/">{localeTexts.RTE.button.learnMore}</a>
            </div>
          </div>
        );
      },
      displayOn: ["toolbar"],
      elementType: ["void"],
    };
  });

  return {
    RtePlugin,
  };
});
