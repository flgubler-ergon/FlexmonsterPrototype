export function getDefaultReportConfig(remoteJsonUrl: string, localization: string): Flexmonster.Report {
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
