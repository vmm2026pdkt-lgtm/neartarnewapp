from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies import get_current_user
from app.models.product import Product, ProductStatus
from app.models.user import User
from app.schemas.product import ProductCreate, ProductOut

router = APIRouter(prefix="/products", tags=["products"])

SORT_OPTIONS = {
    "newest": Product.created_at.desc(),
    "price_low": Product.price.asc(),
    "price_high": Product.price.desc(),
}


@router.get("", response_model=list[ProductOut])
def list_products(
    db: Session = Depends(get_db),
    category_id: int | None = None,
    city: str | None = None,
    q: str | None = None,
    sort: str = Query(default="newest", pattern="^(newest|price_low|price_high)$"),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
):
    query = db.query(Product).filter(Product.status == ProductStatus.PUBLISHED)

    if category_id is not None:
        query = query.filter(Product.category_id == category_id)
    if city is not None:
        query = query.filter(Product.city.ilike(f"%{city}%"))
    if q is not None:
        query = query.filter(Product.title.ilike(f"%{q}%"))

    return query.order_by(SORT_OPTIONS[sort]).offset(skip).limit(limit).all()


@router.get("/mine", response_model=list[ProductOut])
def my_products(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return (
        db.query(Product)
        .filter(Product.seller_id == current_user.id)
        .order_by(Product.created_at.desc())
        .all()
    )


@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    return product


@router.post("", response_model=ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(
    payload: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = Product(seller_id=current_user.id, **payload.model_dump())
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.put("/{product_id}", response_model=ProductOut)
def update_product(
    product_id: int,
    payload: ProductCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    product = db.get(Product, product_id)
    if product is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Product not found")
    if product.seller_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not your product")

    for field, value in payload.model_dump().items():
        setattr(product, field, value)

    db.commit()
    db.refresh(product)
    return product
