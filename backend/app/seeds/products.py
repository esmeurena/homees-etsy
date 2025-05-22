from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    product_1 = Product(user_id=1, name='12 Yr Bourbon',                       
                        description='As part of the wheated bourbon family, this twelve year old is aged far longer than most wheated bourbons. This offering is a smooth, easy-going and balanced offering with a beautiful deep bronze color.',
                        price= 11.11, item_count=5)
    product_2 = Product(user_id=2, name='King Playing Card Tshirt',
                        description='made from a crisp, medium-weight 100%% cotton and designed for a tailored, yet comfortable fit. The classic neck rib includes a touch of lycra to retain its shape over time.',
                        price= 22.22, item_count=10)
    product_3 = Product(user_id=3, name='Rolex Presidential Watch',
                        description="This men's watch is made of 18K white gold. It features a factory set diamond dial and an aftermarket white gold diamond bezel.",
                        price= 100.00, item_count=15)
    product_4 = Product(user_id=4, name='Cutting Board',
                        description='Large Cutting Board: 24x18 inch large cutting board to meet your large-scale cooking needs. Its large surface area is perfect for chopping vegetables, fruits, and meat, ensuring that you have ample space to work with.',
                        price= 44.44, item_count=20)
    product_5 = Product(user_id=5, name='Custom Neon lights',
                        description="Personalized neon sign is a fun and unique gift that can be customized with text,shape,or logo to match the recipient's interest and style. It makes a great decoration for home bussiness party and brings warmth to wife, parents, friends, colleagues, girls, boys, teenagers.",
                        price= 55.55, item_count=25)

    db.session.add(product_1)
    db.session.add(product_2)
    db.session.add(product_3)
    db.session.add(product_4)
    db.session.add(product_5)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;"
            )
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
