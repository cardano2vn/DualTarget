const routes = {
    home: "/",
    deposit: "/deposit",
    withdraw: "/withdraw",
    rewards: "/delegation-rewards",
    faq: "/faq",
    about: "/about",
    term: "/term",

    private: {
        home: "/admin",
        manager: "/admin/manager",
    },
} as const;

export default routes;
