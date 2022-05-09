import {TimeSeries as TimeSeriesDto} from "@icure/api";
import {TimeSeries} from "../models/TimeSeries";

export namespace TimeSeriesMapper {
  export const toTimeSeries = (obj?: TimeSeriesDto) => obj ? new TimeSeries({
        fields: obj.fields,
        samples: obj.samples,
        min: obj.min,
        max: obj.max,
        mean: obj.mean,
        median: obj.median,
        variance: obj.variance,
       }): undefined;

  export const toTimeSeriesDto = (obj?: TimeSeries) => obj ? new TimeSeriesDto({
        fields: obj.fields,
        samples: obj.samples,
        min: obj.min,
        max: obj.max,
        mean: obj.mean,
        median: obj.median,
        variance: obj.variance,
    }): undefined;
}
