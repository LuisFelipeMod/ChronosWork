"use client";

import React, { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { fetchSheets } from "@/components/fetch-sheets";
import { useRouter } from "next/navigation";

export default function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchSheets("GET", `DevsLogin!A:C`, "")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar clientes:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedEmployee != ""){
      localStorage.setItem("selectedEmployee", selectedEmployee)
      router.push("/report")
    }
    return;
  }, [selectedEmployee]);
  
  return (
    <div className="flex items-center">
      <Modal backdrop="blur" isOpen={true} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Relatório de atividades
              </ModalHeader>
              <ModalBody>
                {users ? (
                  <Autocomplete
                    label="Selecione o colaborador"
                    onInputChange={(e: string) => setSelectedEmployee(e)}
                  >
                    {users.map((user, idx) => (
                      <AutocompleteItem key={idx}>{user[0]}</AutocompleteItem>
                    ))}
                  </Autocomplete>
                ) : (
                  <></>
                )}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
