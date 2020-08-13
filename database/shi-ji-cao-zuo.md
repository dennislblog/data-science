# 实际操作

## 网页表格存储到mysql里

> 情境：在[KDNuggest](https://www.kdnuggets.com/2019/09/core-hot-data-science-skills.html)上看到了一个关于数据科学家需要掌握哪些技能的博文，于是有了一个想法
>> 从网站抓取表格，并存储到我的数据库里

### 提取表格标题

```python
def extract_title(txt):
    # 1. extract string between : and ,
    r1 = re.search("(?<=\:)(.*?)(?=\,)", txt)
    # 2. replace all non-alphabet to empty
    r2 = re.sub("[\W_]+", "", r1.group(1))
    # 3. replace DataScience to _
    return r2.replace("DataScience", "_")
```

### 提取表格数据

从网页抓取表格`table tag`，由于`%`在MYSql里有特殊的含义，因此去掉他。把数据表每一行存成`list`，逐行加到MYSql里

```python
def get_html(url):
    html = urllib.request.urlopen(url)
    content = html.read()
    html.close()
    soup = BeautifulSoup(content, "lxml")
    tables = soup.find_all('table', class_="wc")
    data_lst = dict()
    for table in tables:
        name = extract_title(table.findPrevious().text)
        data = []
        for row in table.children:
            if isinstance(row, bs4.element.Tag):
                cols = row.find_all("td")
                cols = [re.sub(r'\s', '', ele.text.replace("%", "")) for ele in cols]
                if cols:
                    data.append(cols)
        data_lst[name] = data
    return data_lst
```

### 把数据存入数据库

最后一步就是把提取的数据存入到数据表中

```python
# 假设你已经连接到mysql数据库里
url = "https://www.kdnuggets.com/2019/09/core-hot-data-science-skills.html"
data = get_html(url)
connect = pymysql.connect(...)
cursor = connect.cursor()
sql_create_tb = "create table if not exists %s (`Skill` varchar(30), `Have%%` decimal(5,2), `Want%%` decimal(5,2), `WHratio` decimal(4,2) )"
for tb_name, tb_data in data.items():
    cursor.execute(sql_create_tb % tb_name)
    for d in tb_data:
        sql_insert_tb = "insert into {0} values (%s, %s, %s, %s)".format(tb_name)
        cursor.execute(sql_insert_tb, [d[0], d[1], d[2], d[3]])
connect.commit()
connect.close()
```
需要特别注意的就是 1) `%`通配符在mysql里的特殊意义；2) 数据的长度和小数点后的精度，负号和小数点都要占用位置，因此`decimal(4,2)`只能显示`M.MM`

### 查看结果

```cmd
sql> select * from core_skills order by WHratio desc;

+-----------------------+-------+-------+---------+
| Skill                 | Have% | Want% | WHratio |
+-----------------------+-------+-------+---------+
| MachineLearning       | 64.30 | 41.00 |    0.64 |
| Scikit-learn          | 44.10 | 24.00 |    0.54 |
| Python                | 71.20 | 37.10 |    0.52 |
| Statistics            | 63.80 | 27.80 |    0.44 |
| R                     | 45.10 | 19.80 |    0.44 |
| BusinessUnderstanding | 57.00 | 22.20 |    0.39 |
| DataVisualization     | 69.00 | 25.30 |    0.37 |
| Math                  | 52.60 | 17.50 |    0.33 |
| ETL-DataPreparation   | 48.30 | 14.10 |    0.29 |
| SQL/DatabaseCoding    | 57.30 | 16.00 |    0.28 |
| CommunicationsSkills  | 65.90 | 16.50 |    0.25 |
| CriticalThinking      | 66.70 | 15.50 |    0.23 |
| Excel                 | 66.50 |  4.60 |    0.07 |
+-----------------------+-------+-------+---------+
```
机器学习和Python技能相对重要，数据库知识好像并没有那么重要~尴尬

```cmd
sql> select * from other_skills order by WHratio desc;

+---------------------+-------+-------+---------+
| Skill               | Have% | Want% | WHratio |
+---------------------+-------+-------+---------+
| Julia               |  2.00 |  6.90 |    3.44 |
| XGBoost             | 22.30 | 19.00 |    0.85 |
| MATLAB              | 10.90 |  7.90 |    0.73 |
| SoftwareEngineering | 25.70 | 15.20 |    0.59 |
| SAS                 | 12.70 |  7.20 |    0.57 |
| Java                | 15.10 |  7.70 |    0.51 |
+---------------------+-------+-------+---------+
```
`Julia`有必要了解一下，虽然现在的需求只有$7\%$

```cmd
sql> select * from hotemerging_skills;

+--------------------+-------+-------+---------+
| Skill              | Have% | Want% | WHratio |
+--------------------+-------+-------+---------+
| Pytorch            |  7.00 | 29.60 |    4.26 |
| Scala              |  4.20 | 13.30 |    3.14 |
| OtherBigDataTools  |  8.90 | 27.40 |    3.08 |
| TensorFlow         | 19.10 | 46.40 |    2.44 |
| ApacheSpark        | 16.00 | 34.60 |    2.16 |
| Hadoop             | 10.90 | 22.70 |    2.08 |
| DeepLearning       | 25.90 | 49.60 |    1.92 |
| No-SQLDatabases    | 14.00 | 23.20 |    1.65 |
| NLP-TextProcessing | 25.00 | 33.80 |    1.35 |
| Kaggle             | 14.50 | 18.40 |    1.27 |
| UnstructuredData   | 22.30 | 27.70 |    1.24 |
+--------------------+-------+-------+---------+
```
无疑比较重要的技能是`Pytorch`这个我还不怎么有实操经验~又一次尴尬，大数据和分布式计算是未来大势所趋


<img src="https://www.kdnuggets.com/images/skill-want-have-scatter-720.jpg">
    
其实这个网站有一个可视化的图片，比这些数字立体多了，可视化技能也要锻炼，我他妈读了个啥书呀
