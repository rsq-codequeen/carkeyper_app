// src/app/interceptors/loading.interceptor.ts

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { PreLoaderService } from '../services/pre-loader.service'; // Adjust path as needed



let activeRequests = 0; // Maintain the global counter outside the function

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(PreLoaderService);
  
  // 1. Increment and Show Loader
  if (activeRequests === 0) {
    loadingService.show(); 
  }
  activeRequests++;

  // 2. Handle the request/response stream
  return next(req).pipe(
    // 3. Decrement and Hide Loader on completion (success or error)
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        loadingService.hide();
      }
    })
  );
};