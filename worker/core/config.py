from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    WORKER_API_URL: str


    class Config:
        env_file = ".env.worker"
        env_file_encoding = "utf-8"
        case_sensitive = True


settings = Settings()