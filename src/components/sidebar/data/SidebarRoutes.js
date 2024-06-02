import RequestRespond from "../../pages/RequestRespond";

const SidebarRoutes = [
  {
    path: "/",
    exact: true,
    main: () => <RequestRespond />,
  },
];

export default SidebarRoutes;
