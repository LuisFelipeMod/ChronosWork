export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ChronosWork",
  description: "Tornando a experiência de registrar atividades mais agradável",
  navItems: [
    {
      label: "Atividades",
      href: "/",
    },
    {
      label: "Relatório",
      href: "/report",
    },
  ],
  navMenuItems: [
    {
      label: "Atividades",
      href: "/",
    },
    {
      label: "Relatório",
      href: "/select-employee",
    },
  ]
};
