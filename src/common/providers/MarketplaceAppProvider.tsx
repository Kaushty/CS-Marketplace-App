import React, { useEffect, useState } from "react";
import ContentstackAppSDK from "@contentstack/app-sdk";
import UiLocation from "@contentstack/app-sdk/dist/src/uiLocation";

import { KeyValueObj } from "../types/types";
import { isNull } from "lodash";
import { AppFailed } from "../../components/AppFailed";
import { MarketplaceAppContext } from "../contexts/marketplaceContext";

type ProviderProps = {
  children?: React.ReactNode;
};

/**
 * Marketplace App Provider
 * @param children: React.ReactNode
 */
export const MarketplaceAppProvider: React.FC<ProviderProps> = ({ children }) => {
  const [failed, setFailed] = useState<boolean>(false);
  const [appSdk, setAppSdk] = useState<UiLocation | null>(null);
  const [appConfig, setConfig] = useState<KeyValueObj | null>(null);

  useEffect(() => {
    try {
      ContentstackAppSDK.init()
        .then(async (appSdk) => {
          console.log("App SDK: Initialization Succeeded", appSdk);
          const appConfig = await appSdk.getConfig();
          setAppSdk(appSdk);
          setConfig(appConfig);
        })
        .catch((e) => {
          console.log("App SDK: Initialization Failed", e);
          setFailed(true);
        });
    } catch (e) {
      console.log("Contentstack SDK: Init Failed", e);
    }
  }, []);

  // wait until the SDK is initialized. This will ensure the values are set
  // correctly for appSdk.
  if (!failed && isNull(appSdk)) {
    return <div>Loading...</div>;
  }

  if (failed) {
    return <AppFailed />;
  }

  return <MarketplaceAppContext.Provider value={{ appSdk, appConfig }}>{children}</MarketplaceAppContext.Provider>;
};
