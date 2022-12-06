import 'zone.js';
import 'zone.js/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserTestingModule} from "@angular/platform-browser/testing";
import {MainLayoutComponent} from './main-layout.component';
import {GatewayComponent} from "../gateway/gateway.component";
import {PeripheralComponent} from "../peripheral/peripheral.component";
import {GatewayModule} from "../gateway/gateway.module";
import {CommonModule} from "@angular/common";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeAll((async () => {
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
  }))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainLayoutComponent],
      imports: [
        GatewayModule,
        BrowserTestingModule,
        MatToolbarModule,
        MatButtonModule,
        CommonModule,
        RouterTestingModule.withRoutes(
          [
            {
              path: 'main/gateway',
              component: GatewayComponent
            },
            {
              path: 'main/peripheral',
              component: PeripheralComponent
            }]
        )],
      providers: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call the router', () => {
    const router = jest.spyOn(component._router, 'navigate');
    component.onNavigateTo('gateway');
    expect(router).toHaveBeenCalledTimes(1);
  })
});
