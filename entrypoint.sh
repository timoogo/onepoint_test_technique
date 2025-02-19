#!/bin/sh

echo "Starting prisma migration"

npx tsc 

npx prisma migrate dev

echo "Starting the server"

echo "Seeding database"

npx prisma db seed

echo "Database seeded successfully"

exec "$@"