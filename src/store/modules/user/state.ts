
export interface UserState {
  name: string;
  role: string;
  token?: string;
  dictData: Record<string, any>
}

export const state: UserState = {
  name: "user",
  role: "root",
  dictData: {}
}