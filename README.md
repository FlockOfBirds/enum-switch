[![Build Status](https://travis-ci.org/FlockOfBirds/enum-switch.svg?branch=feature%2Finitial)](https://travis-ci.org/FlockOfBirds/enum-switch)
[![codecov](https://codecov.io/gh/flockofbirds/enum-switch/graph/badge.svg?/branch=feature/initial)](https://codecov.io/gh/flockofbirds/enum-switch)
![badge](https://img.shields.io/badge/mendix-7.10.0-green.svg)
[![Percentage of issues still open](http://isitmaintained.com/badge/open/FlockOfBirds/enum-switch.svg)](http://isitmaintained.com/project/FlockOfBirds/enum-switch "Percentage of issues still open")

# Enum Switch
Toggle an enumeration attribute.

## Features
* Deactivate when attribute or context is read-only
* Execute a microflow when toggled
* Display in various bootstrap styles
* Touch slide on click.
* Exclude Keys from the enumeration.

## Dependencies
Mendix 7.10

## Test project
https://enumswitch-main.mxapps.io

![Data Source](/assets/config_dataSource_tab.PNG)
![Display](/assets/config_display_tab.PNG)

## Usage
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

    > grunt
