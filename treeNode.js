export class TreeNode {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
  setLeft(leftValue) {
    this.left = leftValue;
  }
  setRight(rightValue) {
    this.right = rightValue;
  }
}
