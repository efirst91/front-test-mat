import 'zone.js';
import 'zone.js/testing';

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GatewayComponent} from './gateway.component';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";
import {EditComponent} from "./edit/edit.component";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {GatewayRoutingModule} from "./gateway-routing.module";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {MatListModule} from "@angular/material/list";
import {LoadingComponentModule} from "../../shared/components/loading/loading-component.module";
import {PeripheralListPipeModule} from "../../core/pipes/peripheral-list/peripheral-list.module";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CommonModule} from "@angular/common";
import {ListGatewayService} from "./services/list/list-gateway.service";
import {GatewayCrudService} from "./services/crud/gateway-crud.service";
import {NotificationsService} from "../../core/services/notifications.service";
import {PeripheralCrudService} from "../peripheral/services/crud/peripheral-crud.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Gateway} from "../../core/interface/gateway/gateway-req";
import requireMock = jest.requireMock;
import {of} from "rxjs";

describe('GatewayComponent', () => {
  let component: GatewayComponent;
  let fixture: ComponentFixture<GatewayComponent>;
  let gateways: Gateway [] = [
    {
      serialNumber: "49c5f9e7-f8b7-4d34-ae4e-a8b869db5c2a",
      humanReadableName: "test",
      ipv4: "125.23.12.5",
      peripheralsDevices: []
    },
    {
      serialNumber: "49c5f9e7-f8b7-4d34-ae4e-a8b869dber56",
      humanReadableName: "test3",
      ipv4: "125.23.12.2",
      peripheralsDevices: []
    }
  ];

  const mockGroupResponse = require('./mock-data/delete-groups.json');
  let _gatewayCrudService: GatewayCrudService;

  beforeAll((async () => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  }))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GatewayComponent, EditComponent],
      imports: [
        CommonModule,
        MatDialogModule,
        MatTooltipModule,
        GatewayRoutingModule,
        HttpClientTestingModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatMenuModule,
        MatListModule,
        LoadingComponentModule,
        PeripheralListPipeModule,
        ReactiveFormsModule
      ],
      providers: [
        ListGatewayService,
        GatewayCrudService,
        MatDialog,
        NotificationsService,
        PeripheralCrudService,
        FormBuilder
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayComponent);
    component = fixture.componentInstance;
    _gatewayCrudService = TestBed.inject(GatewayCrudService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check update action', () => {
    component.ngOnInit();
    component.onUpdate();
    expect(component.loadingData).toBeTruthy();
  })

  it('on delete group action', () => {
    component.selection.select(...gateways);
    const service = jest.spyOn(_gatewayCrudService, 'deleteGroup').mockReturnValue(of(mockGroupResponse.DeleteGroup));
    // _gatewayCrudService.deleteGroup([]).subscribe(
    //   response => {
    const result = {
      "data": {
        "message": "All gateways were be deleted successfully"
      },
      "success": true
    };
    component.onDeleteGroup();
    fixture.detectChanges();
    expect(service).toHaveBeenCalledTimes(1);
    // expect(component.dataSource).toEqual(result);

  })

  it('delete error', () => {
    component.selection.select(...gateways);
    const service = jest.spyOn(_gatewayCrudService, 'deleteGroup').mockReturnValue(of(mockGroupResponse.DeleteGroupKo));
  })
});
