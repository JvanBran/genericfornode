const crypto = require("crypto");
function transListToTreeData(list, tree, parentId, index = 1) {
    let indexs = index
    list.forEach((item) => {
        if (item.parent_id == parentId) {
            const child = {
                ...item,
                index:index,
                children: []
            }
            // 迭代 list
            ++indexs
            transListToTreeData(list, child.children, item.id, indexs)
            // 删掉不存在 children 值的属性
            if (child.children.length <= 0) {
                --indexs
                delete child.children
            }
            // 加入到树中
            tree.push(child)
        }
    })
}
function transTreeToListData(tree, list) {
    tree.forEach(item=>{
        if(item.children){
            transTreeToListData(item.children,list)
            delete item.children
        }
        list.push(item)
    })
}
function getRfidCodeA(){
    const rfidCode = 'A' + crypto.randomBytes(8).toString('hex').slice(0, 15)
    return rfidCode.toUpperCase()
}
function getRfidCodeF(){
    const rfidCode = 'F'+ crypto.randomBytes(8).toString('hex').slice(0,15)
    return rfidCode.toUpperCase()
}

module.exports = {
    transListToTreeData: transListToTreeData,
    transTreeToListData: transTreeToListData,
    getRfidCodeA: getRfidCodeA,
    getRfidCodeF: getRfidCodeF
}