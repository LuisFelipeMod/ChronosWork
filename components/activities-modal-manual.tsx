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
  DateInput,
  TimeInput,
} from "@nextui-org/react";

import { useState, useEffect } from "react";

import { fetchSheets, setNextCell } from "./fetch-sheets";
import { LoaderCircle, MousePointer2 } from "lucide-react";

import { parseAbsoluteToLocal, Time } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

interface Data {
  data: {
    customers: string[][] | null | undefined;
  };
}

async function addNewRow(
  date: any,
  initialHours: any,
  finalHours: any,
  selectedActivity: any,
  activityDescription: any
) {
  const user = String(localStorage.getItem("user"));

  const getDate = (date: any) => {
    const formattedDate = String(date.day + "/" + date.month + "/" + date.year);

    return formattedDate;
  };

  const getHours = (hours: any) => {
    const hour = String(hours.hour).padStart(2, "0");
    const minute = String(hours.minute).padStart(2, "0");
    const formatedHours = `${hour}:${minute}`;

    return formatedHours;
  };

  if (user) {
    setNextCell(user, "A", getDate(date));
    setNextCell(user, "B", getHours(initialHours));
    setNextCell(user, "C", getHours(finalHours));
    setNextCell(user, "D", selectedActivity);
    setNextCell(user, "E", activityDescription);
    setNextCell(user, "F", user);

    return;
  }
}

export default function ActivitiesModalManual(props: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [date, setDate] = useState(
    parseAbsoluteToLocal("2025-01-01T12:00:00Z")
  );
  const [initialHours, setInitialHours] = useState(
    parseAbsoluteToLocal("2025-01-01T12:00:00Z")
  );
  const [finalHours, setFinalHours] = useState(
    parseAbsoluteToLocal("2025-01-01T12:00:00Z")
  );
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

  return (
    <div className="flex gap-3">
      <Button
        onPress={!loading ? onOpen : undefined}
        color="primary"
        className="text-secondaryLight actionBtn"
      >
        {loading ? <LoaderCircle className="loaderCircle" /> : btnLabel}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-secondaryLight">
                Cadastrar atividade manualmente
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <I18nProvider locale="pt-br">
                    <DateInput
                      isRequired
                      label="Data"
                      granularity="day"
                      value={date}
                      onChange={setDate}
                    />
                  </I18nProvider>
                </div>
                <TimeInput
                  isRequired
                  hideTimeZone
                  hourCycle={24}
                  label="Horário Inicial"
                  value={initialHours}
                  onChange={setInitialHours}
                />
                <TimeInput
                  isRequired
                  hideTimeZone
                  hourCycle={24}
                  label="Horário Final"
                  value={finalHours}
                  onChange={setFinalHours}
                />
                <Autocomplete
                  isRequired
                  isDisabled={isStarted ? true : false}
                  onInputChange={(e: string) => setSelectedActivity(e)}
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
                    setActivityDescription(String(e.target.value));
                  }}
                  placeholder="Escreva a descrição"
                />
              </ModalBody>
              <ModalFooter>
                <div className={`time-display ${time[0]}`}>{time[1]}</div>
                <Button
                  color="primary"
                  className="text-secondaryLight"
                  onPressStart={() =>
                    addNewRow(
                      date,
                      initialHours,
                      finalHours,
                      selectedActivity,
                      activityDescription
                    )
                  }
                  onPressEnd={onClose}
                >
                  Cadastrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
