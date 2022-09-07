const h = (type, props, ...children) => ({
  type, props, children
});

const createElement = (node) => {
  if (typeof node === "string") {
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  node.children.map(createElement).forEach((child) => $el.appendChild(child));
  return $el;
};

const updateElement = (parent, newNode, oldNode, index = 0) => {
  if (!newNode) {
    console.log(newNode)
    return parent.removeChild(parent.childNodes[index]);
  } else if (!oldNode) {
    return parent.appendChild(createElement(newNode));
  } else if (
    (typeof newNode !== "string" &&
      oldNode !== newNode &&
      newNode.type !== oldNode.type) ||
    typeof newNode !== typeof oldNode
  ) {
    return parent.replaceChild(createElement(newNode), parent.childNodes[index]);
  }
  const maxLen = Math.max(newNode.children.length, old.children.length);
  for (let i = 0; i < maxLen; i++) {
    updateElement(
      parent.childNodes[index],
      newNode.children[i],
      oldNode.children[i],
      i
    );
  }
};

const render = () =>
  h("div", null, h("button", null, "right"), h("button", null, "left"));

var buttonElement = render();

var rootElement = document.createElement("div");
document.body.append(rootElement);
updateElement(rootElement, buttonElement);
