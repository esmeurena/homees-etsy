from .db import db, environment, SCHEMA, add_prefix_for_prod
import datetime


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    ownerId = db.Column(db.Integer, nullable=False)
    # ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(30), nullable=False, unique=True)
    description = db.Column(db.String(100))
    price = db.Column(db.Decimal, nullable=False)
    itemCount = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now)
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now)

    def to_dict(self):
        return {"id": self.id, "ownerId": self.ownerId, "name": self.name, "description": self.description, "price": self.price, "itemCount": self.itemCount}
