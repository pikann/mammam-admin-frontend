type Types = {
  default: string;
  begin: string;
  succeeded: string;
  failed: string;
  cancelled: string;
};

type ActionTypes = {
  readonly [k: string]: Types;
};

export function actionTypesFactory(
  prefix: string,
  ...actionType: string[]
): ActionTypes {
  const prefixString = prefix.length ? `${prefix}/` : '';
  return actionType.reduce(
    (acc, type) => ({
      ...acc,
      [type]: {
        default: `${prefixString}${type}`,
        begin: `${prefixString}${type}_BEGIN`,
        succeeded: `${prefixString}${type}_SUCCEEDED`,
        failed: `${prefixString}${type}_FAILED`,
        cancelled: `${prefixString}${type}_CANCELLED`,
      },
    }),
    {},
  );
}
