import { createReducer, on } from "@ngrx/store";
import { setServices } from "./service.action";
import { initialServiceState, ServiceState } from "./service.state";

export const serviceReducer = createReducer<ServiceState>(
    initialServiceState,
    on(setServices, (currentState, action) => {
      console.log(action);
  
      return { ...currentState, services: action.services };
    })
  );