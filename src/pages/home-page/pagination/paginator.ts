type cacheKey = 0 | 1 | 2 | 3 | 4 | 5;

class Cache {
  static readonly c0 = null;
  static readonly c1 = null;
  static readonly c2 = [1, 2];
  static readonly c3 = Cache.c2.concat(3);
  static readonly c4 = Cache.c3.concat(4);
  static readonly c5 = Cache.c4.concat(5);

  static readonly cache = {
    0: Cache.c0,
    1: Cache.c1,
    2: Cache.c2,
    3: Cache.c3,
    4: Cache.c4,
    5: Cache.c5,
  };

  static read = (cacheKey: cacheKey) => Cache.cache[cacheKey];
}

const range = ({ length, start }: { length: number; start: number }) =>
  Array.from({ length }, (_, i) => start + i + 1);

type params = {
  page: number;
  size: number;
};

// example output
// (params.size, params.page) -> [ ... ]
// (0, _) -> null
// (1, _) -> null
// (2, _) -> [1, 2]
// (3, _) -> [1, 2, 3]
// (4, _) -> [1, 2, 3, 4]
// (5, _) -> [1, 2, 3, 4, 5]
//
// (6, 1) -> [  .1.  2   3  ...  6   ]
// (6, 2) -> [ 1  .2.  3   4   5   6 ]
// (6, 3) -> [ 1   2  .3.  4   5   6 ]
// (6, 4) -> [ 1   2   3  .4.  5   6 ]
// (6, 5) -> [ 1   2   3   4  .5.  6 ]
// (6, 6) -> [   1  ...  4   5  .6.  ]
//
// (7, 1) -> [    .1.  2   3  ...  7     ]
// (7, 2) -> [   1  .2.  3   4  ...  7   ]
// (7, 3) -> [ 1   2  .3.  4   5   6   7 ]
// (7, 4) -> [ 1   2   3  .4.  5   6   7 ]
// (7, 5) -> [ 1   2   3   4  .5.  6   7 ]
// (7, 6) -> [   1  ...  4   5  .6.  7   ]
// (7, 7) -> [     1  ...  5   6  .7.    ]
export default (params: params) => {
  if (params.size < 6) {
    return Cache.read(params.size as cacheKey);
  } else {
    const before =
      params.page > 5
        ? [
            1,
            range({
              length: params.page - 4,
              start: 1,
            }),
            params.page - 2,
            params.page - 1,
          ]
        : range({
            length: params.page - 1,
            start: 0,
          });

    const after =
      params.size - (params.page + 3) > 1
        ? [
            params.page + 1,
            params.page + 2,
            range({
              length: params.size - (params.page + 3),
              start: params.page + 2,
            }),
            params.size,
          ]
        : range({
            length: params.size - params.page,
            start: params.page,
          });

    return before.concat(params.page).concat(after);
  }
};
