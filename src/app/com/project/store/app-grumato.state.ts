import {DataState, initialDataState} from '../components/components-state/data.state';

export interface AppGrumatoState {
  data: DataState,
  createUser?: boolean
}

export const initialAppGrumatoState: AppGrumatoState = {
  data: initialDataState,
  createUser: false
};

export function getInitialState(): AppGrumatoState {
  return initialAppGrumatoState;
}
