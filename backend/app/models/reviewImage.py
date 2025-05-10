from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class ReviewImage(db.Model):
    __tablename__ = "reviewImages"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    reviewId = db.Column(db.Integer, nullable=True)
    url = db.Column(db.String, nullable=True) 
    createdAt = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.utcnow, onupdate=datetime.utucnow)


    def to_dict(self):
        return {"id": self.id, "reviewId": self.reviewId, "url": self.url}