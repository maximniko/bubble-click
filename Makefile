up:
	docker compose -f ./docker-compose.yml up -d
down:
	docker compose -f ./docker-compose.yml down --remove-orphans
frontend-ng-init:
	docker compose -f ./docker-compose.yml run --rm node ng n frontend --directory ./
gh-pages:
	docker compose -f ./docker-compose.yml run --rm node ng build --configuration production --base-href https://maximniko.github.io/twa-ng/
	rm -fdr ./docs/*
	cp -r ./frontend/dist/frontend/browser/* docs
	git add ./docs/*