import { Injectable } from '@angular/core';
import {RowCount} from '../model/RowCount';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  constructor(
      private readonly http: HttpClient
  ) {}

  createRemoteJsonUrl(rowCount: RowCount): string {
    const host = location.origin
    return `${host}/assets/geo_dataset_reduced_${rowCount}.json`
  }

  async loadRemoteJsonData(rowCount: RowCount): Promise<object[]> {
    const remoteUrl = this.createRemoteJsonUrl(rowCount)
    const response$ = this.http.get<object[]>(remoteUrl)
    return firstValueFrom(response$)
  }
}
