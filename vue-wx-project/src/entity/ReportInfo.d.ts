declare namespace ReportInfo {
 export interface ReportInfos {
  id: number;
  recoveryGoal: string;
  recoveryTarget: string;
  content: string;
  cyclePrescription: object;
  doctor: object;
  addTime: number;
  updateTime: string;
  sex: string;
  age: string;
  patientName: string;
  height: string;
  weight: string;
  doctorName: string;
  hospital: string;
  office: string;
  sNumber: string;
  bmi: string;
  prescriptionAccomplishedNum: string;
  cyclePrescriptionCycle: string;
  dgszbNum: string;
  cdszbNum: string;
  ssNum: string;
  sxellNum: string;
  sxsllNum: string;
  sszbNum: string;
  cdsszbNum: string;
  sssNum: string;
  ssxellNum: string;
  ssxsllNum: string;
  tbNum: string;
  fcNum: string;
  fpUnm: string;
  xlbqNum: string;
  xdgsNum: string;
  xdghNum: string;
  sdMaxHrOfExercise: string;
  sdMinHrOfExercise: string;
  sdExerciseFrequencySum: string;
  sdExerciseTimeSum: string;
  sdExerciseType: string;
  jcMaxHrOfExercise: string;
  jcMinHrOfExercise: string;
  jcAvgHrOfExercise: string;
  jcMaxMets: string;
  jcMinMets: string;
  jcAvgMets: string;
  jcExerciseFrequencySum: string;
  jcExerciseTimeSum: string;
  jcExerciseType: string;
  startTime: number;
  endTime: number;
  exceptionInfoStatus: string;
 }
 export interface ReportInfoLists {
  result: ReportInfos[];
 }
 export interface ReportInfoResult {
  result: ReportInfos;
 }
}
