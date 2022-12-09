import 'mocha';

import {assert} from "chai";
import {TimeSeriesMapper} from "../../src/mappers/timeSeries";
import {newTimeSeries} from "../models/timeSeriesTest";

describe('TimeSeries mapper test', () => {
  it('Mapping/Unmapping of TimeSeries model - Success', () => {
    const timeSeries = newTimeSeries()
    const mappedTimeSeries = TimeSeriesMapper.toTimeSeriesDto(timeSeries)
    assert.deepEqual(TimeSeriesMapper.toTimeSeries(mappedTimeSeries), timeSeries)
  });
});

