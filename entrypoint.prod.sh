#!/bin/sh

echo ".env utilisé : $NODE_ENV"

echo "🚀 Applying Prisma migrations (prod mode)..."
npx prisma migrate deploy

echo "🚀 Generating Prisma client..."
npx prisma generate

echo "🚀 Seeding database..."
npx prisma db seed || echo "⚠️ Database already seeded, skipping..."

echo "🚀 Starting the application..."
exec node dist/index.js
