#!/bin/sh

echo ".env utilisé : $NODE_ENV"

echo "Starting prisma migration"

npx tsc 

npx prisma migrate dev

echo "Starting the server"

echo "Seeding database"

npx prisma generate

npx prisma db seed

echo "Database seeded successfully"

exec "$@"