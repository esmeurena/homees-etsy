from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_products():
    product_1 = Product(user_id=1, name='12 Yr Bourbon',                       
                        description='This 12 year old is aged far longer than most wheated bourbons.',
                        price= 11.11, item_count=5)
    product_2 = Product(user_id=2, name='King Playing Card Tshirt',
                        description='made from a crisp, medium-weight 100%% cotton and designed for a tailored, yet comfortable fit.',
                        price= 22.22, item_count=10)
    product_3 = Product(user_id=3, name='Rolex Presidential Watch',
                        description="This watch features a factory set diamond dial and an aftermarket white gold diamond bezel.",
                        price= 100.00, item_count=15)
    product_4 = Product(user_id=4, name='Cutting Board',
                        description='Large Cutting Board: 24x18 inch large cutting board to meet your large-scale cooking needs.',
                        price= 44.44, item_count=20)
    product_5 = Product(user_id=5, name='Custom Neon lights',
                        description="Personalized neon sign is a fun and unique gift that can be customized with text,shape,or logo.",
                        price= 55.55, item_count=25)
    more_products = []
    words = ['Nice', 'Colorful', 'Handmade', 'Handcrafted', 'Luxurious', 'Vintage', 'Elegant', 'Custom', 'Stylish', 'Trending']
    items = ['HomeDecor', 'Clothing', 'Furniture', 'Kitchenware', 'Stationery', 'Poster', 'Book', 'Blanket', 'Puzzle']
    for i in range(20):
        descriptive_word = random.choice(words)
        descriptive_item = random.choice(items)
        random_number = random.randint(1, 20)
        new_product = Product(user_id=2, name=descriptive_word+" "+descriptive_item+" "+str(i),
                        description='This item reflects the untold geometry of seasonal stillness.',
                        price= random_number+.99, item_count=5)
        more_products.append(new_product)

    db.session.add(product_1)
    db.session.add(product_2)
    db.session.add(product_3)
    db.session.add(product_4)
    db.session.add(product_5)
    db.session.add_all(more_products)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;"
            )
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
