# 𓃠 Kemetly — Where Ancient Meets Eternal

Kemetly is a comprehensive Django-based web application designed to connect curious travelers with the eternal legacy of Egypt. It serves as a modern tourism platform, allowing users to explore historical landmarks, book luxury hotels, and discover authentic restaurants.

## 🚀 Project Overview

The project is built using the **Django MVT (Model-View-Template)** architecture, ensuring a clean separation of concerns between data handling, business logic, and user interface. Kemetly focuses on high performance, clean code, and a seamless user experience.

## ✨ Key Features

*   **Dynamic Exploration Engine:** A robust search and filtering system using Django's `Q objects` to query landmarks, hotels, and restaurants based on multiple parameters.
*   **Optimized Database Queries:** Utilization of `select_related` and `prefetch_related` to minimize database hits and ensure fast page loading times.
*   **Modular Template Architecture:** Implementation of the **DRY (Don't Repeat Yourself)** principle using Django Template Inheritance (`base.html`) and partial components for scalable UI management.
*   **Automated Content Management:** Customized Django Admin panel using `TabularInline` for efficient and integrated media management (e.g., uploading multiple images for a single place simultaneously).
*   **SEO-Friendly URLs:** Auto-generated URL slugs for destinations to improve search engine visibility and user routing.
*   **Pagination:** Built-in Django paginator to handle large datasets seamlessly on the frontend.

## 🛠️ Tech Stack

*   **Backend:** Python, Django 5.x
*   **Database:** SQLite (Development)
*   **Frontend:** HTML5, CSS3, Vanilla JavaScript, Django Template Language (DTL)
*   **Architecture:** MVT (Model-View-Template)

## 📁 Project Structure

The project follows a clean, app-based architecture:
*   `myproject/`: Core configurations and root URL routing.
*   `places/`: The core engine handling database models, dynamic views, and specific templates for destinations.
*   `pages/`: Manages static pages like Home and About Us.
*   `static/`: Global CSS, JavaScript, and image assets.
*   `templates/`: Centralized HTML templates featuring the master layout and partials.

## ⚙️ Local Setup & Installation

To run this project locally on your machine, follow these steps:

1. Clone the repository:
   git clone [https://github.com/eya805/duck_code.git](https://github.com/eya805/duck_code.git)
   cd duck_code

2. Create and activate the virtual environment :
  python -m venv venv
  source venv/bin/activate  # On Windows use: venv\Scripts\activate

3. Installing Framework :
  pip install django
4. Make and migrate the database :
  python manage.py makemigrations
  python manage.py migrate
5. Create superuser (Admin) :
  python manage.py createsuperuser
6. Run the development server : 
  python manage.py runserver

** Website Link :
http://127.0.0.1:8000/
** Admin Panel:
http://127.0.0.1:8000/admin/
