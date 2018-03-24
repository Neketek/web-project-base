from modules.models import sql


def get_by(s, id=None, phone=None):
    q = s.query(sql.Phone)
    if id is not None:
        return q.filter(sql.Phone.id == id)
    elif phone is not None:
        return q.filter(sql.Phone.number == phone)
