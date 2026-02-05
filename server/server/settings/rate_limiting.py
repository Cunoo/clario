import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.responses import JSONResponse
import threading

MAX_REQUEST = 30
WINDOW_SECONDS = 60

CLEANUP_INTERVAL_SECONDS = 60 * 60 * 24  # 86400
_last_cleanup_at = 0.0

rate_limiting_store: dict[str, list[float]] = {}

_lock = threading.Lock()

def _cleanup_if_needed(now: float) -> None:
    global _last_cleanup_at
    if now - _last_cleanup_at < CLEANUP_INTERVAL_SECONDS:
        return

    cutoff = now - WINDOW_SECONDS
    to_delete: list[str] = []

    for ip, timestamps in rate_limiting_store.items():
        fresh = [ts for ts in timestamps if ts >= cutoff]
        if fresh:
            rate_limiting_store[ip] = fresh
        else:
            to_delete.append(ip)

    for ip in to_delete:
        rate_limiting_store.pop(ip, None)

    _last_cleanup_at = now


class RateLimitMiddleware(BaseHTTPMiddleware):
    
    async def dispatch(self, request: Request, call_next):
        client_host = request.client.host if request.client else "unknown"
        now = time.time()
        
        with _lock:
            _cleanup_if_needed(now)
            
            timestamps = rate_limiting_store.get(client_host, [])
            
            timestamps = [
                ts for ts in timestamps
                if now - ts < WINDOW_SECONDS
            ]
            
            if len(timestamps) >= MAX_REQUEST:
                return JSONResponse(
                    status_code=429,
                    content={"detail": "Too many requests"}
                )
            timestamps.append(now)
            
            
            rate_limiting_store[client_host] = timestamps
        return await call_next(request)