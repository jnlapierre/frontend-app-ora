import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import React from 'react';
import messages from './messages';
import LoadingOrValue from '../../components/value-or-loading/ValueOrLoading';
import { oraSummaryDataShape } from '../../data/constants';

function SummaryTable({ intl, data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>
            {intl.formatMessage(messages.units)}
          </th>
          <th>
            {intl.formatMessage(messages.assessments)}
          </th>
          <th>
            {intl.formatMessage(messages.total_responses)}
          </th>
          <th>
            {intl.formatMessage(messages.training)}
          </th>
          <th>
            {intl.formatMessage(messages.peer)}
          </th>
          <th>
            {intl.formatMessage(messages.self)}
          </th>
          <th>
            {intl.formatMessage(messages.waiting)}
          </th>
          <th>
            {intl.formatMessage(messages.staff)}
          </th>
          <th>
            {intl.formatMessage(messages.final_grade_received)}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><LoadingOrValue value={data.units} /></td>
          <td><LoadingOrValue value={data.assessments} /></td>
          <td><LoadingOrValue value={data.total} /></td>
          <td><LoadingOrValue value={data.training} /></td>
          <td><LoadingOrValue value={data.peer} /></td>
          <td><LoadingOrValue value={data.self} /></td>
          <td><LoadingOrValue value={data.waiting} /></td>
          <td><LoadingOrValue value={data.staff} /></td>
          <td><LoadingOrValue value={data.done} /></td>
        </tr>
      </tbody>
    </table>
  );
}
SummaryTable.propTypes = {
  intl: intlShape.isRequired,
  data: oraSummaryDataShape.isRequired,
};

export default injectIntl(SummaryTable);
