#!/bin/bash

check_installations() {
    # Check for Node.js
    if ! command -v node >/dev/null 2>&1; then
        echo "Node.js is not installed. Installing Node.js via nvm..."
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        nvm install node || { echo "Node.js installation failed."; exit 1; }
    else
        echo "Node.js is already installed."
    fi

    # Check for npm
    if ! command -v npm >/dev/null 2>&1; then
        echo "npm is not installed. Installing npm..."
        npm install -g npm || { echo "npm installation failed."; exit 1; }
    else
        echo "npm is already installed."
    fi

    # Check for MongoDB
    if ! command -v mongo >/dev/null 2>&1; then
        echo "MongoDB is not installed. Installing MongoDB..."
        
        # Instructions for Ubuntu
        echo "Adding MongoDB repository..."
        wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
        echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/multiverse amd64 packages mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
        
        sudo apt-get update
        sudo apt-get install -y mongodb-org || { echo "MongoDB installation failed."; exit 1; }
        
        # Start MongoDB service
        sudo systemctl start mongod
        sudo systemctl enable mongod
        
        echo "MongoDB has been installed and started."
    else
        echo "MongoDB is already installed."
    fi

    # Check for Docker
    if ! command -v docker >/dev/null 2>&1; then
        echo "Docker is not installed. Installing Docker..."
        sudo apt-get update
        sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
        sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
        sudo apt-get update
        sudo apt-get install -y docker-ce || { echo "Docker installation failed."; exit 1; }
        
        # Add user to the docker group
        sudo usermod -aG docker $USER
        echo "Docker has been installed."
    else
        echo "Docker is already installed."
    fi

    echo "All prerequisites are installed. Proceeding to project installation..."
}

# Install dependencies for backend and frontend
install_dependencies() {
    # Backend installation
    echo "Installing backend dependencies..."
    cd backend || { echo "Backend directory not found."; exit 1; }
    npm install || { echo "Backend dependencies installation failed."; exit 1; }

    # Frontend installation
    echo "Installing frontend dependencies..."
    cd ../frontend || { echo "Frontend directory not found."; exit 1; }
    npm install || { echo "Frontend dependencies installation failed."; exit 1; }
}

# Start the backend and frontend
start_services() {
    cd ..
    docker-compose up --build
}

main() {
    check_installations
    install_dependencies
    start_services
    echo "The project is now running."
    echo "Backend accessible at http://localhost:3000"
    echo "Frontend accessible at http://localhost:4200"
}

main
