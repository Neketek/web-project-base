from modules.models import sql


def get_by(s, id=None, email=None):
    q = s.query(sql.Email)
    if id is not None:
        return q.filter(sql.Email.id == id)
    elif email is not None:
        return q.filter(sql.Email.email == email)
