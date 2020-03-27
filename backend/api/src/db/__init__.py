from .connection import db_session, Base, engine
from .models import *

from auth import IS_OFFLINE

# dev
if IS_OFFLINE:
    Base.metadata.create_all(engine)
