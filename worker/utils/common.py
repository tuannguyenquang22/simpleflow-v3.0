from fastapi import UploadFile

import hashlib
import mimetypes
import time


def generate_short_hash():
    return hashlib.sha1(str(time.time()).encode()).hexdigest()[:10]


def generate_filename(file: UploadFile):
    if mimetypes.guess_extension(file.content_type):
        return  f"{generate_short_hash()}{mimetypes.guess_extension(file.content_type)}"
    else:
        return f"{generate_short_hash()}"   