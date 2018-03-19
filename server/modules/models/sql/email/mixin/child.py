from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BigInteger
from functools import wraps
from modules.models.sql.base.mixin.base.column import \
    base_column_mixin


@base_column_mixin()
def EmailChildMixin():
    return dict(
        column=dict(
            type=BigInteger(),
            name='email_id'
        ),
        key=dict(
            location='email.id'
        )
    )
