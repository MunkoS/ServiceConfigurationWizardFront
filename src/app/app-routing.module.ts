import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dataAccessConfiguration',
    loadChildren: () => import('./modules/data-access-configuration/data-access-configuration.module').then(x => x.DataAccessConfigurationModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(x => x.MainModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
