import configs from "~/configs";
import { HomeIcon, TransactionIcon } from "~/components/Icons";

const publicRoutes = [
    { name: "home", redirect: configs.routes.home },
    { name: "deposit", redirect: configs.routes.deposit },
    { name: "withdraw", redirect: configs.routes.withdraw },
    { name: "rewards", redirect: configs.routes.rewards },
    { name: "about", redirect: configs.routes.about },
    { name: "faq", redirect: configs.routes.faq },
];

const privateRoutes = [
    { name: "Home", redirect: configs.routes.private.home, Icon: HomeIcon },
    { name: "Manager", redirect: configs.routes.private.manager, Icon: TransactionIcon },
];
export { publicRoutes, privateRoutes };
