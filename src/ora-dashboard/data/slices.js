/* eslint-disable no-param-reassign,import/prefer-default-export */
import {
  createSlice,
} from '@reduxjs/toolkit';
import {
  RequestStatus,
} from '../../data/constants';

function oraBlocksFromResponse(response) {
  const oraBlocks = {};
  const { blocks } = response;
  const courseBlock = blocks[response.root];

  function iterBlock(block, parentData) {
    if (block.type === 'openassessment') {
      oraBlocks[block.id] = {
        name: block.display_name,
        id: block.id,
        ...parentData,
      };
    } else if (block.children) {
      block.children.forEach((blockId) => {
        iterBlock(blocks[blockId], {
          [block.type]: block.display_name,
          ...parentData,
        });
      });
    }
  }

  iterBlock(courseBlock, {});

  return oraBlocks;
}

/**
 * Given a get_ora2_responses API response, set statistics for each ORA Block.
 * Also assign default value if there is no statistics for any block.
 * @param {array} blockIds - list of blockIdx in current course
 * @param {object} payload - get_ora2_responses api response
 */
function oraBlockStatisticsFromPayload(blockIds, payload) {
  const blocks = {};
  const defaultValues = {
    status: RequestStatus.SUCCESSFUL,
    total: 0,
    training: 0,
    peer: 0,
    self: 0,
    waiting: 0,
    staff: 0,
    done: 0,
  };
  blockIds.forEach(blockId => {
    blocks[blockId] = { ...defaultValues, ...payload[blockId] };
  });
  return blocks;
}

/**
 * Given current state.oraBlocks object, prepares summary.
 * @param {object} data - state.oraBlocks
 */
function prepareStatisticsSummary(data) {
  const dataKeys = Object.keys(data);
  const dataItemArr = dataKeys.map((key) => data[key]);
  const sumByKey = (key) => dataItemArr.map((item) => item[key]).reduce((result, val) => result + val, 0);
  const fields = ['total', 'training', 'peer', 'self', 'waiting', 'staff', 'done'];
  const summaryData = {
    units: dataKeys.length,
    assessments: dataKeys.length,
  };

  if (dataKeys.length > 0 && data[dataKeys[0]].status === RequestStatus.SUCCESSFUL) {
    fields.forEach(field => {
      summaryData[field] = sumByKey(field);
    });
  } else if (dataKeys.length === 0) {
    // there is no ORA block in the course.
    fields.forEach(field => {
      summaryData[field] = 0;
    });
  }
  return summaryData;
}

const oraSlice = createSlice({
  name: 'ora',
  initialState: {
    status: RequestStatus.IN_PROGRESS,
    blocks: {},
    summary: {},
  },
  reducers: {
    fetchOraBlocksRequest: (state) => {
      state.status = RequestStatus.IN_PROGRESS;
    },
    fetchOraBlocksSuccess: (state, { payload }) => {
      state.status = RequestStatus.SUCCESSFUL;
      state.blocks = oraBlocksFromResponse(payload);
    },
    fetchOraBlocksFailed: (state) => {
      state.status = RequestStatus.FAILED;
    },
    fetchOraBlocksDenied: (state) => {
      state.status = RequestStatus.DENIED;
    },
    fetchOraReportRequest: (state, { payload }) => {
      state.blocks[payload.blockId].status = RequestStatus.IN_PROGRESS;
    },
    fetchOraReportSuccess: (state, { payload }) => {
      const statistics = oraBlockStatisticsFromPayload(Object.keys(state.blocks), payload);
      Object.keys(state.blocks).forEach(blockId => {
        state.blocks[blockId] = { ...state.blocks[blockId], ...statistics[blockId] };
      });
      // as statistics updated, update summary too.
      state.summary = prepareStatisticsSummary(state.blocks);
    },
    fetchOraReportFailed: (state, { payload }) => {
      state.blocks[payload.blockId].status = RequestStatus.FAILED;
    },
    fetchOraReportDenied: (state, { payload }) => {
      state.blocks[payload.blockId].status = RequestStatus.DENIED;
    },
  },
});

export const {
  fetchOraBlocksRequest,
  fetchOraBlocksSuccess,
  fetchOraBlocksFailed,
  fetchOraReportFailed,
  fetchOraReportRequest,
  fetchOraReportSuccess,
} = oraSlice.actions;

export const oraReducer = oraSlice.reducer;
