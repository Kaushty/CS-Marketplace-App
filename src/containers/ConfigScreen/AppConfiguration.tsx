import React, { useEffect, useRef, useState } from "react";

import { FieldLabel, TextInput } from "@contentstack/venus-components";
import "@contentstack/venus-components/build/main.css";
import ContentstackAppSDK from "@contentstack/app-sdk";
import Extension from "@contentstack/app-sdk/dist/src/extension";
import { IInstallationData, ValidationOptions } from "@contentstack/app-sdk/dist/src/types";

import "./styles.css";

// A sample validation function for API key
const validateApiKey = (value: string = ""): boolean => {
  return value.length > 3;
};

// A sample validation function for Access token
const validateAccessToken = (value: string = ""): boolean => {
  return value.length > 5;
};

const AppConfigurationExtension = () => {
  const [appSdk, setAppSdk] = useState<Extension | null>(null);
  // A ref to store the installation object for easy access
  const installationRef = useRef<{
    setInstallationData: (installationData: IInstallationData) => Promise<{ [key: string]: string }>;
    getInstallationData: () => Promise<IInstallationData>;
    setValidity: (isValid: boolean, options?: ValidationOptions | undefined) => void;
  } | null>(null);

  // Sample form values
  const [apiKey, setApiKey] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    // Function to fetch the current configuration if present
    async function getAppConfiguration() {
      if (installationRef.current) {
        const appConfiguration = await installationRef.current.getInstallationData();
        // Update the state with the current config values
        setApiKey(appConfiguration.configuration.apiKey);
        setAccessToken(appConfiguration.configuration.accessToken);
      }
    }

    // Initializing the App SDK
    ContentstackAppSDK.init()
      .then((sdk) => {
        // Storing the installation object to the ref for easy accesss
        installationRef.current = sdk.location.AppConfigWidget?.installation || null;
        setAppSdk(sdk);
      })
      .then(() => getAppConfiguration())
      .catch((e) => {
        console.log("Contentstack App SDK: Initialization Failed", e);
      });
  }, []);

  useEffect(() => {
    if (installationRef.current) {
      // Validate the form fields
      if (validateApiKey(apiKey) && validateAccessToken(accessToken)) {
        // IMP: Update the parent installation data, if not done user entered configuration will not be saved
        installationRef.current.setInstallationData({
          configuration: { apiKey, accessToken },
          serverConfiguration: {},
        });
        // Enable the Save CTA in the App Config screen
        installationRef.current.setValidity(true);
      } else {
        // Disable the Save CTA in the App Config screen
        // doing so does not allow the user to save invalid configuration
        installationRef.current.setValidity(false, { message: "Please enter valid inputs" });
      }
    }
  }, [installationRef.current, apiKey, accessToken]);

  return (
    <div className="app-config">
      <div className="app-config-container">
        <div className="app-config-content">
          <h4>App Configuration</h4>
        </div>
        <div className="flex-col form-input">
          <FieldLabel htmlFor="apiKey">API Key</FieldLabel>
          <TextInput name="apiKey" type="text" onChange={(e) => setApiKey(e.target.value)} value={apiKey} />
          <FieldLabel htmlFor="accessToken">Access Token</FieldLabel>
          <TextInput
            name="accessToken"
            type="password"
            onChange={(e) => setAccessToken(e.target.value)}
            value={accessToken}
          />
        </div>
      </div>
    </div>
  );
};

export default AppConfigurationExtension;
