class ControllerBase:
    def __init__(self, sql_session=None):
        self.sql_session = sql_session
