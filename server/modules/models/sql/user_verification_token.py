from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import BigInteger,DateTime,Boolean,TIMESTAMP
from modules.models.sql.base import BaseClass,Entity
from datetime import datetime
from sqlalchemy.ext.declarative import declared_attr

class UserVerificationTokenMixin(Entity):

    TOKEN_LIFESPAN = 15*60

    @declared_attr
    def user_id(cls):
        return Column(BigInteger(),ForeignKey('user.id'),nullable=False,index=True)

    token=Column(String(64),nullable=False)

    creation_date = Column(TIMESTAMP(),nullable=False)

    number_of_generations = Column(Integer(),nullable=False,default=1)

    verified = Column(Boolean(),nullable=False,default=False)



class UserEmailVerificationToken(UserVerificationTokenMixin,BaseClass):

    user = relationship("User",back_populates="email_verification_token")



class UserPhoneVerificationToken(UserVerificationTokenMixin,BaseClass):

    user = relationship("User",back_populates="phone_verification_token")



class UserPasswordResetToken(UserVerificationTokenMixin,BaseClass):

    user = relationship("User",back_populates="password_reset_token")
