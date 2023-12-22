import parse from "html-react-parser";
import { useContext, useEffect, useRef, useState } from "react";

import Icon from "../../assets/appconfig.svg";
import { MarketplaceAppContext } from "../../common/contexts/marketplaceContext";
import localeTexts from "../../common/locales/en-us/index";
import { FieldLabel, InstructionText, Select, openUploadAssetModal } from "@contentstack/venus-components";

const AppConfigurationExtension = () => {
  const appSDK = useContext(MarketplaceAppContext).appSdk;
  const [isValid, setIsValid] = useState(false);
  const appConfig = useRef<any>();

  useEffect(() => {
    appConfig.current = appSDK?.location.AppConfigWidget;
    appConfig.current?.installation.setValidity(isValid, { message: "Invalid Configuration" });

    async function asyncOp() {
      const branches = await appSDK.stack.getAllBranches();
      console.log("KS APP: All Branches", branches);
    }
    const region = appSDK.getCurrentRegion();
    console.log("KS APP: Region", region);
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

  const data = [
    {
      label: "Group 1",
      options: [
        { label: "item 1", value: "value_1" },
        { label: "item 2", value: "value_2" },
        { label: "item 3", value: "value_3" },
        { label: "item 4", value: "value_4" },
      ],
    },
    {
      label: "Group 2",
      options: [
        { label: "item 5", value: "value_5" },
        { label: "item 6", value: "value_6" },
        { label: "item 7", value: "value_7" },
        { label: "item 8", value: "value_8" },
      ],
    },
    {
      label: "Group 3",
      options: [
        { label: "item 9", value: "value_9" },
        { label: "item 10", value: "value_10" },
        { label: "item 11", value: "value_11" },
        { label: "item 12", value: "value_12" },
      ],
    },
    {
      label: "Group 4",
      options: [
        { label: "item 13", value: "value_13" },
        { label: "item 14", value: "value_14" },
        { label: "item 15", value: "value_15" },
        { label: "item 16", value: "value_16" },
      ],
    },
    { label: "root option 1", value: "value_root_1" },
    { label: "root option 2", value: "value_root_2" },
  ];

  const [value, updateValue] = useState(null);

  return (
    <div className="app-config">
      <div className="app-config-container">
        <div className="app-config-icon">
          <img src={Icon} alt="icon" />
        </div>
        <div className="app-component-content">
          <h4>{localeTexts.ConfigScreen.title}</h4>
          <p>{parse(localeTexts.ConfigScreen.body)}</p>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.contentstack.com/docs/developers/developer-hub/app-config-location/">
            {localeTexts.ConfigScreen.button.learnMore}
          </a>
        </div>
        <button onClick={handleClick}>Toggle Save</button>
        <div>
          <FieldLabel htmlFor="select">
            <InstructionText>Select Something</InstructionText>
            <Select
              selectLabel="Grouped Select Options"
              value={value}
              isMulti={true}
              onChange={updateValue}
              options={data}
              placeholder="Select Title"
              isSearchable={true}
              isClearable={true}
              width="400px"
              multiDisplayLimit={2}
              version="v2"
            />
          </FieldLabel>
        </div>
      </div>
    </div>
  );
};

export default AppConfigurationExtension;
