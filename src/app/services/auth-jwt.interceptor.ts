import { HttpInterceptorFn } from '@angular/common/http';
export const authJwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem('accessToken');
    if (authToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    // 3. Send the modified request
    return next(cloned);
  } 
  // If no token, pass the original request through
  return next(req);
}