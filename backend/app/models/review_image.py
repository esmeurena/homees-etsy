from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ReviewImage(db.Model):
    __tablename__ = "review_images"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")), nullable=False)
    url = db.Column(db.String(255), nullable=True) 
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utcnow)

    # one-to-many
    reviews = db.relationship("Review", back_populates="review_images")

    def to_dict(self):
        return {"id": self.id, "review_id": self.review_id, "url": self.url}