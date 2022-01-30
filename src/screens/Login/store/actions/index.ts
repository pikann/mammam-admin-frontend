import {createActionGenerator} from '../../../../utils/actionGenerator';
import {actionTypesFactory} from '../../../../utils/actionTypesFactory';

export const Types = actionTypesFactory('LOGIN', 'LOGIN', 'LOADING');

export const login = createActionGenerator(Types.LOGIN);
export const showLoading = createActionGenerator(Types.LOADING);
