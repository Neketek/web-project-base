from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BigInteger
from functools import wraps
from modules.models.sql.base.mixin.base.column import \
    base_column_mixin


@base_column_mixin
def UserSessionChildMixin():
    return dict(
        column=dict(
            type=BigInteger(),
            name='user_session_id'
        ),
        key=dict(
            location='user_session.id'
        )
    )
