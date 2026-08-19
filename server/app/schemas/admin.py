from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_users: int
    total_businesses: int
    total_products: int
    total_categories: int
    published_businesses: int
    pending_businesses: int
    verified_businesses: int
    published_products: int
