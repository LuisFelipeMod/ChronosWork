"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";

interface Data {
  data: {
    customers: string[][] | null | undefined;
  };
}

export default function ActivitiesModal(data: Data) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const customers = data.data.customers;

  return (
    <div className="flex gap-3">
      <Button onPress={onOpen} color="primary">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Iniciar contador de atividade
              </ModalHeader>
              <ModalBody>
                <Select isRequired label="Atividade/Projeto">
                  {customers ? (
                    customers.map((customersName) => {
                      return <SelectItem key={customersName[0]} >{customersName[0]}</SelectItem>;
                    })
                  ) : (
                    <></>
                  )}
                </Select>
                <Textarea
                  isRequired
                  label="Descricao da atividade"
                  placeholder="Escreva a descricao"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Iniciar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
