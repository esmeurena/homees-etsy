from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey(add_prefix_for_prod("users.id")),
                        nullable=False)
    name = db.Column(db.String(30), nullable=False, unique=True)
    description = db.Column(db.String(100), nullable=True)
    price = db.Column(db.Numeric(10, 2), nullable=False)
    item_count = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)

    # one-to-many
    user = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="products")
    product_images = db.relationship("ProductImage", back_populates="product", cascade="all, delete-orphan")
    favorites = db.relationship("Favorite", back_populates="products")
    shopping_carts = db.relationship("ShoppingCart", back_populates="products")
    transactions = db.relationship("Transaction", back_populates="products")


    def to_dict(self):
        avg_rating = None
        ratings = []
        if self.reviews:
            ratings = [review.stars for review in self.reviews
                       if review.stars is not None]
        if ratings:
            avg_rating = round(sum(ratings) / len(ratings), 2)
        return {
            "id": self.id, "user_id": self.user_id, "name": self.name,
            "description": self.description, "price": self.price,
            "item_count": self.item_count,
            "product_images": [img.to_dict() for img in self.product_images],
            "avg_rating": avg_rating,
            "reviews": [review.to_dict() for review in self.reviews]
            }
