// import { Patient } from "./patient";


declare namespace Login {
 export interface LoginInfo extends BaseEntity.BaseEntityResult {
  Authorization: string;
  wx: any;
  patient: Patient.PatientInfo;
 }
}
