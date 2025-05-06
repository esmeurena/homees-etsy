#! bin/bash
cd ./backend

flask db downgrade
flask db migrate
flask db upgrade
flask seed all

gunicorn --bind 0.0.0.0:5000 app:app
