import enum
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Enum, ForeignKey, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.session import Base


class ProductCondition(str, enum.Enum):
    NEW = "new"
    USED = "used"


class ProductStatus(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    SOLD = "sold"


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)

    seller_id: Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    seller: Mapped["User"] = relationship(back_populates="products")

    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"), nullable=False)
    category: Mapped["Category"] = relationship(back_populates="products")

    title: Mapped[str] = mapped_column(String(150), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    condition: Mapped[ProductCondition] = mapped_column(
        Enum(ProductCondition, name="product_condition"), default=ProductCondition.USED
    )

    price: Mapped[float] = mapped_column(Numeric(12, 2), nullable=False)
    offer_price: Mapped[float | None] = mapped_column(Numeric(12, 2), nullable=True)
    is_negotiable: Mapped[bool] = mapped_column(Boolean, default=False)

    city: Mapped[str] = mapped_column(String(100), nullable=False)
    state: Mapped[str] = mapped_column(String(100), nullable=False)
    location: Mapped[str | None] = mapped_column(String(255), nullable=True)

    status: Mapped[ProductStatus] = mapped_column(
        Enum(ProductStatus, name="product_status"), default=ProductStatus.PUBLISHED
    )

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    images: Mapped[list["ProductImage"]] = relationship(
        back_populates="product", cascade="all, delete-orphan"
    )
