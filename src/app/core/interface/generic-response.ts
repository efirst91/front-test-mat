export interface GenericResponse {
  data?: any;
  total?: number;
  error?: boolean,
  success?: boolean
}

export interface CustomModel {
  gatewayId?: string;
  peripheral?: string;
  message?: string;
}
