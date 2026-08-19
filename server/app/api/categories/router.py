from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies import require_role
from app.models.category import Category
from app.models.subcategory import Subcategory
from app.schemas.category import (
    CategoryCreate,
    CategoryOut,
    SubcategoryCreate,
    SubcategoryOut,
)

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=list[CategoryOut])
def list_categories(db: Session = Depends(get_db)):
    return db.query(Category).filter(Category.is_active.is_(True)).order_by(Category.name).all()


@router.get("/{category_id}", response_model=CategoryOut)
def get_category(category_id: int, db: Session = Depends(get_db)):
    category = db.get(Category, category_id)
    if category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    return category


@router.post("", response_model=CategoryOut, status_code=status.HTTP_201_CREATED)
def create_category(
    payload: CategoryCreate,
    db: Session = Depends(get_db),
    _admin=Depends(require_role("admin")),
):
    if db.query(Category).filter(Category.slug == payload.slug).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already exists")

    category = Category(**payload.model_dump())
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


@router.get("/{category_id}/subcategories", response_model=list[SubcategoryOut])
def list_subcategories(category_id: int, db: Session = Depends(get_db)):
    return (
        db.query(Subcategory)
        .filter(Subcategory.category_id == category_id, Subcategory.is_active.is_(True))
        .order_by(Subcategory.name)
        .all()
    )


@router.post("/{category_id}/subcategories", response_model=SubcategoryOut, status_code=status.HTTP_201_CREATED)
def create_subcategory(
    category_id: int,
    payload: SubcategoryCreate,
    db: Session = Depends(get_db),
    _admin=Depends(require_role("admin")),
):
    if db.get(Category, category_id) is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Category not found")
    if db.query(Subcategory).filter(Subcategory.slug == payload.slug).first():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Slug already exists")

    subcategory = Subcategory(**payload.model_dump())
    db.add(subcategory)
    db.commit()
    db.refresh(subcategory)
    return subcategory
