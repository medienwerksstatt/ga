import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'category/1',
        pathMatch: 'full'
    },
    {
        path: 'home',
        redirectTo: 'category/1',
        pathMatch: 'full'
    },
    {
        path: 'member',
        redirectTo: 'member/0',
        pathMatch: 'full'
    },
    {
        path: 'map',
        redirectTo: 'map/0',
        pathMatch: 'full'
    },
    {
        path: 'member/:teach',
        loadChildren: () => import('./pages/member/member.module').then(m => m.MemberPageModule)
    },
    {
        path: 'map/:teach',
        loadChildren: () => import('./pages/map/map.module').then(m => m.MapPageModule)
    },
    {
        path: 'gallery',
        loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryPageModule)
    },
    {
        path: 'album',
        redirectTo: 'gallery',
        pathMatch: 'full'
    },
    {
        path: 'album/:id',
        loadChildren: () => import('./pages/album/album.module').then(m => m.AlbumPageModule)
    },
    {
        path: 'photo/:id',
        loadChildren: () => import('./pages/photo/photo.module').then(m => m.PhotoPageModule)
    },
    {
        path: 'photo/:id/:image',
        loadChildren: () => import('./pages/photo/photo.module').then(m => m.PhotoPageModule)
    },
    {
        path: 'detail/:id',
        loadChildren: () => import('./pages/detail/detail.module').then(m => m.DetailPageModule)
    },
    {
        path: 'article/:id',
        loadChildren: () => import('./pages/article/article.module').then(m => m.ArticlePageModule)
    },
    {
        path: 'category/:id',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryPageModule)
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
