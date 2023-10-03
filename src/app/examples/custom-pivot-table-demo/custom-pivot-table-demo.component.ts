import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {getDefaultReportConfig, getTimelineReportConfig} from './DefaultReport';
import {RowCount} from '../../model/RowCount';
import {cloneDeep, isEqual, values} from 'lodash';
import {TableDataService} from '../../services/table-data.service';
import {FlexmonsterPivot} from 'ngx-flexmonster';
import {DataSource, GetDataErrorObject, GetDataValueObject} from 'flexmonster';
import {DataLoadingStrategy} from '../../model/DataLoadingStrategy';
import {ChartType} from '../../model/ChartType';
import {ExportType} from '../../model/ExportType';
import {ToolbarTabId} from '../../model/ToolbarTabId';
import {Language} from '../../model/Language';
import {ConfigService} from '../../services/config.service';
import {AppConfig} from '../../model/AppConfig';
import {DataExportService} from '../../services/data-export.service';
import {DataSourceType} from '../../model/DataSourceType';

@Component({
    selector: 'app-custom-pivot-table-demo',
    templateUrl: './custom-pivot-table-demo.component.html',
    styleUrls: ['./custom-pivot-table-demo.component.scss']
})
export class CustomPivotTableDemoComponent implements OnInit, AfterViewInit {
    @ViewChild('pivotTable') pivotTable!: FlexmonsterPivot;

    config?: AppConfig
    reportConfig!: Flexmonster.Report
    selectedDataSourceType: DataSourceType = DataSourceType.DEFAULT_DATA
    previousDataSourceType: DataSourceType = DataSourceType.DEFAULT_DATA
    selectedRowCount: RowCount = 1500
    selectedStrategy: DataLoadingStrategy = DataLoadingStrategy.LOAD_IN_FLEXMONSTER
    previousStrategy: DataLoadingStrategy = this.selectedStrategy
    selectedChartType: ChartType = 'column'
    selectedExportType: ExportType = 'excel'
    selectedLanguage: Language = Language.ENGLISH

    useDefaultToolbar: Boolean = true

    readonly availableLanguages: Language[] = values(Language)
    readonly availableDataSourceTypes: DataSourceType[] = values(DataSourceType)
    readonly defaultDataSourceType: DataSourceType = DataSourceType.DEFAULT_DATA
    readonly possibleRowCounts: RowCount[] = [150, 1500, 15000, 150000]
    readonly dataLoadingStrategies: DataLoadingStrategy[] = values(DataLoadingStrategy)
    readonly possibleChartTypes: ChartType[] = ['column', 'bar_h', 'line', 'pie', 'scatter', 'column_line', 'stacked_column']
    readonly possibleExportTypes: ExportType[] = ['csv', 'html', 'pdf', 'image', 'excel']

    private readonly hiddenTabsIds: string[] = [
        ToolbarTabId.CONNECT_DATA_SOURCE,
        ToolbarTabId.OPEN_REPORT,
        ToolbarTabId.SHARE_LINK,
    ].map(tab => tab.valueOf())

    private isShowingGrid: Boolean = true
    private isShowingChart: Boolean = false

    constructor(
        private readonly tableDataService: TableDataService,
        private readonly configService: ConfigService,
        private readonly exportService: DataExportService,
    ) { }

    ngOnInit(): void {
        this.initializeTable()
        this.loadConfig()
    }

    ngAfterViewInit(): void {
        this.initializeReportConfigListener()
    }

    dataSourceTypeChanged(): void {
        const oldValue = this.previousDataSourceType
        const newValue = this.selectedDataSourceType
        this.previousDataSourceType = newValue
        const dataSourceTypeChanged = oldValue !== newValue

        if (oldValue === newValue) {
            return
        }

        console.log("Selected new data source type", newValue)
        this.updateDataSource(newValue, this.selectedRowCount, this.selectedStrategy, this.previousStrategy, dataSourceTypeChanged)
    }
    rowCountChanged(): void {
        console.log("Selected new row count", this.selectedRowCount)
        this.updateDataSource(this.selectedDataSourceType, this.selectedRowCount, this.selectedStrategy, this.previousStrategy, false)
    }

    strategyChanged(): void {
        console.log("Selected new data loading strategy", this.selectedStrategy)
        this.updateDataSource(this.selectedDataSourceType, this.selectedRowCount, this.selectedStrategy, this.previousStrategy, false)
        this.previousStrategy = this.selectedStrategy
    }

