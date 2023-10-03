export function getDefaultReportConfig(remoteJsonUrl: string): Flexmonster.Report {
    console.log('Creating default report for', remoteJsonUrl)
    return {
        dataSource: {
            type: 'json',
            filename: remoteJsonUrl,
        },
        slice: {
            rows: [
                { uniqueName: "country" },
                { uniqueName: "timezone" },
                { uniqueName: "name" }
            ],
            columns: [
                { uniqueName: "[Measures]" }
            ],
            measures: [
                { uniqueName: "geonameid", aggregation: "count", format: "-18slh78ccxfc00" },
                { uniqueName: "population", aggregation: "average" }
            ]
        },
        options: {
            chart: { type: "bar_h" }
        },
        conditions: [
            {
                formula: "#value < 5000",
                measure: "geonameid",
                aggregation: "count",
                format: {
                    backgroundColor: "#3F51B5",
                    color: "#8BC34A",
                    fontFamily: "Arial",
                    fontSize: "12px"
                }
            }
        ],
        formats: [
            { name: "-18slh78ccxfc00", textAlign: "center" }
        ],
        version: "2.9.60",
        creationDate: "2023-09-29T09:21:28.904Z"
    }
}

export function getTimelineReportConfig(remoteJsonUrl: string): Flexmonster.Report {
    return {
        dataSource: { type: "json", filename: remoteJsonUrl },
        slice: {
            rows: [
                { uniqueName: "DATE.Year" },
                { uniqueName: "DATE.Month" },
                { uniqueName: "DATE.Day" }
            ],
            columns: [ { uniqueName: "[Measures]" } ],
            measures: [
                {
                    uniqueName: "SP500",
                    aggregation: "sum"
                }
            ],
            expands: {
                rows: [ { tuple: ["date.year.[2018]"]} ]
            }
        },
        options: {
            chart: { type: "bar_h" }
        },
        conditions: [
            {
                formula: "#value < 5000",
                measure: "geonameid",
                aggregation: "count",
                format: {
                    backgroundColor: "#3F51B5",
                    color: "#8BC34A",
                    fontFamily: "Arial",
                    fontSize: "12px"
                }
            }
        ],
        formats: [],
        version: "2.9.60",
        creationDate: "2023-10-03T11:11:19.250Z"
    } satisfies Flexmonster.Report
}
