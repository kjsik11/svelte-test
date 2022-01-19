const ENVIRONMENT_VARIABLES = [] as const;

type EnvironmentVariable = typeof ENVIRONMENT_VARIABLES[number];

const convertEnv = (env: string | boolean) => {
  if (typeof env === 'string') return env;

  return '';
};

export const ENV = (envName: EnvironmentVariable) => convertEnv(import.meta.env[envName]);
