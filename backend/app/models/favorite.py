from db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Favorite(db.Model):
    __tablename__ = "favorites"

    if environment == 'production':
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    # one-to-many
    user = db.relationship("User", back_populates="favorites")
    products = db.relationship("Product", back_populates="favorites")

    def to_dict(self):
        return {"id": self.id, "productId": self.productId, "userId": self.userId}