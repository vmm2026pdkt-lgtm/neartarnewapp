from pydantic import BaseModel, ConfigDict, Field


class CategoryCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    slug: str = Field(min_length=2, max_length=120)
    icon: str | None = None
    image: str | None = None


class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    icon: str | None
    image: str | None
    is_active: bool


class SubcategoryCreate(BaseModel):
    category_id: int
    name: str = Field(min_length=2, max_length=100)
    slug: str = Field(min_length=2, max_length=120)


class SubcategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    category_id: int
    name: str
    slug: str
    is_active: bool
