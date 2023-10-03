import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimelineSanitizationService {

  constructor() { }

  sanitizeTimelineData(data: {[key: string]: string}[]): object[] {
    const dateKey = "DATE"
    const alternateDateKey = "DATE_FULL"
    console.log("Sanitizing data", data.slice(0, 5))
    return data.map(elem => {
      const date = elem[dateKey]
      if(date) {
        elem[alternateDateKey] = ` ${date}`
      }
      return elem
    })
  }
}
