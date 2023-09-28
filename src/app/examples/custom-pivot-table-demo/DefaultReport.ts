export function getDefaultReportConfig(remoteJsonUrl: string): Flexmonster.Report {
    console.log("Creating default report for", remoteJsonUrl)
    return {
        dataSource: {
            type: "json",
            filename: remoteJsonUrl,
        },
        slice: {
            rows: [
                { uniqueName: "country"},
                { uniqueName: "timezone" },
                { uniqueName: "name" }
            ],
            columns: [
                { uniqueName: "[Measures]" }
            ],
            measures: [
                {
                    uniqueName: "geonameid",
                    aggregation: "count"
                },
                {
                    uniqueName: "population",
                    aggregation: "average"
                }
            ],
            expands: {
                rows: [
                    { tuple: ["country.[andorra]"] },
                    { tuple: ["country.[andorra]", "timezone.[europe/andorra]"] }
                ]
            }
        },
        options: {
            chart: {
                type: "column_line"
            }
        },
        version: "2.9.26",
        creationDate: "2022-06-07T12:54:06.559Z"
    }
}
