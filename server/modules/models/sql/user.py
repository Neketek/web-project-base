from modules.models.sql.base import Entity,BaseClass
from sqlalchemy import Column,Integer,String,ForeignKey,func,or_,and_,desc,asc
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger,Date,DateTime,Boolean,TIMESTAMP
from datetime import datetime
import hashlib
import uuid

class User(Entity,BaseClass):

    first_name = Column(String(128),nullable=False,default="")
    last_name = Column(String(128),nullable=False,default="")

    phone_id=Column(BigInteger(),ForeignKey("phone.id"),index=True,unique=True,nullable=True)
    email_id = Column(BigInteger(),ForeignKey("email.id"),index=True,unique=True,nullable=False)

    password_hash=Column(String(256),nullable=False)
    password_salt = Column(String(64),nullable=False)

    creation_date_time = Column(TIMESTAMP(),nullable=False,default=lambda:datetime.now())

    email = relationship("Email",back_populates="user",uselist=False)
    phone = relationship("Phone",back_populates="user",uselist=False)

    email_verification_token = relationship("UserEmailVerificationToken",back_populates="user",uselist=False)
    phone_verification_token = relationship("UserPhoneVerificationToken",back_populates="user",uselist=False)
    password_reset_token = relationship("UserPasswordResetToken",back_populates="user",uselist=False)


    def password_check(self,password):
        password_hash = User.hash_user_password(password,self.password_salt)
        return password_hash==self.password_hash

    @staticmethod
    def hash_user_password(self,password,salt=None):
        salt = uuid.uuid4().hex if salt is None else salt
        password_hash = hashlib.sha512(password + salt).hexdigest()
        return password_hash,salt
