from fastapi import APIRouter, UploadFile

import pandas as pd

from worker.core.config import settings
from worker.utils.common import generate_filename


router = APIRouter(prefix="/file", tags=["file"])


@router.post("/upload")
def upload_file(
    file: UploadFile
):
    filename = generate_filename(file)
    with open(f"./static/{filename}", "wb") as f:
        f.write(file.file.read())
    
    return {
        "name": file.filename,
        "path": f"{settings.WORKER_API_URL}/static/{filename}",
    }