from modules.models import sql


def get_by(
    s,
    id=None,
    email=None,
    email_id=None,
    phone=None,
    phone_id=None
):
    q = s.query(sql.User)
    if id is not None:
        return q.filter(sql.User.id == id)
    elif email_id is not None:
        return q.filter(sql.User.email_id == email_id)
    elif phone_id is not None:
        return q.filter(sql.User.phone_id == phone_id)
    elif email is not None:
        sq_email = s.query(sql.Email)\
            .filter(sql.Email.email == email)\
            .subquery()
        return q.filter(sql.User.email_id == sq_email.c.id)
    elif phone is not None:
        sq_phone = s.query(sql.Phone)\
            .filter(sql.Phone.number == phone)\
            .subquery()
        return q.filter(sql.User.phone_id == phone)
