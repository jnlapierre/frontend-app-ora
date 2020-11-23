import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import React, { useEffect } from 'react';
import { Table } from '@edx/paragon';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import messages from './messages';
import { fetchOraReports } from '../data/thunks';
import { oraDataShape } from '../../data/constants';

/**
 * Sort implementation for Paragon Table
 * @param {any} firstElement
 * @param {any} secondElement
 * @param {string} key
 * @param {string} direction
 */
const sort = function sort(firstElement, secondElement, key, direction) {
  const directionIsAsc = direction === 'asc';

  if (firstElement[key] > secondElement[key]) {
    return directionIsAsc ? 1 : -1;
  } if (firstElement[key] < secondElement[key]) {
    return directionIsAsc ? -1 : 1;
  }
  return 0;
};

function DataTable({ intl, data }) {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const blockId = Object.keys(data)[0];
      if (!data[blockId].status) {
        dispatch(fetchOraReports(courseId, blockId));
      }
    }
  }, [courseId, data]);

  // create a copy of data for sortable Table
  const sortableData = Object.values(data).slice();

  // define Table columns
  const columns = [
    {
      label: intl.formatMessage(messages.unit_name),
      key: 'vertical',
      columnSortable: true,
    },
    {
      label: intl.formatMessage(messages.assessment),
      key: 'name',
      columnSortable: true,
    },
    {
      label: intl.formatMessage(messages.total_responses),
      key: 'total',
      columnSortable: true,
    },
    {
      label: intl.formatMessage(messages.training),
      key: 'training',
      columnSortable: true,
    },
    {
      label: intl.formatMessage(messages.peer),
      key: 'peer',
      columnSortable: true,
    },
    {
      label: intl.formatMessage(messages.self),
      key: 'self',
      columnSortable: true,
    },
    {
      label: intl.formatMessage(messages.waiting),
      key: 'waiting',
      columnSortable: true,
    },
    {
      label: intl.formatMessage(messages.staff),
      key: 'staff',
      columnSortable: true,
    },
    {
      label: intl.formatMessage(messages.final_grade_received),
      key: 'done',
      columnSortable: true,
    },
  ];

  return (
    <Table
      data={sortableData}
      columns={columns.map(column => ({
        ...column,
        onSort(direction) {
          console.log('Sort in direction ', direction, column);
          sortableData.sort((firstElement, secondElement) => sort(firstElement, secondElement, column.key, direction));
        },
      }))}
      tableSortable
    />
  );
}
DataTable.propTypes = {
  intl: intlShape.isRequired,
  data: oraDataShape,
};

DataTable.defaultProps = {
  data: {},
};

export default injectIntl(DataTable);
