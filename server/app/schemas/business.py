from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.models.business import BusinessStatus


class BusinessCreate(BaseModel):
    name: str = Field(min_length=2, max_length=150)
    category_id: int
    subcategory_id: int | None = None
    description: str | None = None

    phone: str = Field(min_length=7, max_length=20)
    whatsapp: str | None = None
    email: EmailStr | None = None
    website: str | None = None
    gst_number: str | None = None

    address: str = Field(min_length=3, max_length=255)
    state: str
    district: str
    city: str
    pincode: str = Field(min_length=4, max_length=10)
    latitude: float | None = None
    longitude: float | None = None

    status: BusinessStatus = BusinessStatus.DRAFT


class BusinessOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    owner_id: int
    category_id: int
    subcategory_id: int | None
    name: str
    description: str | None
    phone: str
    whatsapp: str | None
    email: EmailStr | None
    website: str | None
    gst_number: str | None
    address: str
    state: str
    district: str
    city: str
    pincode: str
    latitude: float | None
    longitude: float | None
    logo: str | None
    cover_image: str | None
    status: BusinessStatus
    is_verified: bool
    created_at: datetime
    updated_at: datetime
