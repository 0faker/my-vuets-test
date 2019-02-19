declare namespace Prevent {
 export interface PreventInfo {
  preventiveScheme: any;
  startTime: number;
  endTime: number;
  totalExerciseTime: number;
  effectiveTime: number;
  stepNumber: number;
  maxHr: number;
  minHr: number;
  avgHr: number;
  minMets: number;
  maxMets: number;
  avgMets: number;
  metsLtoet3: number;
  metsLtoet5: number;
  metsLtoet8: number;
  metsGt8: number;
  trainFileName: string;
  warmFileName: string;
  relaxFileName: string;
  borg: number;
  borgCategory: {
   id: number;
  };
  hardwareVersion: string;
  firmwareVersion: string;
  ecgEquipmentId: string;
  platformType: number;
 }
 export class preventRecordResult {
  public result: PreventInfo;
 }
}
