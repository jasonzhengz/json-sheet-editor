export interface JsonData {
  [key: string]: any;
}

export interface FlattenedRow {
  [key: string]: any;
  __originalIndex: number;
}

export interface ColumnInfo {
  key: string;
  path: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'null';
}

export interface FilterState {
  [columnKey: string]: string;
}

export interface BatchEditData {
  selectedRows: number[];
  columnKey: string;
  newValue: any;
}

export interface FileData {
  data: JsonData[];
  filePath?: string;
}