from modules.models.sql.base import Entity,BaseClass
from sqlalchemy import Column,Integer,String,ForeignKey,func,or_,and_,desc,asc
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger,Date,DateTime,Boolean,TIMESTAMP

class User(Entity,BaseClass):

    first_name = Column(String(128),nullable=False,default="")
    last_name = Column(String(128),nullable=False,default="")

    phone_id=Column(BigInteger(),ForeignKey("phone.id"),index=True,unique=True,nullable=True)
    email_id = Column(BigInteger(),ForeignKey("email.id"),index=True,unique=True,nullable=False)

    password=Column(String(256),nullable=False)

    email = relationship("Email",back_populates="users")
    phone=relationship("Phone",back_populates="users")
