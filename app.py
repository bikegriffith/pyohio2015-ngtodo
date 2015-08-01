import json, uuid
from flask import Flask, request, render_template, session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow



###
### Instantiate and configure app and extensions
### (NOTE: see cookiecutter-flask for a better pattern, and also look at Flask-Config)
###

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
app.config['SECRET_KEY'] = 'todo: set me from an env var'
db = SQLAlchemy(app)
ma = Marshmallow(app)


###
### SQLAlchemy Model
###

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.Text)
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
    tasks = Task.query.filter_by(user=session['uid']).all()
    return json.dumps([task_schema.dump(task)[0] for task in tasks])

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    task = Task.query.filter_by(user=session['uid'], id=id)
    task = task.update(request.get_json())
    db.session.commit()
    return json.dumps(task_schema.dump(task)[0])


###
### And of course, render some HTML
###

@app.route('/')
def index():
    if not session.get('uid'):
        session['uid'] = str(uuid.uuid4())
    # HACK: generate some fresh tasks for a new user for demo purposes
    if not Task.query.filter_by(user=session['uid']).all():
        db.session.add(Task(user=session['uid'], title='Write Outline', description='Evernote should be fine'))
        db.session.add(Task(user=session['uid'], title='Wireframe Page', description='Make ideas a bit more concreate for what we should build'))
        db.session.add(Task(user=session['uid'], title='Write API', description='Query tasks, update task at least'))
        db.session.add(Task(user=session['uid'], title='Wire up angular', description='Load a base template and bootstrap an ng-app'))
        db.session.add(Task(user=session['uid'], title='Live code', description="Don't screw it up, they're watching"))
        db.session.commit()
    return render_template('index.html')
