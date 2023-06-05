import { Request } from 'express';
import { PostModel } from 'model/post';
import { FilterTypes } from 'services/filter/filtersTypes';
import { rangeFilter } from 'services/filter/rangeFilter';
import { valueFilter } from 'services/filter/valueFilter';

export const filterHelper = {
  filterToQuery: function (req: Request) {
    const typeFilter = req.body.typeFilter ? req.body.typeFilter : '';
    switch (typeFilter) {
      case FilterTypes.rangeFilter: {
        return rangeFilter({ field: req.body.field, from: req.body.from, to: req.body.to });
      }
      case FilterTypes.valueFilter: {
        return valueFilter({ field: req.body.field, value: req.body.value });
      }
      default: {
        return null;
      }
    }
  },
  applyQueries: async function (filters: any[]) {
    const posts = await PostModel.aggregate(filters);
    return posts;
  }
};
