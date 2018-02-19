[![Build Status](https://travis-ci.org/FlockOfBirds/enum-switch.svg?branch=feature%2Finitial)](https://travis-ci.org/FlockOfBirds/enum-switch)
[![codecov](https://codecov.io/gh/flockofbirds/enum-switch/graph/badge.svg?/branch=feature/initial)](https://codecov.io/gh/flockofbirds/enum-switch)
![badge](https://img.shields.io/badge/mendix-7.11.0-green.svg)


# Enum Switch
Toggle an enumeration attribute.

## Features
* Deactivate when attribute or context is read-only
* Execute a microflow when toggled
* Display in various bootstrap styles
* Touch slide on click.
* Exclude Keys from the enumeration.

## Dependencies
Mendix 7.11

## Test project
https://enumswitch-main.mxapps.io

![Display](/assets/config_display_tab.PNG)

## Usage

### Data source configuration

![Data Source](/assets/config_dataSource_tab.PNG)

- Place the widget in the context of an object that has a enumeration.

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestion for improvement at https://github.com/FlockOfBirds/enum-switch/issues

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI.

To contribute, fork and clone.

    > git clone https://github.com/FlockOfBirds/enum-switch.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Changes to the widget code shall be automatically pushed to this test project.

[https://github.com/FlockOfBirds/enum-switch/releases](https://github.com/FlockOfBirds/enum-switch/releases/latest)

To automatically compile, bundle and push code changes to the running test project, run:

    > npm start

To run the project unit tests with code coverage, results can be found at `dist/testresults/coverage/index.html`, run:

    > npm run test:unit

Run the unit test continuously during development:

    > npm run test:dev

Run the end to end test during development:

    > npm run test:e2e:dev

## Scripts
While developing, you will probably rely mostly on `npm start`; however, there are additional scripts at your disposal:

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Build the project and monitor source and config for changes and rebuild.|
|`test`|Runs lint, build, unit tests with Karma and generates a coverage report, deploy and run e2e test|
|`test:dev`|Runs Karma and watches for changes to re-run tests; does not generate coverage reports.|
|`test:unit`|Runs unit tests with Karma and generates a coverage report.|
|`test:e2e`|Runs end 2 end tests with remote.|
|`test:e2e:dev`|Runs end 2 end tests with locally on localhost:8080|
|`deploy`|Use latest widget build to update the Mendix project update the application to Mendix node.|
|`build:prod`|Build widget optimized for production|
|`build:dev`|Build widget optimized for debugging.|
|`lint`|Lint all `.js` files.|
|`lint:fix`|Lint and fix all `.ts` files.|

# CI and remote testing
To enable the continues integration services.
Copy the `node_modules/mendix-widget-build-script/dist/localSettings.js`
 to your project root, and update the settings to run the update deployment from local source.

**Do not forget** to exclude this file in the `.gitignore` as it contains sensitive data.
```
exports.settings = {
    appName: "appName",
    key: "xxxxxxxx-xxxx-xxxx-xxxxx-xxxxxxxxxxxx",
    password: "secret",
    projectId: "xxxxxxxx-xxxx-xxxx-xxxxx-xxxxxxxxxxxx",
    user: "ci@example.com"
};
```

More information about the [Mendix widget build script](https://github.com/FlockOfBirds/mendix-widget-build-script).
