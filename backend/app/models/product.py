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
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(30), nullable=False, unique=True)
    description = db.Column(db.String(100))
    price = db.Column(db.Decimal, nullable=False)
    itemCount = db.Column(db.Integer, nullable=False)
    createdAt = db.Column(db.TIMESTAMP, default=datetime.now)
    updatedAt = db.Column(db.TIMESTAMP, default=datetime.now)

    # one-to-many
    owner = db.relationship("User", back_populates="products")
    reviews = db.relationship("Review", back_populates="products")
    productImages = db.relationship("ProductImage", back_populates="products")
    favorites = db.relationship("Favorite", back_populates="products")
    shoppingCarts = db.relationship("ShoppingCart", back_populates="products")
    transactions = db.relationship("Transaction", back_populates="products")


    def to_dict(self):
        return {"id": self.id, "ownerId": self.ownerId, "name": self.name, "description": self.description, "price": self.price, "itemCount": self.itemCount, "productImages": ProductImage.query(ProductImage.productId == self.id)}
