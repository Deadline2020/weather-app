import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetBgImageService } from './services/get-info-bg-image.service';
import { AppService } from './services/app.service';
import { environment } from 'src/environments/environment';
import { appReducers } from './store/reducers/app.reducers';
import { HelpersService } from './services/helpers.service';
import { ControlsModule } from './components/controls/controls.module';
import { MapModule } from './components/map/map.module';
import { DailyForecastModule } from './components/daily-forecast/daily-forecast.module';
import { WeekForecastModule } from './components/week-forecast/week-forecast.module';
import { GetCoordsService } from './services/get-coords';
import { GetInfoLocationService } from './services/get-info-location.service';
import { GetAllInfoEffects } from './store/effects/get-all-info.effects';
import { GetAllInfoService } from './services/get-all-info.service';
import { GetInfoForecastService } from './services/get-info-forecast.service';
import { DictService } from './services/translate-data.service';
import { GetCurCoordsEffects } from './store/effects/get-current-coords.effects';

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
		EffectsModule.forRoot([ GetAllInfoEffects, GetCurCoordsEffects]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [
		GetAllInfoService,
		GetBgImageService, // ! проверь все ли сервисы нужны
		GetInfoLocationService,
		GetInfoForecastService,
		HelpersService,
		GetCoordsService,
		DictService,
		AppService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
