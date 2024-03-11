import os
from flask import Flask
from db_create import db, Order

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '').replace('postgres://', 'postgresql://') or \
    'postgresql://postgres:postgres@localhost:5432/mg_landingpage'

db.init_app(app)

# This line is not needed anymore since Order class is imported from db_create.py
# class Order(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     subject = db.Column(db.String(50))
#     age_group = db.Column(db.String(50))
#     skill_level = db.Column(db.String(50))
