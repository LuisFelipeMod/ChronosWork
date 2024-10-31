"use client";

import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Registre</span>
        <span className={title({ color: "blue" })}> suas atividades</span>
        <br />
        <span className={title()}>aqui</span>
      </div>

      <div className="flex gap-3">
        <Button onPress={onOpen} color="primary">
          Open Modal
        </Button>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Log in
                </ModalHeader>
                <ModalBody>
                  <Input
                    autoFocus

                    label="Email"
                    placeholder="Enter your email"
                    variant="bordered"
                  />
                  <Input
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                    >
                      Remember me
                    </Checkbox>
                    <Link color="primary" href="#" size="sm">
                      Forgot password?
                    </Link>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Sign in
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
}
