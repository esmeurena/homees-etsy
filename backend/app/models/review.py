from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    productId = db.Column(db.Integer, nullable=False)
    userId = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(200), nullable=False)
    stars = db.Column(db.Integer)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utucnow)

    def to_dict(self):
        return {"id": self.id, "productId": self.productId, "userId": self.userId, "review": self.review, "stars": self.stars}
