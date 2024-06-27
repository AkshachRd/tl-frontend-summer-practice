import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/modal";

export type CardEditingModalProps = Omit<ModalProps, "children"> & {
  frontside: string;
  onFrontsideChange: (frontside: string) => void;
  backside: string;
  onBacksideChange: (backside: string) => void;
  onSave: () => void;
};

export const CardModal = ({
  frontside,
  onFrontsideChange,
  backside,
  onBacksideChange,
  onSave,
  title,
  ...props
}: CardEditingModalProps) => {
  return (
    <Modal {...props}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <Input
                label="Front side"
                name="frontside"
                type="text"
                value={frontside}
                onValueChange={onFrontsideChange}
              />
              <Input
                label="Back side"
                name="backside"
                type="text"
                value={backside}
                onValueChange={onBacksideChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onSave();
                  onClose();
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
