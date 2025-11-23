import { HttpInterceptorFn } from '@angular/common/http';

export const authJwtInterceptor: HttpInterceptorFn = (req, next) => {
    let authToken: string | null = null;

    // 💡 FIX: Check if the code is running in a browser (where 'window' is defined).
    // This prevents the application from crashing during Server-Side Rendering (SSR) or HMR.
    if (typeof window !== 'undefined') {
        authToken = localStorage.getItem('accessToken');
    }

    if (authToken) {
        const cloned = req.clone({
            // Set the Authorization header only if a token was successfully retrieved
            headers: req.headers.set('Authorization', `Bearer ${authToken}`)
        });
        
        // Send the modified request
        return next(cloned);
    } 
    
    // If no token, or if running outside the browser (Node.js), pass the original request through
    return next(req);
};