import { cbModal } from "@contentstack/venus-components";
import { useContext, useEffect, useRef } from "react";

import parse from "html-react-parser";
import Icon from "../../assets/Icon.svg";
import { MarketplaceAppContext } from "../../common/contexts/marketplaceContext";
import localeTexts from "../../common/locales/en-us/index";
import SelectModal from "./SelectModal";
import "./styles.css";

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

const StackDashboardExtension = () => {
  const appSDK = useContext(MarketplaceAppContext).appSdk;
  const ref = useRef(null);
  const { iframeRef } = window as any;

  useEffect(() => {
    console.log("APP SDK", appSDK);
    async function asyncOp() {
      const response = await fetch(
        "https://api.contentstack.io/v3/webhooks/csa5403c26-1a0f-4c8a-87bb-b9a6104713b7/logs",
        {
          headers: {
            api_key: "bltc695bee964d83897",
            authorization: "csb775dfb3f9e0cc8a112f9dcf",
          },
        }
      );
      // csb775dfb3f9e0cc8a112f9dcf
      const result = await response.json();
      console.log("result", result);
    }

    asyncOp();
  }, []);

  const handleHover = () => {
    // const dom = getHTML(iframeRef);
    // const styles = getStyleSheet();
    // appSDK.postRobot.sendToParent("DOMCopy", { dom, styles, preventFullScreen: true }).then((res) => {
    //   console.log("KS APP: RES", res);
    // });
  };

  const handleClick = (e) => {
    console.log("APP CLICK", Date.now());
    // openUploadAssetModal({
    //   sdk: appSDK,
    //   onSubmit: (e) => {
    //     console.log("KS APP: Upload", e);
    //   },
    // });
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
          {" "}
          <img src={Icon} alt="icon" />{" "}
        </div>
        <button onMouseEnter={handleHover} onClick={handleClick}>
          Open Modal
        </button>
        <div className="app-component-content">
          <h4>{localeTexts.DashboardWidget.title}</h4>
          <p>{parse(localeTexts.DashboardWidget.body)}</p>
          <p>Now powered by App SDK v2.0.0</p>
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

// import { useEffect, useState } from "react";
// // import UserData from "./Users";

// var myHeaders = new Headers();
// myHeaders.append("api_key", "blt7935dee6154c965a");
// myHeaders.append("authorization", "csab594f10d46328d60adff7d3");
// myHeaders.append("Content-Type", "application/json");

// var raw = "";

// var requestOptions: any = {
//   method: "GET",
//   headers: myHeaders,
//   body: raw,
//   redirect: "follow",
// };

// // https://localhost:3001/

// const StackDashboardExtension = () => {
//   const [logs, setLogs] = useState([]);
//   console.log("logs", logs);
//   useEffect(() => {
//     // fetch("https://eu-api.contentstack.com/v3/stacks/branches", {
//     fetch("https://eu-api.contentstack.com/v3/webhooks/cs3130a7dd-c48e-45a3-874b-229d16262007/executions", {
//       method: "GET",
//       headers: myHeaders,
//       redirect: "follow",
//     } as any)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         setLogs(data);
//       });
//   }, []);

//   return (
//     <>
//       <h1>Webhook Logs</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Address</th>
//           </tr>
//         </thead>
//         <tbody>{/* <UserData users={logs} /> */}</tbody>
//       </table>
//     </>
//   );
// };

// export default StackDashboardExtension;
