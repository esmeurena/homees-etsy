from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Transaction(db.Model):
    __tablename__ = "transactions"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    total_price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

    # one-to-many
    products = db.relationship("Product", back_populates="transactions")
    user = db.relationship("User", back_populates="transactions")

    def to_dict(self):
        return {"id": self.id, "product_id": self.productId, "user_id": self.user_id, "total_price": self.total_price}