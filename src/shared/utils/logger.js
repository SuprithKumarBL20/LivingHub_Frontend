const isDev = import.meta.env.DEV;

export const logger = {
  info: (msg, ...args) => isDev && console.log(`[INFO] ${msg}`, ...args),
  warn: (msg, ...args) => isDev && console.warn(`[WARN] ${msg}`, ...args),
  error: (msg, ...args) => console.error(`[ERROR] ${msg}`, ...args)
};
