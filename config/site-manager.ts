export type SiteConfig = typeof siteConfigManager;

export const siteConfigManager = {
  name: "ChronosWork",
  description: "Tornando a experiência de registrar atividades mais agradável",
  navItems: [
    {
      label: "Atividades",
      href: "/",
    },
    {
      label: "Relatório",
      href: "/select-employee",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ]
};
