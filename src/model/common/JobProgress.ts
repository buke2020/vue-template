export default class JobProgress {
  //
  minimum: Nullable<number> = null
  //
  maximum: Nullable<number> = null
  //
  position: Nullable<number> = null
  //
  percent: Nullable<number> = null
  //
  lastMessage: Nullable<string> = null
  //
  started: Nullable<boolean> = null
  //
  finished: Nullable<boolean> = null
  //
  success: Nullable<boolean> = null
  //
  result: any
  //
  successCount: Nullable<number> = null
  //
  failCount: Nullable<number> = null
  //
  ignoreCount: Nullable<number> = null
}
