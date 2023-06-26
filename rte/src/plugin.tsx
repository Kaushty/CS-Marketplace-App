import React from "react";
import ContentstackSDK from "@contentstack/app-sdk";
import parse from "html-react-parser";
import editIcon from "./public/edit.svg";
import plugin from "./public/plugin.svg";
import localeTexts from "./common/locales/en-us/index";
import "./index.css";
import { IRteParam } from "@contentstack/app-sdk/dist/src/RTE/types";

export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk["location"];
  sdk.pulse("JSON RTE UI Location loaded", { uid: sdk.currentUser?.uid });
  const RTE = await extensionObj["RTEPlugin"];
  if (!RTE) return;

  const RtePlugin = RTE("RTE Plugin", (rte) => {
    (rte as any).insertNode(
      {
        type: "img",
        attrs: {
          inline: true,
          url: "https://images.contentstack.io/v3/assets/bltc695bee964d83897/bltdd0c30adfd0b848c/643974725f834b59633e0566/Akeneo.svg",
          "redactor-attributes": {
            inline: true,
            position: "left",
          },
          style: { float: "left" },
        },
        children: [
          {
            text: "",
          },
        ],
      },
      { at: [0, 0] }
    );

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

  RtePlugin.on("change" as any, ({ rte }: { rte: any }): void => {
    console.log("CS APP: RTE NODES", (rte as IRteParam).getNode([0]));
  });

  return {
    RtePlugin,
  };
});
