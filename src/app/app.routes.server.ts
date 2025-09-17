import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'product-details/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'order/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'verification-code',
    renderMode: RenderMode.Client,
  },
];
