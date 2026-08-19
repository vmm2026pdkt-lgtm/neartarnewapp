from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    PROJECT_NAME: str = "NearTar API"
    API_PREFIX: str = "/api"

    DATABASE_URL: str = "postgresql+psycopg://neartar_app:neartar_app_dev_pw@localhost:5432/neartar_app_db"

    JWT_SECRET_KEY: str = "change-this-secret-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        # Origins used by the Capacitor Android WebView build
        "https://localhost",
        "capacitor://localhost",
    ]


settings = Settings()
