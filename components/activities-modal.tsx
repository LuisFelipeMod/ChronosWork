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

import { fetchSheets, setNextCell } from "./fetch-sheets";
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

  const userStorage = localStorage.getItem("user");
  const user = userStorage ? JSON.parse(userStorage) : null;
  const username = user.username;

  if (!isStarted && username) {
    setNextCell(username, "A", getDate());
    setNextCell(username, "B", getHours());
    setNextCell(username, "D", selectedActivity);
    setNextCell(username, "E", activityDescription);
    setNextCell(username, "F", username);
    return;
  }

  setNextCell(username, "C", getHours());
}

export default function ActivitiesModal(props:any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [selectedActivity, setSelectedActivity] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [customers, setCustomers] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(["", "texto"]);

  const btnLabel = props.btnLabel;

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
  

  return (
    <div className="flex gap-3">
      <Button onPress={!loading ? onOpen : undefined} color="primary" className="text-secondaryLight actionBtn">
        {loading ? <LoaderCircle className="loaderCircle"/> : btnLabel}
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
                  onInputChange={(e:string) =>
                    setSelectedActivity(e)
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