import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import React from 'react';
import { Table } from '@edx/paragon';
import messages from './messages';
import { oraSummaryDataShape } from '../../data/constants';

function SummaryTable({ intl, data }) {
  const columns = [
    {
      label: intl.formatMessage(messages.units),
      key: 'units',
    },
    {
      label: intl.formatMessage(messages.assessments),
      key: 'assessments',
    },
    {
      label: intl.formatMessage(messages.total_responses),
      key: 'total',
    },
    {
      label: intl.formatMessage(messages.training),
      key: 'training',
    },
    {
      label: intl.formatMessage(messages.peer),
      key: 'peer',
    },
    {
      label: intl.formatMessage(messages.self),
      key: 'self',
    },
    {
      label: intl.formatMessage(messages.waiting),
      key: 'waiting',
    },
    {
      label: intl.formatMessage(messages.staff),
      key: 'staff',
    },
    {
      label: intl.formatMessage(messages.final_grade_received),
      key: 'done',
    },
  ];
  return (
    <Table
      data={[data]}
      columns={columns}
    />
  );
}
SummaryTable.propTypes = {
  intl: intlShape.isRequired,
  data: oraSummaryDataShape.isRequired,
};

export default injectIntl(SummaryTable);
