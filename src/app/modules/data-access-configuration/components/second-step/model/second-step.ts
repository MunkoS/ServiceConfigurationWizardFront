import { IconDefinition } from '@fortawesome/fontawesome-common-types';

export enum OperationStatus {
  loading = 'выполняется...',
  error = 'сбой',
  success = 'успешно'
}

type OperationInfo = {
  title: string;
  iconOperation: IconDefinition;
  operationStatus: OperationStatus;
  message: string;
  showMessage: boolean;
};

export type SecondStepInfo = {
  sql: OperationInfo;
  service: OperationInfo;
  db: OperationInfo;
};
