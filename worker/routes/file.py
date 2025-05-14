from fastapi import APIRouter, UploadFile

import pandas as pd

from worker.core.config import settings
from worker.utils.common import generate_filename


router = APIRouter(prefix="/file", tags=["file"])


PANDAS_DTYPE_TO_METADATA = {
    "int64": "numeric",
    "float64": "numeric",
    "object": "categorical",
    "bool": "categorical",
    "datetime64": "datetime",
    "timedelta64": "datetime",
    "category": "categorical",
    "string": "categorical",
}


@router.post("/upload")
async def upload_file(
    file: UploadFile
):
    CHUNK_SIZE = 2 * 1024 * 1024
    filename = generate_filename(file)
    with open(f"./static/{filename}", "wb") as f:
        while chunk := await file.read(CHUNK_SIZE):
            f.write(chunk)
    
    # Get file metadata
    df = pd.read_csv(f"./static/{filename}")
    metadata = {
        "num_rows": df.shape[0],
        "num_columns": df.shape[1],
        "column_types": {
            col: PANDAS_DTYPE_TO_METADATA[str(dtype)]
            for col, dtype in df.dtypes.items()
        },
    }

    return {
        "name": file.filename,
        "path": f"{settings.WORKER_API_URL}/static/{filename}",
        "metadata": metadata,
    }