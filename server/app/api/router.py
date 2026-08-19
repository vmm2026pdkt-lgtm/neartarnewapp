from fastapi import APIRouter

from app.api.admin.router import router as admin_router
from app.api.auth.router import router as auth_router
from app.api.business.router import router as business_router
from app.api.categories.router import router as categories_router
from app.api.products.router import router as products_router
from app.api.users.router import router as users_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(categories_router)
api_router.include_router(business_router)
api_router.include_router(products_router)
api_router.include_router(admin_router)
