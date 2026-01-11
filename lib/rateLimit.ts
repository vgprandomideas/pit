import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./cache";

export const rateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(60, "1 m"), // 60 req/min per IP
    })
  : null;
