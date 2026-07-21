import { TreeNode } from "./treeNode.js";

class BalancedTree {
  constructor(myArr = []) {
    const uniqueArr = [...new Set(myArr)]; //remove the duplicates
    uniqueArr.sort((a, b) => a - b); //sort the array from small to big
    this.root = this.#buildTree(uniqueArr, 0, uniqueArr.length);
  }
  #buildTree(myArray, myStart, myEnd) {
    if (myStart > myEnd) {
      return null;
    }
    const myMiddle = Math.floor((myStart + myEnd) / 2);
    const myRoot = new TreeNode(myArray[myMiddle]);

    myRoot.setLeft(this.#buildTree(myArray, myStart, myMiddle - 1));
    myRoot.setRight(this.#buildTree(myArray, myMiddle + 1, myEnd));

    return myRoot;
  }
  includes(myValue) {
    let checkValue = this.root;
    while (checkValue != null) {
      console.log(checkValue.data);

      if (checkValue.data === myValue) {
        return true;
      }
      if (checkValue.data < myValue) {
        checkValue = checkValue.right;
      } else {
        checkValue = checkValue.left;
      }
    }
    return false;
  }
}

const tree = new BalancedTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324,
]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

prettyPrint(tree.root);
console.log(tree.includes(324));
