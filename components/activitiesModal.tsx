"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  Textarea,
} from "@nextui-org/react";

import { useState, useEffect } from "react";

import { fetchSheets, setNextCell } from "./fetchSheets";
import { LoaderCircle, MousePointer2 } from "lucide-react";

interface Data {
  data: {
    customers: string[][] | null | undefined;
  };
}

async function handleStartStop(
  isStarted: any,
  selectedActivity: any,
  activityDescription: any
) {
  const getDate = () => {
    const now = new Date();
    const date = now.toLocaleDateString();

    return date;
  };

  const getHours = () => {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  const user = String(localStorage.getItem("user"));

  if (!isStarted && user) {
    setNextCell(user, "A", getDate());
    setNextCell(user, "B", getHours());
    setNextCell(user, "D", selectedActivity);
    setNextCell(user, "E", activityDescription);
    setNextCell(user, "F", user);
    return;
  }

  setNextCell(user, "C", getHours());
}

export default function ActivitiesModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [customers, setCustomers] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(["", "texto"]);


  useEffect(() => {
    fetchSheets("GET", `Clientes!A:A`, "")
      .then((response) => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
        setLoading(false);
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

  const handleButtonClick = (
    selectedActivity: string,
    activityDescription: string
  ) => {
    const getHours = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      return `${hours}:${minutes}`;
    };

    handleStartStop(isStarted, selectedActivity, activityDescription);
    setIsStarted(!isStarted);

    !isStarted
      ? setTime(["started", getHours()])
      : setTime(["stoped", getHours()]);
  };

  useEffect(() => {
    console.log("selectedActivity atualizado:", selectedActivity);
  }, [selectedActivity]);
  
  useEffect(() => {
    console.log("activityDescription atualizado:", activityDescription);
  }, [activityDescription]);
  

  return (
    <div className="flex gap-3">
      <Button onPress={!loading ? onOpen : undefined} color="primary" className="text-secondaryLight actionBtn">
        {loading ? <LoaderCircle/> : "Clique aqui"}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-secondaryLight">
                Iniciar Contador de Atividade
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  isRequired
                  isDisabled={isStarted ? true : false}
                  onChange={(e: any) =>
                    setSelectedActivity(String(e.target.value))
                  }
                  label="Atividade/Projeto"
                >
                  {customers ? (
                    customers.map((customersName: string) => {
                      return (
                        <AutocompleteItem key={customersName[0]}>
                          {customersName[0]}
                        </AutocompleteItem>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </Autocomplete>
                <Textarea
                  isRequired
                  label="Descrição da atividade"
                  onChange={(e: any) => {
                    setActivityDescription(String(e.target.value))
                  }
                  }
                  placeholder="Escreva a descrição"
                />
              </ModalBody>
              <ModalFooter>
                <div className={`time-display ${time[0]}`}>{time[1]}</div>
                {!isStarted ? (
                  <Button
                    color="primary"
                    className="text-secondaryLight"
                    onPress={() =>
                      handleButtonClick(selectedActivity, activityDescription)
                    }
                    isDisabled={selectedActivity==="" || activityDescription===""} 
                  >
                    Iniciar
                  </Button>
                ) : (
                  <Button
                    color="danger"
                    onPress={() =>
                      handleButtonClick(selectedActivity, activityDescription)
                    }
                  >
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
