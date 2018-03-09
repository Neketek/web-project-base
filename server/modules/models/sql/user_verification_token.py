from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import func
from sqlalchemy.types import BigInteger,DateTime,Boolean,TIMESTAMP
from modules.models.sql.base import BaseClass,Entity
from datetime import datetime,timedelta
from sqlalchemy.ext.declarative import declared_attr
import uuid

def token_generator(length):
    return lambda:uuid.uuid4().hex[:length]

class UserVerificationTokenMixin(Entity):

    TOKEN_LIFESPAN = 15*16
    TOKEN_LENGTH = 6
    
    def regenerate_token(self):
        self.token = token_generator(self.__class__.TOKEN_LENGTH)
        self.number_of_generations+=1

    def reset_token(self):
        self.number_of_generations = 0
        self.regenerate_token()

    def is_expired(self):
        return (datetime.now()-self.creation_date_time).seconds>=self.__class__.TOKEN_LIFESPAN

    @declared_attr
    def user_id(cls):
        return Column(BigInteger(),ForeignKey('user.id'),nullable=False,index=True)

    @declared_attr
    def token(cls):
        return Column(String(cls.TOKEN_LENGTH),nullable=False,default=token_generator(cls.TOKEN_LENGTH))

    creation_date_time = Column(TIMESTAMP(),nullable=False)

    number_of_generations = Column(Integer(),nullable=False,default=1)

    verified = Column(Boolean(),nullable=False,default=False)



class UserEmailVerificationToken(UserVerificationTokenMixin,BaseClass):

    user = relationship("User",back_populates="email_verification_token")



class UserPhoneVerificationToken(UserVerificationTokenMixin,BaseClass):

    user = relationship("User",back_populates="phone_verification_token")



class UserPasswordResetToken(UserVerificationTokenMixin,BaseClass):

    TOKEN_LENGTH = 12

    user = relationship("User",back_populates="password_reset_token")
