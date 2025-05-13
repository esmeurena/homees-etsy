from .db import db, environment, SCHEMA, add_prefix_for_prod
from .productImage import ProductImage
import datetime


class Product(db.Model):
    __tablename__ = "products"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    # ownerId = db.Column(db.Integer, nullable=False)
    # ownerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(30), nullable=False, unique=True)
    description = db.Column(db.String(100))
    price = db.Column(db.Decimal, nullable=False)
    item_count = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.TIMESTAMP, default=datetime.now)
    updated_at = db.Column(db.TIMESTAMP, default=datetime.now)

    # one-to-many
    owner = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="products")
    product_images = db.relationship("ProductImage", back_populates="products")
    favorites = db.relationship("Favorite", back_populates="products")
    shopping_carts = db.relationship("ShoppingCart", back_populates="products")
    transactions = db.relationship("Transaction", back_populates="products")


    def to_dict(self):
        return {"id": self.id, "owner_id": self.owner_id, "name": self.name, "description": self.description, "price": self.price, "item_count": self.item_count, "productImages": ProductImage.query(ProductImage.productId == self.id)}
