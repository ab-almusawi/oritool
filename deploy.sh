#!/bin/bash

# Oritool Deployment Script
# This script helps deploy or update Oritool on your VPS

set -e  # Exit on error

echo "🚀 Oritool Deployment Script"
echo "=============================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/var/www/oritool"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# Function to print colored messages
print_message() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if running as correct user
if [ "$EUID" -eq 0 ]; then 
    print_error "Please don't run this script as root. Use a regular user with sudo privileges."
    exit 1
fi

# Main deployment function
deploy() {
    print_step "Starting deployment..."
    
    # Navigate to project directory
    cd "$PROJECT_DIR" || exit 1
    
    # Pull latest changes (if using git)
    if [ -d ".git" ]; then
        print_step "Pulling latest changes from git..."
        git pull
    else
        print_message "Not a git repository. Skipping git pull."
    fi
    
    # Deploy backend
    print_step "Deploying backend..."
    cd "$BACKEND_DIR"
    
    print_message "Installing backend dependencies..."
    npm install --production=false
    
    print_message "Building backend..."
    npm run build
    
    print_message "Running database migrations (if any)..."
    # npm run typeorm:run-migrations || true
    
    print_message "Restarting backend with PM2..."
    pm2 restart oritool-backend || pm2 start dist/main.js --name oritool-backend
    
    # Deploy frontend
    print_step "Deploying frontend..."
    cd "$FRONTEND_DIR"
    
    print_message "Installing frontend dependencies..."
    npm install
    
    print_message "Building frontend..."
    npm run build
    
    # Reload Nginx
    print_step "Reloading Nginx..."
    sudo systemctl reload nginx
    
    # Show status
    print_step "Deployment Status:"
    pm2 status
    
    print_message "✅ Deployment completed successfully!"
    print_message "Your site is live at: https://oritool.com"
}

# Backup function
backup() {
    print_step "Creating backup..."
    
    BACKUP_DIR="/backup/oritool"
    DATE=$(date +%Y%m%d_%H%M%S)
    
    sudo mkdir -p "$BACKUP_DIR"
    
    print_message "Backing up database..."
    sudo -u postgres pg_dump oritool > "$BACKUP_DIR/db_$DATE.sql"
    
    print_message "Backing up uploads..."
    tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" "$BACKEND_DIR/uploads"
    
    print_message "✅ Backup completed: $BACKUP_DIR"
    ls -lh "$BACKUP_DIR"
}

# Logs function
logs() {
    print_step "Showing backend logs (Ctrl+C to exit)..."
    pm2 logs oritool-backend
}

# Status function
status() {
    print_step "System Status:"
    echo ""
    
    print_message "PM2 Processes:"
    pm2 status
    echo ""
    
    print_message "Nginx Status:"
    sudo systemctl status nginx --no-pager | head -n 10
    echo ""
    
    print_message "PostgreSQL Status:"
    sudo systemctl status postgresql --no-pager | head -n 10
    echo ""
    
    print_message "Disk Usage:"
    df -h /var/www/oritool
    echo ""
    
    print_message "Memory Usage:"
    free -h
}

# Restart function
restart() {
    print_step "Restarting all services..."
    
    print_message "Restarting backend..."
    pm2 restart oritool-backend
    
    print_message "Reloading Nginx..."
    sudo systemctl reload nginx
    
    print_message "✅ All services restarted!"
}

# Show usage
usage() {
    echo "Usage: $0 {deploy|backup|logs|status|restart}"
    echo ""
    echo "Commands:"
    echo "  deploy  - Deploy/update the application"
    echo "  backup  - Create a backup of database and uploads"
    echo "  logs    - Show backend logs"
    echo "  status  - Show system status"
    echo "  restart - Restart all services"
    echo ""
    exit 1
}

# Main script logic
case "$1" in
    deploy)
        deploy
        ;;
    backup)
        backup
        ;;
    logs)
        logs
        ;;
    status)
        status
        ;;
    restart)
        restart
        ;;
    *)
        usage
        ;;
esac

