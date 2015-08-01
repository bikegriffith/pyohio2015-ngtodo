import json
from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow



###
### Instantiate and configure app and extensions
### (NOTE: see cookiecutter-flask for a better pattern, and also look at Flask-Config)
###

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)


###
### SQLAlchemy Model
###

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    description = db.Column(db.Text)
    status = db.Column(db.Text, default='Unassigned')
    assigned_to = db.column(db.Text)


###
### Model Serializer
###


class TaskSchema(ma.ModelSchema):
    class Meta:
        model = Task


task_schema = TaskSchema()


###
### Our JSON API (use something like Flask-RESTful in production, please)
###

@app.route('/tasks', methods=['GET'])
def tasks():
    tasks = Task.query.all()
    return json.dumps([task_schema.dump(task)[0] for task in tasks])

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.filter_by(id=id)
    task = task.update(request.get_json())
    db.session.commit()
    return json.dumps(task_schema.dump(task)[0])


###
### And of course, render some HTML
###

@app.route('/')
def index():
    return render_template('index.html')
