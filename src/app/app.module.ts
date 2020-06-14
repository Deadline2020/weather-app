import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BgImageService } from './services/bg-image.service';
import { AppService } from './services/app.service';
import { environment } from 'src/environments/environment';
import { appReducers } from './store/reducers/app.reducers';
import { BgImageEffects } from './store/effects/bg-image.effects';
// import { ControlsComponent } from './components/controls/controls.component';
// import { SearchComponent } from './components/controls/components/search/search.component';
// import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
// import { WeekForecastComponent } from './components/week-forecast/week-forecast.component';
// import { MapComponent } from './components/map/map.component';
import { HelpersService } from './services/helpers.service';
import { ControlsModule } from './components/controls/controls.module';
import { MapModule } from './components/map/map.module';
import { DailyForecastModule } from './components/daily-forecast/daily-forecast.module';
import { WeekForecastModule } from './components/week-forecast/week-forecast.module';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ControlsModule,
		MapModule,
		WeekForecastModule,
		DailyForecastModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot([BgImageEffects]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [
		BgImageService,
		HelpersService,
		AppService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
