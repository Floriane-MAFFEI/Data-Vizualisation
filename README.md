# Data-Vizualisation Project Deployment

This README provides three differents installation methods for the project.

## Table of Contents

- [Script](#script) => **Recommanded**
- [Manual Installation](#manual-installation)
- [Docker Implementation](#docker-implementation)

## Project Structure

The project consists of two main parts:

- **Backend** : Developed in **NestJS** and a database in **MongoDB**
- **Frontend** : Developed in **Angular**

## Prerequisites

Before starting the deployment, ensure you have the following installed:

- **Git** : To clone the repository.
- **A terminal** : To execute commands.

## Clone the Repository

To get started, clone the repository using the following command:

```
git clone git@github.com:Floriane-MAFFEI/Data-Vizualisation.git
```
then

```cd Data-Vizualisation```

## Script

### Run the Installation Script

Once the clone the repository, going in the project directory:

Execute the script:
```./install.sh```

**If you encounter execution issues** :
 Make the script executable : ```chmod +x install.sh```.

The script will check if Node.js, npm, MongoDB and Docker are installed. If they are not, the script will attempt to install them automatically.

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


## Docker Implementation

1. To get started, clone the repository using the following command:
```
git clone git@github.com:Floriane-MAFFEI/Data-Vizualisation.git
```

2. then go to the project folder :
```cd Data-Vizualisation```

3.Install the dependencies:
```npm install``` in the 2 folders (backend and frontend)

4. Return to the root of the project

5. Build and start the containers by running the following command:
```docker-compose up --build```

## Access

The backend will be accessible at http://localhost:3000 (or the port you configured).

The frontend will be accessible at http://localhost:4200.

### Conclusion

For any questions or issues, feel free to consult the documentation for NestJS, Angular, or MongoDB.

