class JsonException(Exception):

    def __init__(self,**kwars):
        self.set_props(**kwars)

    def set_props(self,name=None,message=None,group=None,id=None):
        self.name = name
        self.message = message
        self.group = group
        self.id = id

    def __dict__(self):
        return {
            'name':self.name,
            'message':self.message,
            'group':self.group,
            'id':self.id
        }

class UserFriendlyException(JsonException):
    def __init__(self):
        self.set_props(name="UserFriendlyException")



class InternalServerException(JsonException):
    def __init__(self):
        self.set_props(name="InternalServerException")
