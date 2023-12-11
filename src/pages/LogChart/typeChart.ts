export interface LogActivity {
    month: number;
    year: number;
    count: number;
  }
  
export interface LogData {
total: number;
activities: LogActivity[];
}

export interface DataLog {
  viewPostLogs: LogData;
  applyLogs: LogData;
  searchLogs: LogData;
}

export interface ResultData {
status: number;
data: DataLog;
}
  