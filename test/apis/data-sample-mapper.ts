import "mocha";
import "isomorphic-fetch";
import {CodingReference, DataSample, Identifier} from "../../dist";
import {v4 as uuid} from 'uuid';
import {DataSampleMapper} from "../../src/mappers/serviceDataSample";
import {assert} from "chai";

function arrayOfIdentifiers() {
  const size = Math.floor(Math.random() * 10);
  const resultArray = new Array(size);
  for(let i=0; i<size; i++) {
    resultArray[i] = new Identifier({
      id: uuid()
    })
  }
  return resultArray;
}

function setOfCodingReferences() {
  const size = Math.floor(Math.random() * 10);
  const resultArray = new Array(size);
  for(let i=0; i<size; i++) {
    resultArray[i] = new CodingReference({
      type: uuid(),
      code: uuid()
    })
  }
  return new Set(resultArray);
}

function arrayOfUUID() {
  const size = Math.floor(Math.random() * 10);
  const resultArray = new Array(size);
  for(let i=0; i<size; i++) {
    resultArray[i] = uuid();
  }
  return resultArray;
}

function randomFromArray(array: any[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function initArray(size: number, initializer: Function){
  const resultArray = new Array(size);
  for(let i=0; i<size; i++) {
    resultArray[i] = initializer();
  }
  return resultArray;
}

function createRandomDataSampleBatch(size: number) {
  const dataSamples = []
  const healthcareElements = initArray(Math.floor(size/5), () => {return new Set(arrayOfUUID())});
  const identifiers = initArray(Math.floor(size/5), arrayOfIdentifiers);
  const canvasIds = initArray(Math.floor(size/5), () => {return new Set(arrayOfUUID())});
  const contents = initArray(Math.floor(size/5), () => {return { en: { stringValue: uuid() } }; });
  const links = initArray(Math.floor(size/5), () => {return { qualifiedLink : { stringValue: uuid() } }; });
  const codes = initArray(Math.floor(size/5), setOfCodingReferences);
  const labels = initArray(Math.floor(size/5), setOfCodingReferences);

  for(let i=0;i<size;i++) {
    const newSample = new DataSample({
      id: uuid(),
      identifier: randomFromArray(identifiers),
      canvasesIds: randomFromArray(canvasIds),
      healthcareElementIds: randomFromArray(healthcareElements),
      content: randomFromArray(contents),
      qualifiedLinks: randomFromArray(links),
      codes: randomFromArray(codes),
      labels: randomFromArray(labels)
    });
    dataSamples.push(newSample);
  }

  return dataSamples;
}

describe("Data Sample Mapper", () => {
  it("DataSampleMapper can convert a DataSample to Service and back to DataSample", () => {
    const dataSampleBatch = createRandomDataSampleBatch(10);
    dataSampleBatch.forEach(sample => {
      const convertedSample = DataSampleMapper.toDataSample(DataSampleMapper.toServiceDto(sample));
      assert(convertedSample);

      assert(convertedSample.id === sample.id);

      assert(convertedSample.identifier.length === sample.identifier.length);

      assert(convertedSample.canvasesIds?.size === sample.canvasesIds?.size);

      assert(convertedSample.healthcareElementIds?.size === sample.healthcareElementIds?.size);

      assert(convertedSample.labels.size === sample.labels.size)

      sample.labels.forEach( label => {
        const convertedLabel = [...convertedSample.labels].find( el => el.code === label.code );
        assert(convertedLabel);
        assert(convertedLabel.code === label.code);
        assert(convertedLabel.type === label.type);
      });
    });
  });
});
