from django.urls import include, path
from dynamic_rest.routers import DynamicRouter

from services.api import views

router = DynamicRouter()
router.register(
    "ApplicationLoginActivityViewSet", views.ApplicationLoginActivityViewSet
)
router.register("UserPosts", views.UserPostViewSet)
router.register("Posts", views.PostViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
