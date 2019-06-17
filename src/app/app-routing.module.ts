import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServerResolver } from './servers/server/server-resolver.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: ':id/:name', component: UserComponent },
    ]
  },
  {
    path: 'servers',
    // canActivate: [AuthGuard],  // Protect the route and all its childs.
    canActivateChild: [AuthGuard],  // Protect only the child routes.
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent,
        resolve: {
          server: ServerResolver
        }
      },
      {
        path: ':id/edit',
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  },
  // { path: 'not-found', component: PageNotFoundComponent },
  {
    path: 'not-found',
    component: ErrorPageComponent,
    data: {
      message: 'Page not found!'
    }
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    // For prod env to tell the server to only take care about the URL before #.
    // RouterModule.forRoot(appRoutes, { useHash: true })
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
