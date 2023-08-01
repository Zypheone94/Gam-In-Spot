from django.contrib import admin
from .models import CustomUser

<<<<<<< HEAD
from .models import User

admin.site.register(User)
=======
admin.site.register(CustomUser)
>>>>>>> database_struc
