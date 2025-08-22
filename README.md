# Rick and Morty API

## Features

- Search for Locations / List Dimensions -> Show all characters from location paginated in form of a card
- Search for Episodes / List Episodes -> Show all characters from episodes paginated in form of a card
- Search for Dimensions / List Dimensions -> Show all characters from dimensions paginated in form of a card
- Search for Characters / List Characters -> Show all characters paginated in form of a card
- Individual page of Character from list of Characters
- Error handling for API requests (snackbar notifications)

## Development server

To start a local development server, run:

```bash
npm install
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run `ng serve` and in separate window:

```bash
cypress run
```
