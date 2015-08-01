#!/usr/bin/env python
from flask.ext.script import Manager
from app import app, db, Task

manager = Manager(app)

@manager.command
def migrate():
    # Note to all readers: use Alembic to manage your DB when doing this for realsies
    db.drop_all()
    db.create_all()
    db.session.add(Task(title='Write Outline', description='Evernote should be fine'))
    db.session.add(Task(title='Wireframe Page', description='Make ideas a bit more concreate for what we should build'))
    db.session.add(Task(title='Write API', description='Query tasks, update task at least'))
    db.session.add(Task(title='Wire up angular', description='Load a base template and bootstrap an ng-app'))
    db.session.add(Task(title='Live code', description="Don't screw it up, they're watching"))
    db.session.commit()

if __name__ == "__main__":
    manager.run()
