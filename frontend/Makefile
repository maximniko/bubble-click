npm-start:
	docker compose -f ../docker-compose.yml exec node npm start
npm-install:
	docker compose -f ../docker-compose.yml run --rm node npm install
npm-build-prod:
	docker compose -f ../docker-compose.yml exec node ng b --configuration production
npm-build:
	docker compose -f ../docker-compose.yml run --rm node npm run build
ng-extract-i18n:
	docker compose -f ../docker-compose.yml run --rm node ng extract-i18n --output-path src/locale
