import {ActionReducerMap} from "@ngrx/store";
import {AppGrumatoState} from "./app-grumato.state";
import {componentsReducers} from '../components/components-store/components.reducer';

export const appReducers: ActionReducerMap<AppGrumatoState, any> = {
  data: componentsReducers
};
