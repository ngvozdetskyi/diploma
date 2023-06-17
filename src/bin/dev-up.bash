cat ./config/.env-dev > .env
docker-compose up --build -d
rm .env

echo Runing all migrations...
docker exec -it api knex migrate:latest

echo Runing seeds...
docker exec -it api knex seed:run

docker exec -it api sh
