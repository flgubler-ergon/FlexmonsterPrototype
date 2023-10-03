import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimelineSanitizationService {

  constructor() { }

  sanitizeTimelineData(data: {[key: string]: string}[]): object[] {
    const dateKey = "DATE"
    const fullDateKey = "DATE_FULL"
    const monthYearKey = "MONTH_YEAR"
    console.log("Sanitizing data", data.slice(0, 5))
    return data.map(elem => {
      const date = elem[dateKey]
      if(date) {
        elem[fullDateKey] = ` ${date}`
        const asDate = new Date(date)
        const month = (asDate.getMonth() + 1).toString().padStart(2, '0')
        elem[monthYearKey] = `${month}.${asDate.getFullYear()}`
      }
      return elem
    })
  }
}
