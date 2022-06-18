export interface AccountGoogle {
  id: number;
  name: string;
  proxy: string;
  userAgent: string;
  profilePath?: string;
  isProfileExisted?: boolean;
  dateOfBirth?: string;
  gender?: string;
  fingerprintSeed?: string;
  cookies?: string;
  timezone?: string;
  permanetDevice?: string;
  latitude?: number;
  longitude?: number;
  gmail: string;
  pass: string;
  mailKP: string;
  isRegisterGoogleAccountSuccess?: boolean;
  isChangeLanguageEnglishUSSuccess?: boolean;
  isLoginGmailGoogleSuccess?: boolean;
}

// export default {};
export interface Config {
  id?: number;
  type?: string;
  key?: string;
  value?: any;
}

export interface UserObject {
  [key: string]: any;
}
