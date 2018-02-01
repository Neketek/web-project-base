from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger,Date,Boolean
from modules.models.sql.base import Entity,BaseClass

class Email(Entity,BaseClass):

    email = Column(String(128),unique=True,index=True)

    users=relationship("User",back_populates="email",uselist=False)
