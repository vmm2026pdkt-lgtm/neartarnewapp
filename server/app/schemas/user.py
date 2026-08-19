import re

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator

PHONE_PATTERN = re.compile(r"^\d{10}$")
PASSWORD_PATTERN = re.compile(r"^[A-Za-z0-9]{8}$")


class UserRegister(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str = Field(description="10-digit Indian mobile number, no country code")
    password: str = Field(description="Exactly 8 alphanumeric characters")

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        if not PHONE_PATTERN.match(value):
            raise ValueError("Please enter a valid 10-digit mobile number.")
        return value

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if len(value) != 8:
            raise ValueError("Password must be exactly 8 characters.")
        if not PASSWORD_PATTERN.match(value):
            raise ValueError("Password can contain only letters and numbers.")
        return value


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class RoleOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    phone: str
    is_active: bool
    is_verified: bool
    role: RoleOut


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserOut
