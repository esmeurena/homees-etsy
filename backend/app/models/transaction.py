from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Transaction(db.Model):
    __tablename__ = "Transactions"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    productId = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    totalPrice = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now)
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now)

    def to_dict(self):
        return {"id": self.id, "productId": self.productId, "userId": self.userId, "totalPrice": self.totalPrice}