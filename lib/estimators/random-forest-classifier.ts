import { TaskParamType } from "@/constants/workflow.constant";

export default {
  train: [
    {
      id: "n_estimators",
      name: "Number of Estimators",
      type: TaskParamType.INTEGER_NUMBER,
      default: 100,
      helperText: "The number of trees in the forest."
    },
    {
      id: "max_depth",
      name: "Max Depth",
      type: TaskParamType.INTEGER_NUMBER,
      default: null,
      helperText: "The maximum depth of the tree. If None, then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples."
    },
    {
      id: "min_samples_split",
      name: "Min Samples Split",
      type: TaskParamType.INTEGER_NUMBER,
      default: 2,
      helperText: "The minimum number of samples required to split an internal node."
    },
    {
      id: "min_samples_leaf",
      name: "Min Samples Leaf",
      type: TaskParamType.INTEGER_NUMBER,
      default: 1,
      helperText: "The minimum number of samples required to be at a leaf node."
    },
    {
      id: "max_features",
      name: "Max Features",
      type: TaskParamType.STRING,
      options: ["1.0", "sqrt", "log2"],
      default: "1.0",
      helperText: "The number of features to consider when looking for the best split."
    },
    {
      id: "max_leaf_nodes",
      name: "Max Leaf Nodes",
      type: TaskParamType.INTEGER_NUMBER,
      default: null,
      helperText: "Grow trees with max_leaf_nodes in best-first fashion."
    },
    {
      id: "min_weight_fraction_leaf",
      name: "Min Weight Fraction Leaf",
      type: TaskParamType.FLOAT_NUMBER,
      default: 0.0,
      helperText: "The minimum weighted fraction of the sum total of weights (of all the input samples) required to be at a leaf node."
    },
    // {
    //   id: "bootstrap",
    //   name: "Bootstrap",
    //   type: TaskParamType.BOOLEAN,
    //   default: true,
    //   helperText: "Whether bootstrap samples are used when building trees."
    // },
    // {
    //   id: "oob_score",
    //   name: "OOB Score",
    //   type: TaskParamType.BOOLEAN,
    //   default: false,
    //   helperText: "Whether to use out-of-bag samples to estimate the generalization score. By default, r2_score is used."
    // },
    {
      id: "max_samples",
      name: "Max Samples",
      type: TaskParamType.FLOAT_NUMBER,
      default: null,
      helperText: "If bootstrap is True, the number of samples to draw to train each base estimator."
    },
    {
      id: "cpp_alpha",
      name: "CPP Alpha",
      type: TaskParamType.FLOAT_NUMBER,
      default: 0.0,
      helperText: "Complexity parameter used for Minimal Cost-Complexity Pruning.  By default, no pruning is performed."
    }
  ]
}