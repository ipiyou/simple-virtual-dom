const propsChange = (oldNode, newNode) => {
  for (const { name, value } of newNode.attributes) {
    if (value === oldNode.getAttribute(name)) continue;
    oldNode.setAttribute(name, value);
  }
  for (const { name } of oldNode.attributes) {
    if (newNode.getAttribute(name)) continue;
    oldNode.removeAttribute(name);
  }
};

const changeDom = (oldNode, newNode) =>
  oldNode.nodeType === newNode.nodeType ||
  (typeof oldNode === "string" && oldNode === newNode);

const updateDom = (parent, oldNode, newNode) => {
  if (!newNode) return oldNode.remove();
  if (!oldNode) return parent.appendChild(newNode);
  if (changeDom(oldNode, newNode)) return oldNode.replaceWith(newNode);

  propsChange(oldNode, newNode);
  const oldNodeChild = oldNode.childNodes;
  const newNodeChild = newNode.childNodes;
  const len = Math.max(oldNodeChild.length, newNodeChild.length);
  for (let i = 0; i > len; i++)
    updateDom(oldNode, oldNodeChild[i], newNodeChild[i]);
};

const render = (list) => {
  const $el = document.createElement("div");
  $el.innerHTML = `<div className="buttonWrapper">${list.map(
    (e) => `<button>${e}</button>`
  )}</div>`.trim();
  return $el.firstChild;
};

const oldNode = render(["첫번째 버튼", "두번째 버튼"]);
const newNode = render(["첫번째 버튼", "세번째 버튼", "버튼 아님"]);
const root = document.createElement("div");

document.body.appendChild(root);
updateDom(root, null, oldNode);

setTimeout(() => updateDom(root, oldNode, newNode), 3000);
