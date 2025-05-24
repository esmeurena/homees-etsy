from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length, NumberRange, ValidationError, Optional

def validate_empty_review(form, field):
    if field.data and not " ".join(field.data.split()):
        raise ValidationError("Review can not be submitted")
    
def validate_url(form, field):
    if field.data:
        url = field.data.lower()
        if not (url.endswith(".jpg") or url.endswith("jpeg") or url.endswith('.png')):
            raise ValidationError("Image can not be submitted. .jpg, .jpeg, or .png required")


class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired(), Length(min=10, max=500, message="Review must be between 50 and 500 characters"), validate_empty_review])
    stars = IntegerField('stars', validators=[DataRequired(), NumberRange(min=1, max=5, message="stars must be between 1 and 5")])
    image_url = StringField('image_url', validators=[Optional(),validate_url])