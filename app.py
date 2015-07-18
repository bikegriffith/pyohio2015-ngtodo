import os, json
from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'
db = SQLAlchemy(app)
ma = Marshmallow(app)


###
### Model
###

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    description = db.Column(db.Text)
    status = db.Column(db.Text, default='Unassigned')
    assigned_to = db.column(db.Text)


class TaskSchema(ma.ModelSchema):
    class Meta:
        model = Task


task_schema = TaskSchema()


###
### API
###

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tasks', methods=["GET"])
def tasks():
    tasks = Task.query.all()
    return json.dumps([task_schema.dump(task)[0] for task in tasks])

@app.route('/tasks/<int:id>', methods=["PUT"])
def update_task(id):
    task = Task.query.filter_by(id=id)
    task = task.update(request.get_json())
    db.session.commit()
    return json.dumps(task_schema.dump(task)[0])

if __name__ == '__main__':
    db.drop_all()
    db.create_all()
    db.session.add(Task(title='Write Outline', description='Evernote should be fine'))
    db.session.add(Task(title='Wireframe Page', description='Make ideas a bit more concreate for what we should build'))
    db.session.add(Task(title='Write API', description='Query tasks, update task at least'))
    db.session.add(Task(title='Wire up angular', description='Load a base template and bootstrap an ng-app'))
    db.session.add(Task(title='Live code', description="Don't screw it up, they're watching"))
    db.session.commit()

    app.run(debug=True)
