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
        trasaction: "/admin/transaction",
    },
} as const;

export default routes;
