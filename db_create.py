from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', '').replace('postgres://', 'postgresql://') or \
    'postgresql://postgres:postgres@localhost:5432/mg_landingpage'

db = SQLAlchemy(app)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(50))
    age_group = db.Column(db.String(50))
    skill_level = db.Column(db.String(50))

if __name__ == '__main__':
    with app.app_context():
        # Reflect the database tables
        db.reflect()

        # Check if the 'Order' table exists
        if 'order' not in db.metadata.tables:
            # Table does not exist, create it
            db.create_all()
            print("Table 'Order' created successfully.")
        else:
            print("Table 'Order' already exists.")
