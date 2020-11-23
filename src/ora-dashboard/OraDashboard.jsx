import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@edx/paragon';
import SummaryTable from './summary-table/SummaryTable';
import DataTable from './data-table/DataTable';
import { oraDataShape, oraSummaryDataShape, RequestStatus } from '../data/constants';
import { loadingStatus } from './data/selectors';

function OraDashboard({ data, summary }) {
  const status = useSelector(loadingStatus);

  return (
    <main>
      <div className="container-fluid">
        <h1>Open Responses</h1>
        {status === RequestStatus.IN_PROGRESS && <Spinner animation="border" variant="primary" />}
        {status === RequestStatus.SUCCESSFUL && (
          <div>
            <SummaryTable data={summary} />
            <DataTable data={data} />
          </div>
        )}

      </div>
    </main>
  );
}

OraDashboard.propTypes = {
  data: oraDataShape.isRequired,
  summary: oraSummaryDataShape.isRequired,
};

export default OraDashboard;
