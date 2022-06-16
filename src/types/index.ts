export type Response = {
    success: boolean;
    status: number;
    data?: any[];
    errors?:AError[]
    
  };

export type AError={
  param:string,
  value:string,
  message:string
}