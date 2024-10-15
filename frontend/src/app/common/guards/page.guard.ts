import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';

export const pageGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => /^\d+$/.test(route.paramMap.get('page') ?? 'n/a');
