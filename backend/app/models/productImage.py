from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ProductImage(db.Model):
    __tablename__ = "productImages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)
    url = db.Column(db.String(100))
    preview = db.Column(db.Boolean, nullable=False)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    # one-to-many
    products = db.relationship("Product", back_populates="productImages")

    def to_dict(self):
        return {"id": self.id, "productId": self.productId, "userId": self.userId, "preview": self.preview}