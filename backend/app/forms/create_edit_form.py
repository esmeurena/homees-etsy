from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FloatField
from wtforms.validators import DataRequired, Email, ValidationError

class ProductForm(FlaskForm):
    name = StringField("name", validators = [DataRequired()])
    description = StringField("description", validators = [DataRequired()])
    price = FloatField("price", validators = [DataRequired()])
    item_count = IntegerField("item_count", validators = [DataRequired()])
    submit = SubmitField("Submit")