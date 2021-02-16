
import json
import os.path as osp

from ._version import __version__
from .handlers import setup_handlers

HERE = osp.abspath(osp.dirname(__file__))

with open(osp.join(HERE, 'labextension', 'package.json')) as file:
    data = json.load(file)


def _jupyter_labextension_paths():
    return [{
        'src': 'labextension',
        'dest': data['name']
    }]


def _jupyter_server_extension_paths():
    return [{
        "module": "jupytersd"
    }]


def load_jupyter_server_extension(server_app):
    """Registers the API handler to receive HTTP requests from the frontend extension.

    Parameters
    ----------
    server_app: jupyterlab.labapp.LabApp
        JupyterLab application instance
    """
    setup_handlers(server_app.web_app)
    server_app.log.info("Registered HelloWorld extension at URL path /jupytersd")


def open_file(file_path: str):
    with open(file_path, 'rb') as file:
        contents = file.read()


