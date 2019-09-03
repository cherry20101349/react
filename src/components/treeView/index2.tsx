import * as React from 'react'
import { Tree, Input } from 'antd';
import 'antd/dist/antd.css';
const { TreeNode } = Tree;
const { Search } = Input;

const gData = [
    {
      name: '好视通大学',
      nodeId: '0-0',
      children: [
        {
          name: '0-0-0',
          nodeId: '0-0-0',
          children: [
            { name: '0-0-0-0', nodeId: '0-0-0-0' },
            { name: '0-0-0-1', nodeId: '0-0-0-1' },
            { name: '0-0-0-2', nodeId: '0-0-0-2' },
          ],
        },
        {
          name: '0-0-1',
          nodeId: '0-0-1',
          children: [
            { name: '0-0-1-0', nodeId: '0-0-1-0' },
            { name: '0-0-1-1', nodeId: '0-0-1-1' },
            { name: '0-0-1-2', nodeId: '0-0-1-2' },
          ],
        },
        {
          name: '0-0-2',
          nodeId: '0-0-2',
        },
      ],
    },
    {
      name: '0-1',
      nodeId: '0-1',
      children: [
        { name: '0-1-0-0', nodeId: '0-1-0-0' },
        { name: '0-1-0-1', nodeId: '0-1-0-1' },
        { name: '0-1-0-2', nodeId: '0-1-0-2' },
      ],
    },
    {
      name: '0-2',
      nodeId: '0-2',
    },
  ];

const dataList:any = [];
const generateList = (data:any) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const { nodeId } = node;
    dataList.push({ nodeId, name: nodeId });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);



const getParentKey = (nodeId:any, tree:any):any => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item:any) => item.nodeId === nodeId)) {
        parentKey = node.nodeId;
      } else if (getParentKey(nodeId, node.children)) {
        parentKey = getParentKey(nodeId, node.children);
      }
    }
  }
  return parentKey;
};

export default class SearchTree extends React.Component {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  };

  onExpand = (expandedKeys:any) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = (e:any) => {
    const { value } = e.target;
    const expandedKeys = dataList
      .map((item:any) => {
        if (item.name.indexOf(value) > -1) {
          return getParentKey(item.nodeId, gData);
        }
        return null;
      })
      .filter((item:any, i:any, self:any) => item && self.indexOf(item) === i);
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  onCheck = (checkedKeys:any) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };

  render() {
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const loop = (data:any) =>
      data.map((item:any) => {
        const index = item.name.indexOf(searchValue);
        const beforeStr = item.name.substr(0, index);
        const afterStr = item.name.substr(index + searchValue.length);
        const name =
          index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ color: '#f50' }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{item.name}</span>
          );
        if (item.children) {
          return (
            <TreeNode key={item.nodeId} title={name}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.nodeId} title={name} />;
      });
    return (
      <div>
        <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
        <Tree
          checkable
          onExpand={this.onExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          onCheck={this.onCheck}
        >
          {loop(gData)}
        </Tree>
      </div>
    );
  }
}