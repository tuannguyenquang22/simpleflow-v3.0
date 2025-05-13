---
function combineDataFrames(dataframes, options) {
  const { join_on, duplicate_columns, fill_missing } = options;

  // 1. Gộp theo chiều dòng
  let verticallyCombined = pd.concat(dataframes, axis=0);

  // 2. Gộp theo chiều cột (nếu có join_on)
  let horizontallyCombined = join_on
    ? dataframes.reduce((a, b) => pd.merge(a, b, on=join_on, how="outer"))
    : pd.concat(dataframes, axis=1);

  // 3. Xử lý duplicate columns tùy theo lựa chọn
  // 4. Xử lý missing values bằng fillna(fill_missing)

  return finalResult;
}
---


