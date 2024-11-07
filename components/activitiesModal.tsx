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

import { useState, useEffect } from "react";

import { fetchSheets, setNextCell } from "./fetchSheets";

interface Data {
  data: {
    customers: string[][] | null | undefined;
  };
}

async function handleStartStop(isStarted:any, selectedActivity:any, activityDescription:any) {
  const getDate = () => {
    const now = new Date();
    const date = now.toLocaleDateString();

    return date;
  };

  const getHours = () => {
    const now = new Date();
    const hours = now.getHours() + ":" + now.getMinutes();

    return hours;
  };

  const user = String(localStorage.getItem('user'));

  if (!isStarted && user) {
    setNextCell(user, "A", getDate());
    setNextCell(user, "B", getHours());
    setNextCell(user, "D", selectedActivity);
    setNextCell(user, "E", activityDescription);
    setNextCell(user, "F", user);
    return
  }

  setNextCell(user, "C", getHours());

}

export default function ActivitiesModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [customers, setCustomers] = useState<string[] | null>(null);

  useEffect(() => {
    fetchSheets("GET", `Clientes!A:A`, "")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });      
  }, []);

  useEffect(() => {
    const storedIsStarted = localStorage.getItem("isStarted");
    if (storedIsStarted) {
      setIsStarted(JSON.parse(storedIsStarted));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isStarted", JSON.stringify(isStarted));
  }, [isStarted]);

  const handleButtonClick = (selectedActivity:string, activityDescription:string) => {
    handleStartStop(isStarted, selectedActivity, activityDescription);
    setIsStarted(!isStarted);
  };

  return (
    <div className="flex gap-3">
      <Button onPress={onOpen} color="primary">
        Clique aqui
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Iniciar contador de atividade
              </ModalHeader>
              <ModalBody>
                <Select
                  isRequired
                  isDisabled={isStarted ? true : false}
                  onChange={(e:any) => setSelectedActivity(String(e.target.value))}
                  label="Atividade/Projeto"
                >
                  {customers ? (
                    customers.map((customersName: string) => {
                      return (
                        <SelectItem key={customersName[0]}>
                          {customersName[0]}
                        </SelectItem>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Select>
                <Textarea
                  isRequired
                  label="Descrição da atividade"
                  onChange={(e:any) => setActivityDescription(String(e.target.value))}
                  placeholder="Escreva a descrição"
                />
              </ModalBody>
              <ModalFooter>
                {!isStarted ? (
                  <Button color="primary" onPress={() => handleButtonClick(selectedActivity, activityDescription)}>
                    Iniciar
                  </Button>
                ) : (
                  <Button color="danger" onPress={() => handleButtonClick(selectedActivity, activityDescription)}>
                    Parar
                  </Button>
                )}

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
