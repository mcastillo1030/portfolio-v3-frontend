import { RouteMiddleware, defineNuxtRouteMiddleware } from 'nuxt/app';

const preventCatNavigation: RouteMiddleware = (to, from) => {
  const isCategoryDirect =
    from.path.includes('/rants') && from.query.category &&
    to.path.includes('/rants') && to.query.category &&
    from.query.category === to.query.category;

  if (isCategoryDirect) {
    return navigateTo('/rants');
  }

  return;
};

export default defineNuxtRouteMiddleware(preventCatNavigation);
