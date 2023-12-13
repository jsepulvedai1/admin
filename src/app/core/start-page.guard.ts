import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MenuService } from '@delon/theme';
import { Observable } from 'rxjs';

/**
 * Dynamically load the start page
 *
 * 动态加载启动页
 */
export const startPageGuard: CanActivateFn = (_, state): boolean | Observable<boolean> => {
  return true;
};
