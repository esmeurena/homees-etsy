from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    product_id = db.Column(db.Integer,
                           db.ForeignKey(add_prefix_for_prod("products.id")),
                           nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey(add_prefix_for_prod("users.id")),
                        nullable=False)
    review = db.Column(db.String(200), nullable=False)
    stars = db.Column(db.Integer)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow,
                           onupdate=datetime.utcnow)

    # one-to-many
    review_images = db.relationship("ReviewImage", back_populates="reviews")
    user = db.relationship("User", back_populates="reviews")
    products = db.relationship("Product", back_populates="reviews")

    def to_dict(self):
        return {"id": self.id, "product_id": self.product_id, "user":
                self.user.to_dict(), "review": self.review,
                "created_at": self.created_at, "updated_at": self.updated_at,
                "stars": self.stars,
                "review_images": [img.to_dict() for img in self.review_images]}
