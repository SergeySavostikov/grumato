import {DataState, initialDataState} from '../components/components-state/data.state';

export interface AppGrumatoState {
  data: DataState
}

export const initialAppGrumatoState: AppGrumatoState = {
  data: initialDataState,
};

export function getInitialState(): AppGrumatoState {
  return initialAppGrumatoState;
}
