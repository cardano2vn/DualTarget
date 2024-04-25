import routes from "./routes";
import wallets from "./wallets";

const configs = {
    routes: routes,
    wallets: wallets,
} as const;

export default configs;
