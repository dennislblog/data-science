# 常用语句

## SQL语句主要分为哪几类


### 超键、候选键、主键、外键分别是什么？


### SQL约束条件


### 关联查询

0. 创建一个数据表例子

```sql
# sqlsh \connect --mysql xiang@localhost
use test;
create table NAME (`id` int, `name` char(40));
create table AGE  (`id` int, `age`  int);
insert into NAME (id, name) values (1,"Joe"), (2,"Henry"), (3,"Sam"), (4,"Max"), (8,"Jack");
insert into AGE (id, age) values (1,28), (2,18), (3,21), (4,32), (5,35);
```

结果如下
```
# NAME                         # AGE
+----+-------+                 +----+-------+
| id | name  |                 | id | age   |
+----+-------+                 +----+-------+
| 1  | Joe   |                 | 1  | 28    |
| 2  | Henry |                 | 2  | 18    |
| 3  | Sam   |                 | 3  | 21    |
| 4  | Max   |                 | 4  | 32    |
| 8  | Jack  |                 | 5  | 35    |
+----+-------+                 +----+-------+
```

1. `inner join`内连接也称为等值连接，只返回两个表关键字都匹配的部分

```sql
select * from NAME inner join AGE on NAME.id = AGE.id;
--OR select * from NAME, AGE where NAME.id=AGE.id;
```

结果如下
```
+----+-------+----+-----+
| id | name  | id | age |
+----+-------+----+-----+
|  1 | Joe   |  1 |  28 |
|  2 | Henry |  2 |  18 |
|  3 | Sam   |  3 |  21 |
|  4 | Max   |  4 |  32 |
+----+-------+----+-----+
```

2. `left join`左连接，必须返回左表的全部内容，然后匹配加入右表内容

```sql
select * from NAME left join AGE on NAME.id = AGE.id;
```

结果如下
```
+----+-------+------+------+
| id | name  | id   | age  |
+----+-------+------+------+
|  1 | Joe   |    1 |   28 |
|  2 | Henry |    2 |   18 |
|  3 | Sam   |    3 |   21 |
|  4 | Max   |    4 |   32 |
|  8 | Jack  | NULL | NULL |
+----+-------+------+------+
```

3. `right join`右连接，必须返回右表的全部内容，然后匹配加入左表内容 
> 左连接和右连接都是外连接的一种方式

```sql
select * from NAME right join AGE on NAME.id = AGE.id;
```

结果如下
```
+------+-------+----+-----+
| id   | name  | id | age |
+------+-------+----+-----+
|    1 | Joe   |  1 |  28 |
|    2 | Henry |  2 |  18 |
|    3 | Sam   |  3 |  21 |
|    4 | Max   |  4 |  32 |
| NULL | NULL  |  5 |  35 |
+------+-------+----+-----+
```

4. `cross join`返回两张表的笛卡尔乘积，检查交互作用

```sql
select * from NAME cross join AGE;
```

结果如下
```
+----+-------+----+-----+
| id | name  | id | age |
+----+-------+----+-----+
|  1 | Joe   |  1 |  28 |
|  2 | Henry |  1 |  28 |
|  3 | Sam   |  1 |  28 |
|  4 | Max   |  1 |  28 |
|  8 | Jack  |  1 |  28 |
|  1 | Joe   |  2 |  18 |
|  2 | Henry |  2 |  18 |
|  3 | Sam   |  2 |  18 |
|  4 | Max   |  2 |  18 |
|  8 | Jack  |  2 |  18 |
|  1 | Joe   |  3 |  21 |
|  2 | Henry |  3 |  21 |
|  3 | Sam   |  3 |  21 |
|  4 | Max   |  3 |  21 |
|  8 | Jack  |  3 |  21 |
|  1 | Joe   |  4 |  32 |
|  2 | Henry |  4 |  32 |
|  3 | Sam   |  4 |  32 |
|  4 | Max   |  4 |  32 |
|  8 | Jack  |  4 |  32 |
|  1 | Joe   |  5 |  35 |
|  2 | Henry |  5 |  35 |
|  3 | Sam   |  5 |  35 |
|  4 | Max   |  5 |  35 |
|  8 | Jack  |  5 |  35 |
+----+-------+----+-----+
```


5. `union | union all`联合查询，把选取的内容做一个合集(~~union all~~重复放入集合)

```sql
select id from NAME union select id from AGE;
```

结果如下
```
+----+
| id |
+----+
|  1 |
|  2 |
|  3 |
|  4 |
|  8 |
|  5 |
+----+
```


