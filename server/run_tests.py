# import requests
# for i in range(0,10):
#     print(requests.get('http://localhost:8081'))

from modules.models import sql

sql.BaseClass.metadata.create_all(sql.engine)


# import re
# regex = '([a-z])([A-Z])'
# print(re.sub(regex, r'\1 \2', 'ThisIsCamelCase').split())
# name = '_'.join([i.lower() for i in re.sub(regex, r'\1 \2', 'ThisIsCamelCase').split()])
# print (name)
