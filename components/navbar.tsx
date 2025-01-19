"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { siteConfigManager } from "@/config/site-manager";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
  LogoMobile,
} from "@/components/icons";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    const storageIsManager = localStorage.getItem("isManager") == "Sim";

    setIsManager(storageIsManager);
  }, []);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent justify="start" className="md:hidden">
        <NavbarMenuToggle icon={<Menu/>} />
      </NavbarContent>
      <NavbarContent className="basis-1/5 sm:basis-full max-md:hidden" justify="start">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {isManager
            ? siteConfigManager.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      "data-[active=true]:text-primary data-[active=true]:font-medium text-secondaryLight"
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))
            : siteConfig.navItems.map((item) => (
                <NavbarItem key={item.href}>
                  <NextLink
                    className={clsx(
                      "data-[active=true]:text-primary data-[active=true]:font-medium text-secondaryLight"
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarItem>
              ))}
        </ul>
      </NavbarContent>

      <NavbarMenu className="navbar-menu">
        {isManager
          ? siteConfigManager.navItems.map((item) => (
              <NavbarMenuItem key={item.href}>
                <NextLink
                  className={clsx(
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-secondaryLight"
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarMenuItem>
            ))
          : siteConfig.navItems.map((item) => (
              <NavbarMenuItem key={item.href}>
                <NextLink
                  className={clsx(
                    "data-[active=true]:text-primary data-[active=true]:font-medium text-secondaryLight"
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarMenuItem>
            ))}
      </NavbarMenu>

      <NavbarContent justify="center">
        <NavbarBrand as="li" className="gap-3 max-w-fit flex items-center">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <LogoMobile />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`} className="bg-content1 rounded-md">
              <Link href={item.href} size="lg" className="text-foreground w-full h-full p-2">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
