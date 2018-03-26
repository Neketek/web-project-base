from pytz import timezone, utc
from datetime import datetime
from modules.config import client


def __toStringConverterClass__(format):

    class To:

        FORMAT = format

        @classmethod
        def string(cls, value, format=None):
            return datetime.strftime(
                value,
                format if format is not None else cls.FORMAT
            )
    return To


class DateTime:

    class From:
        @classmethod
        def string(cls, value, to_tz=None, from_tz=None):
            value = datetime.strptime(value, client.DATE_TIME_FORMAT)
            if from_tz is None:
                value = cls.To.tzaware(value, from_tz)
            return value if to_tz is None else cls.To.tz(value, to_tz)

    class To(__toStringConverterClass__(client.DATE_TIME_FORMAT)):
        @classmethod
        def string(cls, value, tz=None, format=None):
            return super().string(cls.tz(value, tz), format)

        @classmethod
        def tzaware(cls, value, tz=utc.zone):
            return timezone(tz).localize(value)

        @classmethod
        def utc(cls, value):
            return cls.tzaware(value, tz=utc.zone)

        @classmethod
        def tz(cls, value, tz=None):
            if value.tzinfo is None:
                value = cls.utc(value)
            return value.astimezone(timezone(tz))


class UTC:
    class From:
        @classmethod
        def string(cls, value, from_tz=None):
            return DateTime.From.string(value, to_tz=utc.zone, from_tz=from_tz)


class Date:
    class From:
        @staticmethod
        def string(value):
            return datetime.strptime(value, client.DATE_FORMAT).date()

    To = __toStringConverterClass__(client.DATE_FORMAT)


class Time:
    class From:
        @staticmethod
        def string(value):
            return datetime.strptime(value, client.TIME_FORMAT).time()

    To = __toStringConverterClass__(client.TIME_FORMAT)
