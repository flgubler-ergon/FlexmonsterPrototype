import { Injectable } from '@angular/core';
import {RowCount} from '../model/RowCount';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../model/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private readonly http: HttpClient) { }

  async loadConfig(): Promise<AppConfig> {
    const remoteUrl = `/assets/config.json`
    const response$ = this.http.get<AppConfig>(remoteUrl)
    return firstValueFrom(response$)
  }
}
