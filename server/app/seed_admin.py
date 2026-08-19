"""Create the admin role and a default admin user. Run once after migrations:

    .venv/Scripts/python.exe -m app.seed_admin
"""

from app.core.security import hash_password
from app.database.session import SessionLocal
from app.models.role import Role
from app.models.user import User

ADMIN_EMAIL = "admin@neartar.app"
ADMIN_PHONE = "9999999999"
ADMIN_PASSWORD = "Admin123"


def run() -> None:
    db = SessionLocal()
    try:
        admin_role = db.query(Role).filter(Role.name == "admin").first()
        if admin_role is None:
            admin_role = Role(name="admin")
            db.add(admin_role)
            db.commit()
            db.refresh(admin_role)

        for name in ("user", "business_owner"):
            if not db.query(Role).filter(Role.name == name).first():
                db.add(Role(name=name))
        db.commit()

        admin_user = db.query(User).filter(User.email == ADMIN_EMAIL).first()
        if admin_user is None:
            admin_user = User(
                full_name="NearTar Admin",
                email=ADMIN_EMAIL,
                phone=ADMIN_PHONE,
                password_hash=hash_password(ADMIN_PASSWORD),
                role_id=admin_role.id,
                is_active=True,
                is_verified=True,
            )
            db.add(admin_user)
            db.commit()
            print(f"Created admin user: {ADMIN_EMAIL} / {ADMIN_PASSWORD}")
        else:
            admin_user.role_id = admin_role.id
            admin_user.is_active = True
            db.commit()
            print(f"Admin user already existed, ensured role: {ADMIN_EMAIL}")
    finally:
        db.close()


if __name__ == "__main__":
    run()
