# Ref: https://github.com/vercel/next.js/tree/canary/examples/with-docker
# Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

RUN chown root:root -R /app/.next && \
  chown root:root -R /app/public



# Copy .next/static files to S3
FROM amazon/aws-cli
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION
ARG BUCKET_NAME

COPY --from=builder /app/.next/static ./.next/static
RUN if [[ "$BUCKET_NAME" ]] ; then aws s3 rm --recursive s3://$BUCKET_NAME/_next/static; else echo "SKIPPED remove the old static files on S3"; fi
RUN if [[ "$BUCKET_NAME" ]] ; then aws s3 cp --recursive --cache-control='public, max-age=0, immutable' \
  ./.next/static s3://$BUCKET_NAME/_next/static; else echo "SKIPPED copy static files to S3"; fi



# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Remove .env if existing
RUN rm -f .env

USER nextjs

EXPOSE 5000

ENV PORT 5000

CMD ["node", "server.js"]
