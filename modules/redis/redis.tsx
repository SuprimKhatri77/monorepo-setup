import { CodeBlock } from "@/components/code-block";
import { InfoBox } from "@/components/info-block";
import {
  Database,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Package,
  Code,
  Terminal,
  Zap,
} from "lucide-react";

export default function RedisRateLimitingDocs() {
  return (
    <div className="min-h-screen bg-linear-to-br  dark:from-gray-950 dark:to-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-full mb-6">
            <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
              Redis Integration
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            Redis Rate Limiting Setup
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Complete guide to adding Redis-based rate limiting to your Express +
            tRPC + Next.js monorepo
          </p>
        </header>

        {/* Overview Section */}
        <section id="redis-overview" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Overview
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
              This guide will help you add Redis-based rate limiting to protect
              your authentication endpoints (login, signup, password reset) from
              brute force attacks and abuse.
            </p>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                What is Rate Limiting?
              </h3>
              <p className="text-blue-800 dark:text-blue-200">
                Rate limiting controls how many requests a user can make in a
                time window. For example: &quot;5 login attempts per 15
                minutes&quot;. It prevents attackers from trying thousands of
                passwords.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                What You&apos;ll Build
              </h3>
              <div className="grid gap-3">
                {[
                  "Shared Redis package (@repo/redis)",
                  "Rate limiting middleware for tRPC",
                  "Protection for login, signup, and password reset endpoints",
                  "Automatic blocking after too many failed attempts",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 mt-2" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prerequisites Section */}
        <section id="redis-prerequisites" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Prerequisites
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Your existing monorepo structure:
            </h3>
            <CodeBlock
              code={`root/
├── apps/
│   ├── web/          # Next.js frontend
│   └── server/       # Express backend
└── packages/
    └── api/          # tRPC routes & schemas`}
            />

            <div className="mt-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                    Important
                  </h4>
                  <p className="text-amber-800 dark:text-amber-200">
                    Make sure you have your auth system (login, signup, etc.)
                    already working before adding rate limiting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section id="redis-installation" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Installation
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                Step 1: Install Redis locally
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        macOS
                      </span>
                    </div>
                  </div>
                  <CodeBlock
                    code={`# Using Homebrew
brew install redis

# Start Redis server
redis-server`}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Windows/Linux (Docker)
                      </span>
                    </div>
                  </div>
                  <CodeBlock
                    code={`# Pull and run Redis container
docker run -d -p 6379:6379 --name redis redis:alpine

# Check if running
docker ps`}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 rounded-md">
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">
                        Verify Connection
                      </span>
                    </div>
                  </div>
                  <CodeBlock
                    code={`# Test connection
redis-cli ping
# Should respond: PONG`}
                  />
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                    For Production
                  </h4>
                  <p className="text-green-800 dark:text-green-200">
                    Use cloud Redis services like <strong>Upstash</strong> (free
                    tier: 10k requests/day) or <strong>Redis Cloud</strong>{" "}
                    (30MB free). Just change the connection URL in your
                    environment variables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Redis Package Section */}
        <section id="redis-create-package" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/30 flex items-center justify-center">
              <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create Redis Package
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Step 1: Create package folder",
                code: `# Create new package folder
mkdir -p packages/redis/src

# Navigate to it
cd packages/redis`,
                language: undefined,
              },
              {
                title: "Step 2: Initialize package.json",
                code: `{
  "name": "@repo/redis",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "dev": "tsc --watch"
  }
}`,
                language: "json",
              },
              {
                title: "Step 3: Install dependencies",
                code: `# Install ioredis (Redis client)
pnpm add ioredis --filter "@repo/redis"

# Install types
pnpm add -D @types/node typescript --filter "@repo/redis"`,
                language: undefined,
                note: {
                  title: "Why ioredis?",
                  content:
                    "ioredis is the most popular Redis client for Node.js with excellent TypeScript support. It&apos;s faster and more feature-rich than the official redis client.",
                },
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <CodeBlock code={step.code} language={step.language} />
                {step.note && (
                  <div className="mt-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 text-sm">
                      {step.note.title}
                    </h4>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      {step.note.content}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Step 4: Create Redis client (packages/redis/src/client.ts)
              </h3>
              <CodeBlock
                language="typescript"
                code={`import Redis from "ioredis";

// Store Redis connection globally (singleton pattern)
let redisConnection: Redis | null = null;

/**
 * Get or create Redis connection
 * Reuses the same connection across your app
 */
export function getRedisClient(): Redis {
  if (redisConnection) {
    return redisConnection;
  }

  // Create new connection
  redisConnection = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD,
    
    // Retry connection if it fails
    retryStrategy: (times) => {
      const delay = Math.min(times * 50, 2000);
      return delay;
    },
    
    lazyConnect: true, // Don&apos;t connect until we call .connect()
  });

  // Log errors
  redisConnection.on("error", (err) => {
    console.error("❌ Redis Error:", err);
  });

  // Log successful connection
  redisConnection.on("connect", () => {
    console.log("✅ Redis connected");
  });

  return redisConnection;
}

// Connect to Redis when server starts
export async function connectRedis(): Promise<void> {
  const client = getRedisClient();
  if (client.status !== "ready") {
    await client.connect();
  }
}

// Disconnect when server shuts down
export async function disconnectRedis(): Promise<void> {
  if (redisConnection) {
    await redisConnection.quit();
    redisConnection = null;
  }
}`}
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Step 5: Create rate limiter
                (packages/redis/src/services/rateLimiter.ts)
              </h3>
              <CodeBlock
                language="typescript"
                code={`import { Redis } from "ioredis";
import { getRedisClient } from "../client";

export interface RateLimitResult {
  allowed: boolean;    // Can user proceed?
  remaining: number;   // Attempts left
  resetAt: Date;       // When limit resets
  limit: number;       // Max attempts allowed
}

export interface RateLimitConfig {
  maxAttempts: number;           // e.g., 5 attempts
  windowSeconds: number;         // e.g., 900 (15 minutes)
  blockDurationSeconds?: number; // Block duration after exceeding
}

/**
 * FIXED WINDOW RATE LIMITER
 * Simple counter that resets after time window
 */
export async function checkFixedWindowRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const redis = getRedisClient();
  const { maxAttempts, windowSeconds } = config;
  const key = \`rate:\${identifier}\`;
  const now = Date.now();

  // INCR: Increment counter by 1
  // TTL: Get time until key expires
  const pipeline = redis.multi();
  pipeline.incr(key);
  pipeline.ttl(key);
  const results = await pipeline.exec();

  if (!results) throw new Error("Redis failed");

  const count = results[0][1] as number;
  const ttl = results[1][1] as number;

  // Set expiry on first request
  if (ttl === -1) {
    await redis.expire(key, windowSeconds);
  }

  const allowed = count <= maxAttempts;
  const remaining = Math.max(0, maxAttempts - count);
  const resetAt = new Date(
    now + (ttl > 0 ? ttl * 1000 : windowSeconds * 1000)
  );

  return { allowed, remaining, resetAt, limit: maxAttempts };
}

/**
 * BLOCK an identifier after too many attempts
 */
export async function blockIdentifier(
  identifier: string,
  durationSeconds: number
): Promise<void> {
  const redis = getRedisClient();
  const key = \`block:\${identifier}\`;
  await redis.setex(key, durationSeconds, "1");
}

/**
 * CHECK if identifier is blocked
 */
export async function isIdentifierBlocked(
  identifier: string
): Promise<boolean> {
  const redis = getRedisClient();
  const key = \`block:\${identifier}\`;
  const blocked = await redis.get(key);
  return blocked !== null;
}

/**
 * GET remaining block time
 */
export async function getBlockTimeRemaining(
  identifier: string
): Promise<number> {
  const redis = getRedisClient();
  const key = \`block:\${identifier}\`;
  const ttl = await redis.ttl(key);
  return ttl > 0 ? ttl : 0;
}`}
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Step 6: Export everything (packages/redis/src/index.ts)
              </h3>
              <CodeBlock
                language="typescript"
                code={`export { getRedisClient, connectRedis, disconnectRedis } from "./client";
export {
  checkFixedWindowRateLimit,
  blockIdentifier,
  isIdentifierBlocked,
  getBlockTimeRemaining,
} from "./services/rateLimiter";
export type { RateLimitResult, RateLimitConfig } from "./services/rateLimiter";`}
              />
            </div>
          </div>
        </section>

        {/* Implementation Section */}
        <section id="redis-implementation" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-950/30 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Implementation
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title:
                  "Step 1: Create rate limit middleware (packages/api/src/middleware/rateLimit.ts)",
                code: `import { TRPCError } from "@trpc/server";
import {
  checkFixedWindowRateLimit,
  isIdentifierBlocked,
  getBlockTimeRemaining,
  blockIdentifier,
  RateLimitConfig,
} from "@repo/redis";
import { Context } from "../context";

export interface RateLimitMiddlewareConfig extends RateLimitConfig {
  keyPrefix: string;    // e.g., "login", "signup"
  useEmail?: boolean;   // Rate limit by email (true) or IP (false)
}

/**
 * Check rate limit before processing request
 */
export async function checkRateLimit(
  ctx: Context,
  config: RateLimitMiddlewareConfig,
  email?: string
): Promise<void> {
  // Create unique identifier
  let identifier: string;
  
  if (config.useEmail && email) {
    identifier = \`\${config.keyPrefix}:email:\${email}\`;
  } else {
    const ip = ctx.req.ip || ctx.req.socket.remoteAddress || "unknown";
    identifier = \`\${config.keyPrefix}:ip:\${ip}\`;
  }

  // Check if blocked
  const blocked = await isIdentifierBlocked(identifier);
  if (blocked) {
    const remaining = await getBlockTimeRemaining(identifier);
    const minutes = Math.ceil(remaining / 60);
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: \`Too many attempts. Try again in \${minutes} minute\${minutes > 1 ? &apos;s&apos; : &apos;&apos;}.\`,
    });
  }

  // Check rate limit
  const result = await checkFixedWindowRateLimit(identifier, config);

  // Add headers
  ctx.res.setHeader("X-RateLimit-Limit", result.limit.toString());
  ctx.res.setHeader("X-RateLimit-Remaining", result.remaining.toString());
  ctx.res.setHeader("X-RateLimit-Reset", result.resetAt.toISOString());

  // Block if exceeded
  if (!result.allowed) {
    if (config.blockDurationSeconds) {
      await blockIdentifier(identifier, config.blockDurationSeconds);
    }
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: "Too many attempts. Please try again later.",
    });
  }
}`,
                language: "typescript",
              },
              {
                title: "Step 2: Add to your login service",
                code: `// packages/api/src/services/auth/signin.service.ts
import { checkRateLimit } from "../../middleware/rateLimit";

export async function signInUser(input: SigninInput, ctx: Context) {
  // Validate input first
  const validateFields = signinSchema.safeParse(input);
  if (!validateFields.success) {
    // Return validation errors
  }

  const { email, password } = validateFields.data;

  // ⭐ CHECK RATE LIMIT BEFORE LOGIN ATTEMPT
  try {
    await checkRateLimit(
      ctx,
      {
        keyPrefix: "login",          // Namespace
        maxAttempts: 5,              // 5 attempts
        windowSeconds: 900,          // per 15 minutes
        blockDurationSeconds: 1800,  // block 30 min after
        useEmail: true,              // Rate limit by email
      },
      email
    );
  } catch (error) {
    // Return rate limit error
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        inputs: { ...input },
      };
    }
    throw error;
  }

  // Proceed with login...
  // Your existing auth logic here
}`,
                language: "typescript",
              },
              {
                title:
                  "Step 3: Connect Redis in server startup (apps/server/src/index.ts)",
                code: `import { connectRedis, disconnectRedis } from "@repo/redis";

async function startServer() {
  // Connect to Redis before starting server
  console.log("🔄 Connecting to Redis...");
  await connectRedis();
  
  // ... your server setup
  
  app.listen(PORT, () => {
    console.log(\`🚀 Server on port \${PORT}\`);
  });
}

// Graceful shutdown
process.on("SIGINT", async () => {
  await disconnectRedis();
  process.exit(0);
});

startServer();`,
                language: "typescript",
              },
              {
                title: "Step 4: Add environment variables (apps/server/.env)",
                code: `# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
# REDIS_PASSWORD=your_password_if_needed`,
                language: undefined,
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <CodeBlock code={step.code} language={step.language} />
              </div>
            ))}
          </div>
        </section>

        {/* Usage Examples Section */}
        <section id="redis-usage" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-950/30 flex items-center justify-center">
              <Code className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Usage Examples
            </h2>
          </div>

          <div className="grid gap-6">
            {[
              {
                title: "Login (Strict limits)",
                code: `await checkRateLimit(ctx, {
  keyPrefix: "login",
  maxAttempts: 5,      // 5 attempts
  windowSeconds: 900,  // per 15 minutes
  blockDurationSeconds: 1800, // block 30 min
  useEmail: true,
}, email);`,
                color: "red",
              },
              {
                title: "Forgot Password (Prevent spam)",
                code: `await checkRateLimit(ctx, {
  keyPrefix: "forgot-password",
  maxAttempts: 3,      // 3 attempts
  windowSeconds: 3600, // per 1 hour
  blockDurationSeconds: 7200, // block 2 hours
  useEmail: true,
}, email);`,
                color: "orange",
              },
              {
                title: "Signup (Prevent bot accounts)",
                code: `await checkRateLimit(ctx, {
  keyPrefix: "signup",
  maxAttempts: 3,      // 3 signups
  windowSeconds: 3600, // per hour
  useEmail: false,     // Rate limit by IP
});`,
                color: "green",
              },
              {
                title: "Email Verification (Prevent code guessing)",
                code: `await checkRateLimit(ctx, {
  keyPrefix: "verify-email",
  maxAttempts: 5,     // 5 attempts
  windowSeconds: 600, // per 10 minutes
  useEmail: true,
}, email);`,
                color: "blue",
              },
            ].map((example, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-2 h-2 rounded-full bg-${example.color}-500`}
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {example.title}
                  </h3>
                </div>
                <CodeBlock language="typescript" code={example.code} />
              </div>
            ))}
          </div>
        </section>

        {/* Testing Section */}
        <section id="redis-testing" className="mb-20 scroll-mt-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-950/30 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Testing Rate Limits
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Test in Redis CLI
              </h3>
              <CodeBlock
                code={`# Open Redis CLI
redis-cli

# Check if rate limit key exists
GET rate:login:email:user@example.com

# See all rate limit keys
KEYS rate:*

# Check TTL (time until reset)
TTL rate:login:email:user@example.com

# Manually clear rate limit
DEL rate:login:email:user@example.com`}
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Test with curl
              </h3>
              <CodeBlock
                code={`# Try login 6 times to trigger rate limit
for i in {1..6}; do
  echo "Attempt $i"
  curl -X POST http://localhost:3000/api/trpc/signin \\
    -H "Content-Type: application/json" \\
    -d &apos;{"email":"test
    @example.com","password":"wrong"}&apos;
  echo "\\n"
done`}
              />
            </div>

            <InfoBox type="success" title="✅ Expected Behavior">
              After 5 attempts, you should see a <code>TOO_MANY_REQUESTS</code>{" "}
              error. Check response headers for{" "}
              <code>X-RateLimit-Remaining</code> to see attempts left.
            </InfoBox>
          </div>
        </section>

        {/* Pro Tips Section */}
        <section id="redis-tips" className="mb-16 scroll-mt-20">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            💡 Pro Tips
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Monitor Redis in real-time
              </h3>
              <CodeBlock
                code={`# Watch Redis commands as they execute
redis-cli monitor`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Check Redis memory usage
              </h3>
              <CodeBlock code={`redis-cli INFO memory`} />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Flush all rate limits (development only!)
              </h3>
              <CodeBlock
                code={`# Delete all keys matching pattern
redis-cli KEYS "rate:*" | xargs redis-cli DEL

# Or flush entire database (CAREFUL!)
redis-cli FLUSHDB`}
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                Add Redis package to other workspaces
              </h3>
              <CodeBlock
                code={`# Add to API package
pnpm add "@repo/redis@workspace:*" --filter "@repo/api"`}
              />
            </div>

            <InfoBox type="info" title="🚀 Production Tips">
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  Use <strong>Upstash</strong> for serverless Redis
                  (auto-scales)
                </li>
                <li>
                  Set <code>REDIS_PASSWORD</code> in production
                </li>
                <li>Monitor rate limit hits with logging</li>
                <li>Adjust limits based on real traffic patterns</li>
              </ul>
            </InfoBox>

            <InfoBox type="warning" title="⚠️ Common Mistakes">
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                  <strong>Don&apos;t rate limit GET requests</strong> (only
                  mutations)
                </li>
                <li>
                  <strong>Don&apos;t make limits too strict</strong> (frustrates
                  users)
                </li>
                <li>
                  <strong>Always use try-catch</strong> (handle Redis failures
                  gracefully)
                </li>
                <li>
                  <strong>Test rate limits thoroughly</strong> before deploying
                </li>
              </ul>
            </InfoBox>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            🎉 You&apos;ve successfully added Redis rate limiting to your
            monorepo!
          </p>
          <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-2">
            Next: Apply rate limiting to all your auth endpoints
          </p>
        </footer>
      </div>
    </div>
  );
}
