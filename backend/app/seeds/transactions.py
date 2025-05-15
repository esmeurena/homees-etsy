from app.models import db, Transaction, environment, SCHEMA
from sqlalchemy.sql import text

def seed_transactions():
    transaction_1 = Transaction(product_id=1, user_id=1, total_price=5)
    transaction_2 = Transaction(product_id=2, user_id=2, total_price=10)
    transaction_3 = Transaction(product_id=3, user_id=3, total_price=15)
    transaction_4 = Transaction(product_id=4, user_id=4, total_price=20)
    transaction_5 = Transaction(product_id=5, user_id=5, total_price=25)

    db.session.add(transaction_1)
    db.session.add(transaction_2)
    db.session.add(transaction_3)
    db.session.add(transaction_4)
    db.session.add(transaction_5)
    db.session.commit()

def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))
    db.session.commit()
