from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    WORKER_API_URL: str | None = "http://127.0.0.1:8080"


    class Config:
        env_file = ".env.worker"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()