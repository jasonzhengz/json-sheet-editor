import { JsonData, FlattenedRow, ColumnInfo } from '../types';

export function flattenObject(obj: any, prefix = '', separator = '.'): { [key: string]: any } {
  const flattened: { [key: string]: any } = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}${separator}${key}` : key;
      const value = obj[key];

      if (value === null || value === undefined) {
        flattened[newKey] = null;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        // Recursively flatten nested objects
        const nested = flattenObject(value, newKey, separator);
        Object.assign(flattened, nested);
      } else {
        // Keep primitive values and arrays as is
        flattened[newKey] = value;
      }
    }
  }

  return flattened;
}

export function flattenJsonArray(jsonArray: JsonData[]): {
  flattenedRows: FlattenedRow[];
  columns: ColumnInfo[];
} {
  if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
    return { flattenedRows: [], columns: [] };
  }

  // First, flatten all objects and collect all possible keys
  const allFlattenedRows: { [key: string]: any }[] = [];
  const allKeys = new Set<string>();

  jsonArray.forEach((item, index) => {
    const flattened = flattenObject(item);
    allFlattenedRows.push({ ...flattened, __originalIndex: index });
    Object.keys(flattened).forEach(key => allKeys.add(key));
  });

  // Create column info
  const columns: ColumnInfo[] = Array.from(allKeys).sort().map(key => ({
    key,
    path: key,
    type: getColumnType(allFlattenedRows, key)
  }));

  // Ensure all rows have all columns (fill missing with null)
  const flattenedRows: FlattenedRow[] = allFlattenedRows.map(row => {
    const completeRow: FlattenedRow = { __originalIndex: row.__originalIndex };
    columns.forEach(column => {
      completeRow[column.key] = row.hasOwnProperty(column.key) ? row[column.key] : null;
    });
    return completeRow;
  });

  return { flattenedRows, columns };
}

function getColumnType(rows: { [key: string]: any }[], key: string): ColumnInfo['type'] {
  const values = rows
    .map(row => row[key])
    .filter(val => val !== null && val !== undefined);

  if (values.length === 0) return 'null';

  const firstValue = values[0];
  
  if (Array.isArray(firstValue)) return 'array';
  if (typeof firstValue === 'object') return 'object';
  if (typeof firstValue === 'boolean') return 'boolean';
  if (typeof firstValue === 'number') return 'number';
  return 'string';
}

export function unflattenToJsonArray(flattenedRows: FlattenedRow[]): JsonData[] {
  return flattenedRows.map(row => {
    const { __originalIndex, ...flatData } = row;
    return unflattenObject(flatData);
  });
}

function unflattenObject(flatObj: { [key: string]: any }, separator = '.'): JsonData {
  const result: JsonData = {};

  for (const key in flatObj) {
    if (flatObj.hasOwnProperty(key)) {
      const value = flatObj[key];
      if (value === null || value === undefined) {
        continue; // Skip null values when reconstructing
      }

      const keys = key.split(separator);
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in current)) {
          current[k] = {};
        }
        current = current[k];
      }

      current[keys[keys.length - 1]] = value;
    }
  }

  return result;
}

export function formatCellValue(value: any): string {
  if (value === null || value === undefined) {
    return 'null';
  }
  
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  
  return String(value);
}

export function parseCellValue(stringValue: string, originalType: ColumnInfo['type']): any {
  if (stringValue === 'null' || stringValue === '') {
    return null;
  }

  switch (originalType) {
    case 'number':
      const num = Number(stringValue);
      return isNaN(num) ? stringValue : num;
    
    case 'boolean':
      if (stringValue.toLowerCase() === 'true') return true;
      if (stringValue.toLowerCase() === 'false') return false;
      return stringValue;
    
    case 'array':
    case 'object':
      try {
        return JSON.parse(stringValue);
      } catch {
        return stringValue;
      }
    
    default:
      return stringValue;
  }
}