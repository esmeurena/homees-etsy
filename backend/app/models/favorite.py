from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Favorite(db.Model):
    __tablename__ = "favorites"

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    # one-to-many
    user = db.relationship("User", back_populates="favorites")
    products = db.relationship("Product", back_populates="favorites")

    def to_dict(self):
        return {"id": self.id, "product_id": self.product_id, "user_id": self.user_id}