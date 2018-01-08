# Enum Switch
Toggle an enumeration attribute.

## Features
* Deactivate when attribute or context is read-only
* Execute a microflow when toggled
* Display in various bootstrap styles
* Touch slide on click.

## Dependencies
Mendix 7.6

## Test project
https://enumswitch-main.mxapps.io

## Usage
- Place the widget in the context of an object that has a enumeration.

![config_dataSource_tab](/assets/config_dataSource_tab.png)
![config_display_tab](/assets/config_display_tab.png)

## Issues, suggestions and feature requests
We are actively maintaining this widget, please report any issues or suggestion for improvement at https://github.com/SamuelMuloki/EnumSwitch/issues

## Development
Prerequisite: Install git, node package manager, webpack CLI, grunt CLI.

To contribute, fork and clone.

    > git clone https://github.com/SamuelMuloki/EnumSwitch.git

The code is in typescript. Use a typescript IDE of your choice, like Visual Studio Code or WebStorm.

To set up the development environment, run:

    > npm install

Create a folder named `dist` in the project root.

Create a Mendix test project in the dist folder and rename its root folder to `dist/MxTestProject`. Changes to the widget code shall be automatically pushed to this test project.

[https://github.com/SamuelMuloki/EnumSwitch/releases](https://github.com/SamuelMuloki/EnumSwitch/releases/latest)

To automatically compile, bundle and push code changes to the running test project, run:

    > grunt
