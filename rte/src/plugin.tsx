import ContentstackSDK from "@contentstack/app-sdk";
import React from "react";
import "./index.css";
import editIcon from "./public/edit.svg";

export default ContentstackSDK.init().then(async (sdk) => {
  const extensionObj = await sdk["location"];
  sdk.pulse("JSON RTE UI Location loaded", { uid: sdk.currentUser?.uid });
  const RTE = await extensionObj["RTEPlugin"];
  if (!RTE) return;

  const customizedNode = {
    type: "embed",
    // attrs: {
    //   url: "https://images.contentstack.io/v3/assets/bltc695bee964d83897/blt03713fb90578db61/65325f6cd5a1c44316b4af5a/image.png",
    //   width: null,
    //   height: "auto",
    //   "redactor-attributes": {},
    // },
    attrs: {
      src: "https://www.youtube.com/embed/DEPwA3mv_R8",
      style: {},
      "redactor-attributes": {},
      dir: "ltr",
    },
    children: [
      {
        text: "",
      },
    ],
  };

  const RtePlugin = RTE("customized-image", (rte: any) => {
    rte.insertNode(customizedNode, { at: [0, 0] });

    // rte.insertNode(
    //   {
    //     type: "img",
    //     attrs: {
    //       inline: true,
    //       url: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-980x653.jpg",
    //       "redactor-attributes": {
    //         inline: true,
    //         position: "left",
    //       },
    //       style: {
    //         float: "left", // ("none", "right")
    //       },
    //     },
    //     children: [
    //       {
    //         text: "",
    //       },
    //     ],
    //   },
    //   { at: [0, 0] }
    // );
    return {
      title: "JSON-RTE-Plugin",
      icon: <img style={{ padding: "0 6px" }} src={editIcon} />,
      render: (props: any) => {
        console.log("Props", props);
        return (
          <div className="rte-container" {...props.attributes}>
            {/* {props.children} */}
            {/* Hello World */}
            {/* Custom Rendering here */}
          </div>
        );
      },
      displayOn: ["toolbar"],
      elementType: ["void"],
    };
  });

  RtePlugin.on("keydown", (arg1) => {
    console.log("KS APP: Keydown copy", { arg1 });
  });

  //@ts-ignore
  RtePlugin.on("paste", (arg1) => {
    console.log("KS APP: Plugin paste", { arg1 });
  });

  return {
    RtePlugin,
  };
});
