import 'mocha';

import {assert} from "chai";
import {DataSampleMapper} from "../../src/mappers/serviceDataSample";
import {newDataSample} from "../models/dataSampleTest";

describe('DataSample mapper test', () => {
  it('Mapping/Unmapping of DataSample model - Success', () => {
    const dataSample = newDataSample()
    const mappedDataSample = DataSampleMapper.toServiceDto(dataSample)
    assert.deepEqual(DataSampleMapper.toDataSample(mappedDataSample), dataSample)
  });
});

