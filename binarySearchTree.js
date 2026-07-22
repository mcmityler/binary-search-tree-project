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

    //fixes problem i had with it adding one null node at the last right branch
    if (myArray[myMiddle] === undefined) return null;

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
  insert(myValue) {
    let checkValue = this.root;
    const myRoot = new TreeNode(myValue);

    while (checkValue != null) {
      if (checkValue.data === myValue) {
        console.log("exists already: " + myValue);
        return; //already exists in tree
      }
      if (checkValue.data < myValue) {
        if (checkValue.right === null) {
          checkValue.setRight(myRoot);
          return;
        }
        checkValue = checkValue.right;
      } else {
        if (checkValue.left === null) {
          checkValue.setLeft(myRoot);
          return;
        }
        checkValue = checkValue.left;
      }
    }
  }
  getSuccessor(myRoot) {
    myRoot = myRoot.right;
    while (myRoot !== null && myRoot.left !== null) {
      myRoot = myRoot.left;
    }
    return myRoot;
  }
  deleteItem(myRoot, myValue) {
    if (myRoot === null) {
      return myRoot;
    }

    if (myRoot.data > myValue) {
      myRoot.left = this.deleteItem(myRoot.left, myValue);
    } else if (myRoot.data < myValue) {
      myRoot.right = this.deleteItem(myRoot.right, myValue);
    } else {
      if (myRoot.left === null) {
        return myRoot.right;
      }
      if (myRoot.right === null) {
        return myRoot.left;
      }

      const mySuccessor = this.getSuccessor(myRoot);
      myRoot.data = mySuccessor.data;
      myRoot.right = this.deleteItem(myRoot.right, mySuccessor.data);
    }
    return myRoot;
  }
  levelOrderForEach(myCallback, myRoot) {
    if (myCallback === undefined) {
      throw new Error("No callback provided!");
    }

    if (myRoot === null) return;

    const queue = [];
    queue.push(myRoot);

    while (queue.length != 0) {
      const myCurrent = queue[0];
      myCallback(myCurrent.data);
      if (myCurrent.left !== null) queue.push(myCurrent.left);
      if (myCurrent.right !== null) queue.push(myCurrent.right);
      queue.shift();
    }
  }
  inOrderForEach(myCallback, myRoot) {
    if (myRoot === null) return;
    this.inOrderForEach(myCallback, myRoot.left);
    myCallback(myRoot.data);
    this.inOrderForEach(myCallback, myRoot.right);
  }
  preOrderForEach(myCallback, myRoot) {
    if (myRoot === null) return;
    myCallback(myRoot.data);
    this.preOrderForEach(myCallback, myRoot.left);
    this.preOrderForEach(myCallback, myRoot.right);
  }
  postOrderForEach(myCallback, myRoot) {
    if (myRoot === null) return;
    this.postOrderForEach(myCallback, myRoot.left);
    this.postOrderForEach(myCallback, myRoot.right);
    myCallback(myRoot.data);
  }
}

// const tree = new BalancedTree([1, 7, 4]);
const tree = new BalancedTree([
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 24,
]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const logPrint = (value) => {
  console.log(value);
};

prettyPrint(tree.root);
console.log(tree.includes("null"));
tree.insert(322);
tree.insert(6633);
tree.insert(99);
tree.insert(99);
// tree.deleteItem(tree.root, 99);
prettyPrint(tree.root);
// tree.levelOrderForEach(logPrint, tree.root);
// tree.inOrderForEach(logPrint, tree.root);
// tree.preOrderForEach(logPrint, tree.root);
tree.postOrderForEach(logPrint, tree.root);
