import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pivot-table-demo',
    templateUrl: './pivot-table-demo.component.html',
    styleUrls: ['./pivot-table-demo.component.scss']
})
export class PivotTableDemoComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    customizeToolbar(toolbar: Flexmonster.Toolbar) {
        toolbar.showShareReportTab = true;
    }

}
