import configs from "~/configs";

const publicRoutes = [
    { name: "home", redirect: configs.routes.home },
    { name: "deposit", redirect: configs.routes.deposit },
    { name: "withdraw", redirect: configs.routes.withdraw },
    { name: "rewards", redirect: configs.routes.rewards },
    { name: "faq", redirect: configs.routes.faq },
];

export { publicRoutes };
