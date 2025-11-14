import importlib
import inspect
import pkgutil
from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller.UserController import router as userRouter
from settings import api_list
app = FastAPI()

origins = [
    f"{api_list.AI_SERVICE_URL}",
    f"{api_list.FRONTEND_URL}"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

def include_controllers(app: FastAPI) -> None:
    import controller as controllers_pkg
    pkg_name = controllers_pkg.__name__
    pkg_path = controllers_pkg.__path__  # type: ignore[attr-defined]

    for _, mod_name, is_pkg in pkgutil.iter_modules(pkg_path):
        if mod_name.startswith("_") or is_pkg:
            continue
        module = importlib.import_module(f"{pkg_name}.{mod_name}")

        
        router = getattr(module, "router", None)
        if isinstance(router, APIRouter):
            app.include_router(router)
            continue

        # Fallback: find every API router
        for _, obj in inspect.getmembers(module):
            if isinstance(obj, APIRouter):
                app.include_router(obj)

include_controllers(app)

# debug: list routes
for r in app.router.routes:
    try:
        methods = ",".join(sorted(r.methods))  # type: ignore[attr-defined]
    except Exception:
        methods = ""
    print(f"Route: {methods} {getattr(r, 'path', '')}")