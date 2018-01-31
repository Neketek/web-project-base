DATABASE_URI = "mysql://root:root@localhost/monarc"
ECHO = True
CONNECTIONS_POOL_SIZE = 5
CONNECTIONS_MAX_OVERFLOW_LIMIT = 10
#maximum number of simultaneous connections is CONNECTIONS_POOL_SIZE + CONNECTIONS_MAX_OVERFLOW_LIMIT.
#CONNECTIONS_MAX_OVERFLOW_LIMIT = -1 means that there is no overflow.
#Connections which are out of pool size will be discarded after they are returned to pool.
CONNECTION_TIMEOUT_SECONDS = 30 # time which connections waits for db response
CONNECTION_POOL_RECYCLE_SECONDS = 3600 # time after which inactive connection will be closed

ENCODING = 'utf-8'
