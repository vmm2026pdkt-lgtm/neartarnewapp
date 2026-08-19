from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies import require_role
from app.models.business import Business, BusinessStatus
from app.models.category import Category
from app.models.product import Product, ProductStatus
from app.models.user import User
from app.schemas.admin import DashboardStats
from app.schemas.business import BusinessOut
from app.schemas.product import ProductOut
from app.schemas.user import UserOut

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_role("admin"))])


@router.get("/dashboard", response_model=DashboardStats)
def dashboard(db: Session = Depends(get_db)):
    return DashboardStats(
        total_users=db.query(func.count(User.id)).scalar(),
        total_businesses=db.query(func.count(Business.id)).scalar(),
        total_products=db.query(func.count(Product.id)).scalar(),
        total_categories=db.query(func.count(Category.id)).scalar(),
        published_businesses=db.query(func.count(Business.id))
        .filter(Business.status == BusinessStatus.PUBLISHED)
        .scalar(),
        pending_businesses=db.query(func.count(Business.id))
        .filter(Business.status == BusinessStatus.DRAFT)
        .scalar(),
        verified_businesses=db.query(func.count(Business.id))
        .filter(Business.is_verified.is_(True))
        .scalar(),
        published_products=db.query(func.count(Product.id))
        .filter(Product.status == ProductStatus.PUBLISHED)
        .scalar(),
    )


@router.get("/users", response_model=list[UserOut])
def list_users(
    db: Session = Depends(get_db),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=200),
):
    return db.query(User).order_by(User.created_at.desc()).offset(skip).limit(limit).all()


@router.patch("/users/{user_id}/toggle-active", response_model=UserOut)
def toggle_user_active(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.is_active = not user.is_active
    db.commit()
    db.refresh(user)
    return user


@router.get("/businesses", response_model=list[BusinessOut])
def list_all_businesses(
    db: Session = Depends(get_db),
    status_filter: BusinessStatus | None = Query(default=None, alias="status"),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=200),
):
    query = db.query(Business)
    if status_filter is not None:
        query = query.filter(Business.status == status_filter)
    return query.order_by(Business.created_at.desc()).offset(skip).limit(limit).all()


@router.patch("/businesses/{business_id}/approve", response_model=BusinessOut)
def approve_business(business_id: int, db: Session = Depends(get_db)):
    business = db.get(Business, business_id)
    if business is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Business not found")
    business.status = BusinessStatus.PUBLISHED
    business.is_verified = True
    db.commit()
    db.refresh(business)
    return business


@router.patch("/businesses/{business_id}/reject", response_model=BusinessOut)
def reject_business(business_id: int, db: Session = Depends(get_db)):
    business = db.get(Business, business_id)
    if business is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Business not found")
    business.status = BusinessStatus.DRAFT
    business.is_verified = False
    db.commit()
    db.refresh(business)
    return business


@router.get("/products", response_model=list[ProductOut])
def list_all_products(
    db: Session = Depends(get_db),
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=50, ge=1, le=200),
):
    return db.query(Product).order_by(Product.created_at.desc()).offset(skip).limit(limit).all()
