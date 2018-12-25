class ApiPath {
 // 登录第一步(code验证登录)
   getAuth: string = 'cp/auth/get_patient_info_from_wx';
 // 登录第二步(验证码登录)
   login: string = '/cp/auth/regist_patient_with_wx';
}
export default new ApiPath();
