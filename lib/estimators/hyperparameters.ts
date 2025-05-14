import RandomForestRegressor from "./random-forest-regressor";

export function getHyperparameters({
  estimatorType,
}: {
  estimatorType: string;
}) {
  switch (estimatorType) {
    case "random_forest_regressor":
      return RandomForestRegressor
  }
}