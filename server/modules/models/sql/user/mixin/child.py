from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BigInteger
from functools import wraps
from modules.models.sql.base.mixin.base.column import \
    base_column_mixin


@base_column_mixin()
def UserChildMixin():
    return dict(
        column=dict(
            type=BigInteger(),
            name='user_id'
        ),
        key=dict(
            location='user.id'
        )
    )
