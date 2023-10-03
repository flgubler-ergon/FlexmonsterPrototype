import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataExportService {

  constructor(private readonly router: Router) { }

  async exportDataAsJson(data: object[], metaData: object): Promise<void> {
    console.log("Exporting data as json. MetaData = ", metaData)
    const stringified = JSON.stringify(data)
    const partialUrl = encodeURIComponent(stringified)
    const fullUrl = `text/json;charset=utf-8,${partialUrl}`
    await this.router.navigateByUrl(fullUrl)
    console.log("JSON Export complete")
  }
}
