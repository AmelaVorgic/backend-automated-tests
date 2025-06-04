# backend-automated-tests

[![Daily E2E Tests Run](https://github.com/AmelaVorgic/backend-automated-tests/actions/workflows/scheduled-run.yml/badge.svg)](https://github.com/AmelaVorgic/backend-automated-tests/actions/workflows/scheduled-run.yml)

This repository contains automated API tests using [Playwright](https://playwright.dev/) for the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) fake API.  
It demonstrates testing REST API endpoints (GET, POST, PUT, DELETE) and uses an **API Object Model** for maintainable test code.

To test, clone this repository locally and run

```npx playwright test```