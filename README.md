# Person Detections

As part of our study program, we have developed a web interface as well as a script capable of returning different files, namely:

- an image from one of the cameras
- a configuration file containing the maximum number of authorized persons
- an audio file in the selected language

The objective of this project is to guarantee compliance with the maximum number of authorized persons, particularly in times of health crisis.

## Installation

Create an .env file by filling it like the .env.example file with your Microsoft Azure information
Run the following commands:

```bash
npm i
```

You can add photos in the resources/ folder to test the script

## Launching the web interface

To launch the web interface, start by running the following commands:

```bash
yarn run build
yarn run start-app-prod
```

You can now go to your browser at the address: `http://localhost:8000/` and enter the required information there.

## Launching the script

On a new terminal, run the script using the following command.

```bash
yarn run start-script-prod <imagePath> <configPath> <audioFilePath | audioFilePath  audioFilePath2  ...>
```

## Authors

This project is made by Kyrraaa and myself
