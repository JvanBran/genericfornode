var router = require('koa-router')()
const datalize = require('datalize');
const field = datalize.field;
const { Test } = require('@controller/test.js')
router
.get('/list',datalize.query([
    field('pageNo').required(), //页码
    field('pageSize').required(), //分页数
    field('test')
]),Test)
.post('/add', datalize([
    field('test').required(),
]), Test)
.put('/edit', datalize([
    field('id').required(),
]), Test)
.del('/del', datalize.query([
    field('id').required(),
]), Test)
module.exports = router