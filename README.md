# Project Deployment

This README provides two different installation methods for the project while awaiting the Docker implementation.

## Table of Contents

- [On Linux (script)](#on-linux-script)
- [Manual Installation](#manual-installation)

## Project Structure

The project consists of two main parts:

- **Backend** : Developed in **NestJS**
- **Frontend** : Developed in **Angular**

## Prerequisites

Before starting the deployment, ensure you have the following installed:

- **Git** : To clone the repository.
- **Un terminal** : To execute commands.

## Clone the Repository

To get started, clone the repository using the following command:

```
git clone git@github.com:Floriane-MAFFEI/Data-Vizualisation.git
```
then

```cd Data-Vizualisation```

## On Linux (script)

### Run the Installation Script

Once in the project directory:

Execute the script:
```./install.sh```


**If you encounter execution issues** :
 Make the script executable : ```chmod +x install.sh```.

The script will check if Node.js, npm, and MongoDB are installed. If they are not, the script will attempt to install them automatically.


## Manual Installation

## Backend - NestJS

### Installation

1. Navigate to the backend folder:
```cd backend```


2. Install the dependencies:
```npm install```

### Starting the Backend

To start the backend, run:
```npm run start```


## Frontend - Angular

### Installation

1. Navigate to the frontend folder:
```cd frontend```

2. Install the dependencies:
```npm install```

### Starting the Frontend

To start the frontend, run:
```ng serve```


---

## Docker Implementation

Docker implementation is in progress. Docker images and files will be provided soon to simplify deployment and dependency management.

---

## Access

The backend will be accessible at http://localhost:3000 (or the port you configured).

The frontend will be accessible at http://localhost:4200.

### Conclusion

For any questions or issues, feel free to consult the documentation for NestJS, Angular, or MongoDB.

