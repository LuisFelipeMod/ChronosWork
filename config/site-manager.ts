export type SiteConfig = typeof siteConfigManager;

export const siteConfigManager = {
  name: "ChronosWork",
  description: "Tornando a experiência de registrar atividades mais agradavel",
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
      label: "Atividades",
      href: "/",
    },
    {
      label: "Relatório",
      href: "/select-employee",
    },
  ]
};
