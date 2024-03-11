import os
from flask import Flask
from db_create import db, Order

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '').replace('postgres://', 'postgresql://') or \
    'postgresql://postgres:postgres@localhost:5432/mg_landingpage'

print("")
print("SQLALCHEMY_DATABASE_URI: ", app.config['SQLALCHEMY_DATABASE_URI'])
print("")

db.init_app(app)