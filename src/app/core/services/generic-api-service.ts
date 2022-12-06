import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable, Injector} from "@angular/core";
import {Gateway} from "../interface/gateway/gateway-req";
import {Peripheral} from "../interface/peripheral/peripheral-req";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {GenericResponse} from "../interface/generic-response";

@Injectable()
export abstract class GenericApiBase {

  protected constructor(
    private injector: Injector
  ) {
  }

  protected readonly API_URL = environment.apiURL;
  protected URL_BASE = '';
  protected URL_BY_ID = '';
  protected httpParams = new HttpParams();

  private _httpClient!: HttpClient;


  /**
   * Get references of _httpClient
   */
  public get http(): HttpClient {
    if (!this._httpClient) {
      this._httpClient = this.injector.get(HttpClient);
    }
    return this._httpClient;
  }

  /**
   * Get all values, reimplementation can be used
   */
  public getAllValues(): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${this.API_URL}${this.URL_BASE}`)
  }

  /**
   * Get value by id, reimplementation can be used
   */
  public getById(id: string): Observable<GenericResponse> {
    return this.http.get<GenericResponse>(`${this.API_URL}${this.URL_BY_ID.replace(':id', id)}`)
  }

  /**
   * Create a new value
   * @param body values that will be added into a defined object
   */
  public createValue(body: Gateway | Peripheral): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(`${this.API_URL}${this.URL_BASE}`, body)
  }

  /**
   * Update value by id
   * @param id id of element that will be updated
   * @param body body width updated values
   */
  public updateById(id: string, body: Gateway | Peripheral): Observable<GenericResponse> {
    return this.http.put<GenericResponse>(this.API_URL + this.URL_BY_ID.replace(':id', id), body)
  }

  /**
   * Delete value by id
   * @param id id of element that will be deleted
   */
  public deleteById(id: string): Observable<GenericResponse> {
    return this.http.delete(this.API_URL + this.URL_BY_ID.replace(':id', id));
  }

  /**
   * Delete value by id
   * @param body ids elements that will be deleted
   */
  public deleteGroup(body: string[]): Observable<GenericResponse> {
    return this.http.delete(this.API_URL + this.URL_BASE + 'group', {body});
  }
}
