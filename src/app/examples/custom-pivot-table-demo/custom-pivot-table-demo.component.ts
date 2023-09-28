import {Component, OnInit, ViewChild} from '@angular/core';
import {getDefaultReportConfig} from './DefaultReport';
import {RowCount} from '../../model/RowCount';
import {cloneDeep, values} from 'lodash';
import {TableDataService} from '../../services/table-data.service';
import {FlexmonsterPivot} from 'ngx-flexmonster';
import {DataSource} from 'flexmonster';
import {DataLoadingStrategy} from '../../model/DataLoadingStrategy';
import {ChartType} from '../../model/ChartType';
import {ExportType} from '../../model/ExportType';

@Component({
    selector: 'app-custom-pivot-table-demo',
    templateUrl: './custom-pivot-table-demo.component.html',
    styleUrls: ['./custom-pivot-table-demo.component.scss']
})
export class CustomPivotTableDemoComponent implements OnInit {
    @ViewChild('pivotTable') pivotTable!: FlexmonsterPivot;

    reportConfig!: Flexmonster.Report
    selectedRowCount: RowCount = 1500
    selectedStrategy: DataLoadingStrategy = DataLoadingStrategy.LOAD_IN_FLEXMONSTER
    previousStrategy: DataLoadingStrategy = this.selectedStrategy
    selectedChartType: ChartType = 'column'
    selectedExportType: ExportType = 'excel'

    readonly possibleRowCounts: RowCount[] = [150, 1500, 15000, 150000]
    readonly dataLoadingStrategies: DataLoadingStrategy[] = values(DataLoadingStrategy)
    readonly possibleChartTypes: ChartType[] = ['column', 'bar_h', 'line', 'pie', 'scatter', 'column_line', 'stacked_column']
    readonly possibleExportTypes: ExportType[] = ['csv', 'html', 'pdf', 'image', 'excel']

    private isShowingGrid: Boolean = true
    private isShowingChart: Boolean = false

    constructor(
        private readonly tableDataService: TableDataService
    ) { }

    ngOnInit(): void {
        this.initializeTable()
    }

    rowCountChanged(): void {
        console.log("Selected new row count", this.selectedRowCount)
        this.updateDataSource(this.selectedRowCount, this.selectedStrategy, this.previousStrategy)
    }

    strategyChanged(): void {
        console.log("Selected new data loading strategy", this.selectedStrategy)
        this.updateDataSource(this.selectedRowCount, this.selectedStrategy, this.previousStrategy)
        this.previousStrategy = this.selectedStrategy
    }

    chartTypeChanged(): void {
        console.log("Selected new chart-type", this.selectedChartType)
        if (this.isShowingChart) {
            this.showChart() // change chart-type
        }
    }

    showChart(): void {
        this.pivotTable.flexmonster.showCharts(this.selectedChartType)
        this.isShowingChart = true
        this.isShowingGrid = false
    }

    showTable(): void {
        this.pivotTable.flexmonster.showGrid()
        this.isShowingChart = false
        this.isShowingGrid = true
    }

    saveReportConfig(): void {
        this.pivotTable.flexmonster.save({
            filename: "ReportConfig.json"
        })
    }

    exportData(): void {
        this.pivotTable.flexmonster.exportTo(this.selectedExportType)
    }

    private initializeTable(): void {
        const jsonUrl = this.tableDataService.createRemoteJsonUrl(this.selectedRowCount)
        this.reportConfig = getDefaultReportConfig(jsonUrl)
    }

    private async updateDataSource(
        rowCount: RowCount,
        strategy: DataLoadingStrategy,
        previousStrategy: DataLoadingStrategy,
    ): Promise<void> {
        let newDataSource: DataSource

        switch (strategy) {
            case DataLoadingStrategy.LOAD_IN_FLEXMONSTER:
                newDataSource = this.createNewFilenameJsonDataSource(rowCount)
                break;
            case DataLoadingStrategy.LOAD_MANUALLY:
                newDataSource = await this.createNewDirectJsonDataSource(rowCount)
                break;
            case DataLoadingStrategy.NONE:
                newDataSource = { type: 'json', data: [] }
                break;
        }

        const newConfig = cloneDeep(this.reportConfig)
        newConfig.dataSource = newDataSource
        this.reportConfig = newConfig


        this.pivotTable.flexmonster.updateData(newDataSource)

        if (previousStrategy === DataLoadingStrategy.NONE && strategy !== DataLoadingStrategy.NONE) {
            // the config was lost if the data was reset
            this.pivotTable.flexmonster.setReport(this.reportConfig)
        }

        console.log("Updated data source")
    }

    private createNewFilenameJsonDataSource(rowCount: RowCount): DataSource {
        const jsonUrl = this.tableDataService.createRemoteJsonUrl(rowCount)
        return { type: "json", filename: jsonUrl } satisfies DataSource
    }

    private async createNewDirectJsonDataSource(rowCount: RowCount): Promise<DataSource> {
        const data: object[] = await this.tableDataService.loadRemoteJsonData(rowCount)
        return { type: 'json', data: data } satisfies DataSource
    }
}
