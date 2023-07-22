const { NODE_ENV } = process.env;

const IS_PRODUCTION = NODE_ENV === 'production';

const IS_DEVELOPEMENT = NODE_ENV === 'development';

export const WS_DEV = 'ws://localhost:4000/ws';

export const URL_DEV = 'http://localhost:3000/';

export { NODE_ENV, IS_PRODUCTION, IS_DEVELOPEMENT };
