# DATABASE_URI = "mysql://root:root@localhost/monarc"
ECHO = True
CONNECTIONS_POOL_SIZE = 5
CONNECTIONS_MAX_OVERFLOW_LIMIT = 10
# maximum number of simultaneous connections
# is CONNECTIONS_POOL_SIZE + CONNECTIONS_MAX_OVERFLOW_LIMIT.
# CONNECTIONS_MAX_OVERFLOW_LIMIT = -1 means that there is no overflow.
# Connections which are out of pool size
# will be discarded after they are returned to pool.
# time which connections waits for db response
CONNECTION_TIMEOUT_SECONDS = 30
# time after which inactive connection will be closed
CONNECTION_POOL_RECYCLE_SECONDS = 3600

ENCODING = 'utf-8'

DRIVER = "postgresql"
USER = "postgres"
PASSWORD = "postgres"
HOST = "localhost"
PORT = "5432"
DATABASE = "server_primary"
