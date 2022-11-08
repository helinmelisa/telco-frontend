import { createAction, props } from '@ngrx/store';
import { Services } from 'src/app/models/services';


export const setServices = createAction(
  '[Service] Set Service',
  props<{ services: Services }>()
);