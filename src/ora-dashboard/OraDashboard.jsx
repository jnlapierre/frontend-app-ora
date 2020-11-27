import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from '@edx/paragon';
import SummaryTable from './summary-table/SummaryTable';
import DataTable from './data-table/DataTable';
import { oraDataShape, oraSummaryDataShape, RequestStatus } from '../data/constants';
import { loadingStatus } from './data/selectors';
import messages from './messages';

function OraDashboard({ intl, data, summary }) {
  const status = useSelector(loadingStatus);

  return (
    <main>
      <div className="container-fluid">
        <h1>{intl.formatMessage(messages.section_heading)}</h1>
        {status === RequestStatus.IN_PROGRESS && <Spinner animation="border" variant="primary" />}
        {status === RequestStatus.SUCCESSFUL && (
          <>
            <SummaryTable data={summary} />
            <DataTable data={data} />
          </>
        )}

      </div>
    </main>
  );
}

OraDashboard.propTypes = {
  intl: intlShape.isRequired,
  data: oraDataShape.isRequired,
  summary: oraSummaryDataShape.isRequired,
};

export default injectIntl(OraDashboard);
