from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime

class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    reviewId = db.Column(db.Integer, nullable=True)
    url = db.Column(db.String, nullable=True) 
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now)
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now)


    def to_dict(self):
        return {"id": self.id, "reviewId": self.reviewId, "url": self.url}