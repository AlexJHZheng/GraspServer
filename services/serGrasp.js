// 封装多个功能呢的接口请求函数
const sql = require("mssql");
//引入config/dbConfig.json文件，并获取其中数据库
const dbgrasp = require("../config/dbConfig.json").dbgrasp;
// 创建连接池
// const pool = new sql.ConnectionPool(dbgrasp);

//1.查询产品库存列表
async function searchGraspProduto(pfullname) {
  console.log(pfullname, "pfullnameSer");
  // const pool = await sql.connect(dbgrasp);
  //连接数据库
  // connectDB();
  // const pool = await sql.connect(dbgrasp);
  //调用数据库
  const Products = await searchProducts(pfullname);
  //返回查询结果
  return Products;
}

// function reqGraspAdd(data) {
//   return request({
//     url: "/grasp/add",
//     method: "post",
//     data,
//   });
// }

// 本地功能区
// 连接数据库
// 连接数据库
// async function connectDB() {
//   try {
//     await pool.connect();
//     console.log("Connected to Grasp MSSQL database");
//   } catch (err) {
//     console.error("Error connecting to MSSQL database:", err);
//   }
// }
// 模糊搜索产品信息并获取库存数量以及草稿箱信息
async function searchProducts(keyword) {
  try {
    const pool = await sql.connect(dbgrasp);
    const request = pool.request();
    const result = await request.query(`
    SELECT p.ptypeid, p.pfullname, p.Type, p.Standard, ISNULL(s.Qty, 0) AS Qty,
    ISNULL(s.Qty, 0) - ISNULL(d.SaleQty, 0) AS SaleQty, ISNULL(d.ImportQty, 0) AS ImportQty
FROM ptype p
LEFT JOIN GoodsStocks s ON p.ptypeid = s.ptypeid
LEFT JOIN (
 SELECT PtypeId,
        SUM(CASE WHEN Vchtype = 11 THEN Qty ELSE 0 END) AS SaleQty,
        SUM(CASE WHEN Vchtype = 34 THEN Qty ELSE 0 END) AS ImportQty
 FROM BakDly
 GROUP BY ptypeid
) d ON p.ptypeid = d.ptypeid
      WHERE p.pfullname LIKE '%${keyword}%'
    `);
    // 关闭数据库连接
    await pool.close();
    return result.recordset;
  } catch (err) {
    console.error("Error searching products:", err);
    return [];
  }
}

//导出功能;
module.exports = {
  searchGraspProduto,
};
