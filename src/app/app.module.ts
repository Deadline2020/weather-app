import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { ControlsModule } from './components/controls/controls.module';
import { MapModule } from './components/map/map.module';
import { DailyForecastModule } from './components/daily-forecast/daily-forecast.module';
import { WeeklyForecastModule } from './components/weekly-forecast/weekly-forecast.module';
import { PageHourlyForecastModule } from './components/page-hourly-forecast/page-hourly-forecast.module';
import { AppComponent } from './app.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppService } from './services/app.service';
import { GetBgImageService } from './services/get-info-bg-image.service';
import { HelpersService } from './services/helpers.service';
import { GetCoordsService } from './services/get-coords.service';
import { GetInfoLocationService } from './services/get-info-location.service';
import { GetAllInfoService } from './services/get-all-info.service';
import { GetInfoForecastService } from './services/get-info-forecast.service';
import { DictService } from './services/translate-data.service';
import { ErrorMsgService } from './services/error-msg.service';
import { FutureForecastService } from './services/future-forecast.service';
import { RouterService } from './services/router.service';
import { appReducers } from './store/reducers/app.reducers';
import { GetHourlyForecastEffects } from './store/effects/get-hourly-forecast.effects';
import { GetCityCoordsEffects } from './store/effects/get-city-coords.effects';
import { GetCurCoordsEffects } from './store/effects/get-current-coords.effects';
import { GetAllInfoEffects } from './store/effects/get-all-info.effects';

@NgModule({
	declarations: [
		AppComponent,
		ErrorMessageComponent,
		MainPageComponent,
		NotFoundComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ControlsModule,
		MapModule,
		WeeklyForecastModule,
		DailyForecastModule,
		PageHourlyForecastModule,
		StoreModule.forRoot(appReducers),
		EffectsModule.forRoot([GetAllInfoEffects, GetCurCoordsEffects, GetCityCoordsEffects, GetHourlyForecastEffects]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
	],
	providers: [
		GetAllInfoService,
		GetBgImageService,
		GetInfoLocationService,
		GetInfoForecastService,
		HelpersService,
		ErrorMsgService,
		GetCoordsService,
		DictService,
		FutureForecastService,
		RouterService,
		AppService,
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
