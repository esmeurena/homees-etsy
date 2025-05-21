from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange

class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired(), Length(min=50, max=500, message="Review must be between 50 and 500 characters")])
    stars = IntegerField('stars', validators=[DataRequired(), NumberRange(min=1, max=5, message="stars must be between 1 and 5")])