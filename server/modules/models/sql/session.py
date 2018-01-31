from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool
from modules.config import sql_db

SQL_DB_ENGINE = create_engine(
    sql_db.DATABASE_URI,
    poolclass=QueuePool,
    pool_size=sql_db.CONNECTIONS_POOL_SIZE,
    max_overflow=sql_db.CONNECTIONS_MAX_OVERFLOW_LIMIT,
    encoding=sql_db.ENCODING,
    echo=sql_db.ECHO,
    pool_recycle=sql_db.CONNECTION_POOL_RECYCLE_SECONDS,
    connect_args={
        'connection_timeout': sql_db.CONNECTION_TIMEOUT_SECONDS
    }
)


# that is sessionmaker class which will create new sessions using 'Session()' syntax
Session = sessionmaker(bind=SQL_DB_ENGINE)
#Session should be closed by session.close()
ScopedSession = scoped_session(Session())
#ScopedSession should be closed by session.remove()
