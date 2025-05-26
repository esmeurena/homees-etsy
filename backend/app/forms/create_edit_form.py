from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FloatField
from wtforms.validators import DataRequired, Length, NumberRange

class ProductForm(FlaskForm):
    name = StringField("name", validators = [DataRequired(), Length(min=5, max=100, message="Name must be between 5 and 100 characters")])
    description = StringField("description", validators = [DataRequired(), Length(min=10, max=1000, message="Description must be between 10 and 1000 characters")])
    price = FloatField("price", validators = [DataRequired(), NumberRange(min=0.01, max=10000, message="Price must be between $0.01 and $10,000")])
    item_count = IntegerField("item_count", validators = [DataRequired(), NumberRange(min=1, max=10000, message="Item count must be between 1 and 10,000")])
    submit = SubmitField("Submit")