#!/usr/bin/env python
from flask.ext.script import Manager
from app import app, db, Task

manager = Manager(app)

@manager.command
def reset():
    db.drop_all()
    db.create_all()

if __name__ == "__main__":
    manager.run()
