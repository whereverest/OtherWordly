// Validate START.js ----------------------------------------------------------
/*
Right now it looks like it doesn't make any sense to parse START.js
and check if it contains its own properties
but in PROD START.js can be different from what we have in the app
so this approach would work as intended
PS
it's done like this for DEV environment to keep START.js as a single source of truth
 */
import dataSource from '../start.js';
import {dispatchError} from "@stores/errors";
if (IS_DEV_ENV) {
  window.dataSource = dataSource;
}
const storesNamesChecklist = dataSource.map(item => item.storeName);

function findMissedDataSourceRecords(dataSource, namesCheckList) {
  const missedNames = [];
  const dataSourceNames = dataSource.map(item => item.storeName);

  for (let i = 0; i < namesCheckList.length; i++) {
    if (!dataSourceNames.includes(namesCheckList[i])) {
      missedNames.push(namesCheckList[i]);
    }
  }

  return missedNames
}

function findUnrecognizedDataSourceRecords(dataSource, namesCheckList) {
  const unrecognizedNames = [];
  const dataSourceNames = dataSource.map(item => item.storeName);

  for (let i = 0; i < dataSourceNames.length; i++) {
    if (!namesCheckList.includes(dataSourceNames[i])) {
      unrecognizedNames.push(dataSourceNames[i]);
    }
  }

  return unrecognizedNames;
}


export default function(dataSource, storesToImport) {
  // Validate START.js
  const missedDataSourceRecords = findMissedDataSourceRecords(dataSource, storesNamesChecklist);
  const unrecognizedDataSourceRecords = findUnrecognizedDataSourceRecords(dataSource, storesNamesChecklist);

  if (missedDataSourceRecords.length) {
    dispatchError('START.js properties missing', missedDataSourceRecords, true);
  }
  if (unrecognizedDataSourceRecords.length) {
    dispatchError('START.js properties unrecognized', unrecognizedDataSourceRecords, false);
  }

  // Fill stores with data from START.js
  for (let i = 0; i < dataSource.length; i++) {
    if (storesToImport.hasOwnProperty(dataSource[i].storeName)) {
      storesToImport[dataSource[i].storeName].update(() => dataSource[i].data);
    }
  }
}