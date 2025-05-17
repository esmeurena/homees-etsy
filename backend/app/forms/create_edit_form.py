from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError

class ProductForm(FlaskForm):
    name = StringField("name", validators = [DataRequired()])
    description = StringField("description", validators = [DataRequired()])
    price = IntegerField("price", validators = [DataRequired()])
    submit = SubmitField("Submit")