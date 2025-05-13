from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ShoppingCart(db.Model):
    __tablename__ = "shoppingCarts"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

    # one-to-many
    products = db.relationship("Product", back_populates="shopping_carts")
    user = db.relationship("User", back_populates="shopping_carts")

    def to_dict(self):
        return {"id": self.id, "product_id": self.product_id, "user_id": self.user_id}
