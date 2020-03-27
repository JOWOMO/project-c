from sqlalchemy import *
from sqlalchemy.orm import (scoped_session, sessionmaker, relationship, backref)
from .connection import Base

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)

    firstname = Column(String)
    lastname = Column(String)

#    department_id = Column(Integer, ForeignKey('department.id'))
    # department = relationship(
    #     Department,
    #     backref=backref('employees',
    #                     uselist=True,
    #                     cascade='delete,all'))

class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True)
    ownerid = Column(Integer, ForeignKey('user.id'))

    name = Column(String)
