declare module Assessment {
 export interface AssessmentInfo {
  patient: Patient.PatientInfo;
  preventiveScheme: PreventiveScheme;
  startTime: number;
  endTime: number;
  totalExerciseTime: number;
  effectiveTime: number;
  totalDistance: number;
  totalStepNumber: number;
  staticPhase: number;
  recoveryPhase: number;
  staticHr: number;
  maxHr: number;
  minHr: number;
  avgHr: number;
  minMets: number;
  maxMets: number;
  avgMets: number;
  age: number;
  height: number;
  weight: number;
  bmi: number;
  trainFileName: string;
  hrInterval: string;
  turnedDistance: number;
  preBorg: number;
  borg: number;
  borgCategory: {
   id: number
  };
  hardwareVersion: string;
  firmwareVersion: string;
  ecgEquipmentId: string;
  platformType: number;
 }
 export interface PreventiveScheme {
  cycle: number;
  endTime: number;
  exerciseFrequency: number;
  exerciseType: string;
  warmTime: number;
  trainTime: number;
  relaxTime: number;
  maxHr: number;
  minHr: number;
  isCurrent: number;
  // 0 不是目前设置的方案 1是目前设置的方案
  canSet: number;
  // 0 不可以设为新方案 1可以设置为新方案

  isLatest: boolean;
 }
}