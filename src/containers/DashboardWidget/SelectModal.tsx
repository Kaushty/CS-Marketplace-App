import {
  // ModalFooter, ModalBody, ModalHeader, ButtonGroup,
  Button,
} from "@contentstack/venus-components";
import "./styles.css";

const SelectModal = (props) => {
  return (
    <div className="modal-page-wrapper">
      <div className="dummy-body">Contenstack Asset Picker</div>
      <Button onClick={props.closeModal} buttonType="light">
        Cancel
      </Button>
      {/* <ModalHeader title={"Select Asset"} closeModal={props.closeModal} />
      <ModalBody className="modalBodyCustomClass">
      
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button onClick={props.closeModal} buttonType="light">
            Cancel
          </Button>
          <Button onClick={props.closeModal} icon="SaveWhite" disabled>
            Add Selected Asset
          </Button>
        </ButtonGroup>
      </ModalFooter> */}
    </div>
  );
};

export default SelectModal;
