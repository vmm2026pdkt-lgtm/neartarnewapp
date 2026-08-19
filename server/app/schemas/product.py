from datetime import datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field

from app.models.product import ProductCondition, ProductStatus


class ProductCreate(BaseModel):
    title: str = Field(min_length=2, max_length=150)
    description: str | None = None
    category_id: int
    condition: ProductCondition = ProductCondition.USED
    price: Decimal = Field(gt=0)
    offer_price: Decimal | None = Field(default=None, ge=0)
    is_negotiable: bool = False
    city: str
    state: str
    location: str | None = None
    status: ProductStatus = ProductStatus.PUBLISHED


class ProductImageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    image_url: str
    is_primary: bool


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    seller_id: int
    category_id: int
    title: str
    description: str | None
    condition: ProductCondition
    price: Decimal
    offer_price: Decimal | None
    is_negotiable: bool
    city: str
    state: str
    location: str | None
    status: ProductStatus
    created_at: datetime
    updated_at: datetime
    images: list[ProductImageOut] = []
