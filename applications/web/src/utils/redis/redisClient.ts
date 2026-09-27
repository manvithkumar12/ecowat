type RedisSetOptions = {
  EX?: number;
  NX?: boolean;
};

type RedisResponse<T> = {
  result: T;
  error?: string;
};

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
  throw new Error(
    "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are not configured",
  );
}

const redisEndpoint = redisUrl;
const redisAuthToken = redisToken;

async function execute<T>(command: string[]): Promise<T> {
  const response = await fetch(redisEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisAuthToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  const data = (await response.json()) as RedisResponse<T>;

  if (!response.ok || data.error) {
    throw new Error(
      data.error || `Upstash Redis request failed: ${response.status}`,
    );
  }

  return data.result;
}

export const redis = {
  get: (key: string) => execute<string | null>(["GET", key]),

  set: (key: string, value: string, options?: RedisSetOptions) => {
    const command = ["SET", key, value];

    if (options?.NX) command.push("NX");
    if (options?.EX) command.push("EX", String(options.EX));

    return execute<string | null>(command);
  },

  del: (key: string) => execute<number>(["DEL", key]),
};
