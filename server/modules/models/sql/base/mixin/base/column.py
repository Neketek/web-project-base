from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.types import BigInteger
from functools import wraps
from sqlalchemy.orm import relationship


def base_column_mixin(*extensions):
    def extensions_wrapper(props_generator):
        @wraps(props_generator)
        def wrapper(column={}, key={}):

            kwargs = props_generator()
            key = {**key, **kwargs.get('key', {})}
            column = {**column, **kwargs.get('column', {})}

            key_location = key.get('location', None)
            column_name = column['name']
            column_type = column['type']

            del column['name']
            del column['type']
            if key_location is not None:
                del key['location']

            def column_prop(cls):
                col_args = [
                    column_type
                ]

                if key_location is not None:
                    col_args += [
                        ForeignKey(
                            key_location,
                            **key
                        )
                    ]

                return Column(
                    *col_args,
                    **column
                )

            column_prop.__name__ = column_name

            class Mixin(*extensions):
                pass

            setattr(Mixin, column_name, declared_attr(column_prop))

            return Mixin
        return wrapper

    return extensions_wrapper
