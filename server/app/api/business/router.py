from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies import get_current_user
from app.models.business import Business, BusinessStatus
from app.models.user import User
from app.schemas.business import BusinessCreate, BusinessOut

router = APIRouter(prefix="/business", tags=["business"])


@router.get("", response_model=list[BusinessOut])
def list_businesses(
    db: Session = Depends(get_db),
    category_id: int | None = None,
    city: str | None = None,
    q: str | None = None,
    skip: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=100),
):
    query = db.query(Business).filter(Business.status == BusinessStatus.PUBLISHED)

    if category_id is not None:
        query = query.filter(Business.category_id == category_id)
    if city is not None:
        query = query.filter(Business.city.ilike(f"%{city}%"))
    if q is not None:
        query = query.filter(Business.name.ilike(f"%{q}%"))

    return query.order_by(Business.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/mine", response_model=list[BusinessOut])
def my_businesses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return (
        db.query(Business)
        .filter(Business.owner_id == current_user.id)
        .order_by(Business.created_at.desc())
        .all()
    )


@router.get("/{business_id}", response_model=BusinessOut)
def get_business(business_id: int, db: Session = Depends(get_db)):
    business = db.get(Business, business_id)
    if business is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Business not found")
    return business


@router.post("", response_model=BusinessOut, status_code=status.HTTP_201_CREATED)
def create_business(
    payload: BusinessCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    business = Business(owner_id=current_user.id, **payload.model_dump())
    db.add(business)
    db.commit()
    db.refresh(business)
    return business


@router.put("/{business_id}", response_model=BusinessOut)
def update_business(
    business_id: int,
    payload: BusinessCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    business = db.get(Business, business_id)
    if business is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Business not found")
    if business.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not your business")

    for field, value in payload.model_dump().items():
        setattr(business, field, value)

    db.commit()
    db.refresh(business)
    return business
