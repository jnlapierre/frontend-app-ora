import React from 'react';
import SummaryTable from './summary-table/SummaryTable';
import DataTable from './data-table/DataTable';
import { oraDataShape, oraSummaryDataShape } from '../data/constants';

function OraDashboard({ data, summary }) {
  return (
    <main>
      <div className="container-fluid">
        <h1>Open Responses</h1>
        <SummaryTable data={summary} />
        <DataTable data={data} />
      </div>
    </main>
  );
}

OraDashboard.propTypes = {
  data: oraDataShape.isRequired,
  summary: oraSummaryDataShape.isRequired,
};

export default OraDashboard;
