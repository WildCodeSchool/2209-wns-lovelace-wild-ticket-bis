const { NODE_ENV } = process.env;

const IS_PRODUCTION = NODE_ENV === 'production';

const IS_DEVELOPEMENT = NODE_ENV === 'development';

export const WS_PROD = 'wss://staging.lovelace5.wns.wilders.dev/ws';

export const WS_DEV = 'ws://localhost:4000/ws';

export const URL_PROD = 'https://staging.lovelace5.wns.wilders.dev/';

export const URL_DEV = 'https://localhost:3000/';

export { NODE_ENV, IS_PRODUCTION, IS_DEVELOPEMENT };
