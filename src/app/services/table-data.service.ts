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

  createStandardDataRemoteJsonUrl(rowCount: RowCount): string {
    const fileName = `geo_dataset_reduced_${rowCount}`
    const fileEnding = 'json'
    return this.createRemoteJsonUrlForFile(fileName, fileEnding)
  }

  createTimelineDataRemoteJsonUrl(): string {
    return this.createRemoteJsonUrlForFile('SP500', 'json')
  }

  private createRemoteJsonUrlForFile(filename: string, fileEnding: string = 'json'): string {
    return `/assets/${filename}.${fileEnding}`
  }

  async loadRemoteJsonData(remoteUrl: string): Promise<object[]> {
    const response$ = this.http.get<object[]>(remoteUrl)
    return firstValueFrom(response$)
  }
}
