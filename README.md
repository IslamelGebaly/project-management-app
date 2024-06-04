#Project Management App
=====================================

##Introduction
An application made to help its users plan their projects. The users can include multiple tasks in their projects, view their projects' status, set due dates and assign tasks to users.

##Features
- Sorting projects
- Filtering projects by name and status
- View tasks inside individual projects
- Creating, updating and deleting projects
- Viewing all tasks and projects in a table

##Technologies
- Php Laravel
- React js
- Tailwind
- SQLite

##Installation
1. Clone the project
2. Navigate to the project's root directory using terminal
3. Create .env file - cp .env.example .env
4. Execute composer install
5. Execute npm install
6. Set application key - php artisan key:generate --ansi
7. Execute migrations and seed data - php artisan migrate --seed
8. Start vite server - npm run dev
9. Start Artisan server - php artisan serve 