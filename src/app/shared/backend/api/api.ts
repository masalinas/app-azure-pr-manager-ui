export * from './pingController.service';
import { PingControllerService } from './pingController.service';
export * from './poolRequestController.service';
import { PoolRequestControllerService } from './poolRequestController.service';
export const APIS = [PingControllerService, PoolRequestControllerService];
