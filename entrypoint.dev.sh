#!/bin/sh

echo ".env utilisé : $NODE_ENV"

echo "Starting prisma migration"

npx prisma generate

npx tsc

npx prisma migrate dev

echo "Seeding database"

npx prisma db seed

echo "Database seeded successfully"

echo "Starting the server"

exec "$@"