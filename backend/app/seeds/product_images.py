from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    product_image_1 = ProductImage(
        product_id=1, url='/images/exampleimage1.png', preview=True
        )
    product_image_2 = ProductImage(
        product_id=2, url='/images/exampleimage2.png', preview=True
        )
    product_image_3 = ProductImage(
        product_id=3, url='/images/exampleimage3.png', preview=True
        )
    product_image_4 = ProductImage(
        product_id=4, url='/images/exampleimage4.png', preview=True
        )
    product_image_5 = ProductImage(
        product_id=5, url='/images/exampleimage5.png', preview=True
        )
    more_product_images = []
    for i in range(6,26):
        img_i = i
        if i >= 16:
            img_i = img_i-10
        # img_i =  (i % 5)+1
        new_product_image = ProductImage(
        product_id=i, url=f'/images/exampleimage{img_i}.png', preview=True
        )
        more_product_images.append(new_product_image)

    db.session.add(product_image_1)
    db.session.add(product_image_2)
    db.session.add(product_image_3)
    db.session.add(product_image_4)
    db.session.add(product_image_5)
    db.session.add_all(more_product_images)
    db.session.commit()


def undo_product_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;"
            )
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