    languageChanged(): void {
        console.log("Selected new language", this.selectedLanguage)
        const newConfig = cloneDeep(this.reportConfig)
        newConfig.localization = this.createLocalizationFilePath(this.selectedLanguage)
        this.reportConfig = newConfig
        this.pivotTable.flexmonster.setReport(newConfig)
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

    printData(): void {
        this.pivotTable.flexmonster.print()
    }

    openConfigurator(): void {
        this.pivotTable.flexmonster.openFieldsList()
    }

    openCellFormattingDialog(): void {
        console.log("Cannot open cell-formatting, conditional formatting or display-options without toolbar")
        alert("Cell-Formatting, Conditional-Formatting und Display-Options funktionieren nur über die \"offizielle\" Toolbar")
        // this.pivotTable.flexmonster.toolbar.formatCellsHandler()
        // this.pivotTable.flexmonster.toolbar.conditionalFormattingHandler()
        // this.pivotTable.flexmonster.toolbar.optionsHandler()
    }

    customizeToolbar(toolbar: Flexmonster.Toolbar) {
        toolbar.showShareReportTab = false;
        const tabs: Flexmonster.ToolbarTab[] = toolbar.getTabs()
        const newTabs: Flexmonster.ToolbarTab[] = tabs.map(tab => {
            if (this.hiddenTabsIds.includes(tab.id)) {
                tab.visible = false
            }
            if (tab.title) {
                tab.title = tab.title + "\n-Custom"
            }
            if (tab.id === ToolbarTabId.SAVE_REPORT) { // experiment: custom-icon
                // yes, this is ugly! But it seems to be the only way :-(...
                tab.icon = "<img src=\"assets/icons/save.svg\" width=\"40\" height=\"40\">"
            }
            return tab
        })
        toolbar.getTabs = () => newTabs // override the "getTabs()" to return the changed ones...
    }

    exportDataAsJson(): void {
        const resultHandler: ((rawData: GetDataValueObject, error?: GetDataErrorObject) => void) =
            (rawData: GetDataValueObject, error?: GetDataErrorObject) => {
                if (error) {
                    console.error("Failed to export data as json", error)
                } else {
                    this.exportService.exportDataAsJson(rawData.data, rawData.meta)
                }
            }

        this.pivotTable.flexmonster.getData({}, resultHandler)
    }

    private initializeTable(): void {
        const jsonUrl = this.tableDataService.createStandardDataRemoteJsonUrl(this.selectedRowCount)
        this.reportConfig = getDefaultReportConfig(jsonUrl)
    }

    private async loadConfig(): Promise<void> {
        this.config = await this.configService.loadConfig()
    }

    private initializeReportConfigListener() {
        this.pivotTable.flexmonster.on('reportchange',  () => {
            console.log("Report has changed")
            const report = this.pivotTable.flexmonster.getReport()
            if (!isEqual(report, this.reportConfig) && typeof report !== 'string') {
                this.reportConfig = report
            }
        });
    }

    private async updateDataSource(
        dataSourceType: DataSourceType,
        rowCount: RowCount,
        strategy: DataLoadingStrategy,
        previousStrategy: DataLoadingStrategy,
        dataSourceTypeChanged: boolean,
    ): Promise<void> {
        let newDataSource: DataSource

        switch (strategy) {
            case DataLoadingStrategy.LOAD_IN_FLEXMONSTER:
                newDataSource = this.createNewFilenameJsonDataSource(dataSourceType, rowCount)
                break;
            case DataLoadingStrategy.LOAD_MANUALLY:
                newDataSource = await this.createNewDirectJsonDataSource(dataSourceType, rowCount)
                break;
            case DataLoadingStrategy.NONE:
                newDataSource = { type: 'json', data: [] }
                break;
        }

        let newConfig: Flexmonster.Report
        if (dataSourceTypeChanged) {
            switch (dataSourceType) {
                case DataSourceType.DEFAULT_DATA:
                    newConfig = getDefaultReportConfig("XXX this should never be shown")
                    break;
                case DataSourceType.TIMELINE_DATA_SP500:
                    newConfig = getTimelineReportConfig("XXX this should never be shown")
                    break;

            }
        } else {
            newConfig = cloneDeep(this.reportConfig)
        }

        newConfig.dataSource = newDataSource
        this.reportConfig = newConfig


        this.pivotTable.flexmonster.updateData(newDataSource)

        if (dataSourceTypeChanged || previousStrategy === DataLoadingStrategy.NONE && strategy !== DataLoadingStrategy.NONE) {
            // the config was lost if the data was reset
            this.pivotTable.flexmonster.setReport(this.reportConfig)
        }

        console.log("Updated data source")
    }

    private createNewFilenameJsonDataSource(dataSourceType: DataSourceType, rowCount: RowCount): DataSource {
        const jsonUrl = this.createJsonUrl(dataSourceType, rowCount)
        return { type: "json", filename: jsonUrl } satisfies DataSource
    }

    private async createNewDirectJsonDataSource(dataSourceType: DataSourceType, rowCount: RowCount): Promise<DataSource> {
        const jsonUrl = this.createJsonUrl(dataSourceType, rowCount)
        const data: object[] = await this.tableDataService.loadRemoteJsonData(jsonUrl)
        return { type: 'json', data: data } satisfies DataSource
    }

    private createJsonUrl(dataSourceType: DataSourceType, rowCount: RowCount): string {
        let jsonUrl: string
        switch(dataSourceType) {
            case DataSourceType.DEFAULT_DATA:
                jsonUrl = this.tableDataService.createStandardDataRemoteJsonUrl(rowCount)
                break;
            case DataSourceType.TIMELINE_DATA_SP500:
                jsonUrl = this.tableDataService.createTimelineDataRemoteJsonUrl()
                break;

        }
        return jsonUrl
    }

    private createLocalizationFilePath(language: Language): string {
        return `/assets/localization/${language.valueOf()}.json`
    }
}
