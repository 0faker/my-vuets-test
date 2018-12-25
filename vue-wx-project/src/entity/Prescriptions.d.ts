declare namespace Prescriptions {
 export interface CyclePrescriptions {
  id: number;
  doctor: object;
  cycle: number;
  addTime: number;
  patient: string;
  phase: string;
  startTime: string;
  endTime: string;
  status: number;
  accomplishedNum: string;
  presetPrescription: string;
  accomplishedStatus: string;
  dailyPrescriptions: DailyPrescriptions[];
 }
 export interface DailyPrescriptions {
  id: number;
  cyclePrescription: object;
  prescriptionDate: number;
  exerciseType: string;
  exerciseTime: number;
  warmTime: number;
  relaxTime: number;
  exerciseFrequency: number;
  maxHr: number;
  minHr: number;
  remark: string;
  doctor: object;
  status: number;
  patient: string;
  addTime: number;
  updateTime: string;
  surveySpo2Interval: number;
  bpBound: string;
  minSpo2: string;
  surveyBpInterval: number;
 }
 export interface PrescriptionsDetail {

 }
}
