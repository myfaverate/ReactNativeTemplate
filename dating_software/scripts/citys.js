const fs = require('fs');
const path = require('path');

// 1. 修正文件读取路径
const filePath = path.join(__dirname, 'cities.txt');
console.log(`尝试读取文件路径: ${filePath}`);

// 2. 读取并转换非标准JSON
let originalData;
try {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // 将非标准JSON转换为标准JSON（给键名添加引号）
  const fixedJson = fileContent
    .replace(/(\w+):/g, '"$1":')  // 给键加引号
    .replace(/'/g, '"');           // 单引号变双引号
  
  originalData = JSON.parse(fixedJson);
  console.log('原始数据解析成功:', JSON.stringify(originalData, null, 2));
} catch (err) {
  console.error('文件读取或解析失败:', err);
  process.exit(1);
}

// 3. 数据转换函数
function transformData(data) {
  const result = [];
  const provinces = data['00'];

  for (const [provinceKey, provinceName] of Object.entries(provinces)) {
    const provinceId = parseInt(provinceKey);
    
    if (data[provinceId]) {
      const cities = Object.values(data[provinceId]);
      result.push({ [provinceName]: cities });
    } else {
      result.push({ [provinceName]: [provinceName] });
    }
  }

  return result;
}

// 4. 执行转换
const transformedData = transformData(originalData);
console.log('转换后的数据:', JSON.stringify(transformedData, null, 2));

// 5. 写入文件
const outputDir = path.join(__dirname, '../app/res');
const outputPath = path.join(outputDir, 'city.json');
console.log(`__dirname: ${__dirname}, outputDir: ${outputDir}`);
try {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(
    outputPath,
    JSON.stringify(transformedData, null, 2),
    'utf8'
  );
  
  console.log(`数据转换完成，已保存到: ${outputPath}`);
} catch (err) {
  console.error('文件写入失败:', err);
}