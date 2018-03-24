from facepy import GraphAPI
from facepy import OAuthError
import logging
logger = logging.getLogger()
logger.disabled = True

graph = GraphAPI("your_token")

graph.get('me', retry=4)
