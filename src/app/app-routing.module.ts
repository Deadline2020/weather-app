import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './components/main-page/main-page.component';
import { PageHourlyForecastComponent } from './components/page-hourly-forecast/page-hourly-forecast.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
	{
		path: 'main',
		component: MainPageComponent,
	},

	{
		path: '',
		redirectTo: '/main',
		pathMatch: 'full',
	},

	{
		path: 'hourly/:id',
		component: PageHourlyForecastComponent,
	},

	{
		path: 'hourly',
		redirectTo: '/hourly/0',
		pathMatch: 'full',
	},

	{
		path: 'not-found',
		component: NotFoundComponent,
	},

	{
		path: '**',
		redirectTo: '/not-found',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
