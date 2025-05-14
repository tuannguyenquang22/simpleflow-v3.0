from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from worker.routes import file
from worker.utils.static_handler import make_sure_static_dir_exists


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/static", 
    StaticFiles(directory=make_sure_static_dir_exists()), 
    name="static"
)


app.include_router(file.router)