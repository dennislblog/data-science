# 未归类

## 先创建一个数据表
```sql
--假设你已经连接到相应的数据库里
create table temp_table(id int primary key, grade decimal(4,2));
--输入(id, grade)数据
insert into temp_table values (1,78), (2,80.5), (3,95), (4,47), (5,66), (6,null);
--插入新的一列`time`，设置为当前时间（用now()函数, set one value to all）
alter table temp_table add column timenow datetime;
update temp_table set timenow=now(); 
--删除column操作: alter table temp_table drop column timenow;
--描述table操作: describe temp_table;

--创造一个临时的table存储要插入的变量
create temporary table tmp (id int, user_name varchar(30));
insert into tmp values (1, "12bc"),(2, "abcd"),(3, "3456"),(4, "56cd"),(5, "00gg"),(6, "ggbc");
--插入新的一列`user_name`
alter table temp_table add user_name varchar(30) default NULL after id;
--选取临时表tmp中的user_name插入到temp_table里(匹配id)
update temp_table as a, tmp as b set a.user_name = b.user_name where a.id = b.id;
```
结果如下
```
+----+-----------+-------+---------------------+
| id | user_name | grade | timenow             |
+----+-----------+-------+---------------------+
|  1 | 12bc      | 78.00 | 2020-08-12 22:08:26 |
|  2 | abcd      | 80.50 | 2020-08-12 22:08:26 |
|  3 | 3456      | 95.00 | 2020-08-12 22:08:26 |
|  4 | 56cd      | 47.00 | 2020-08-12 22:08:26 |
|  5 | 00gg      | 66.00 | 2020-08-12 22:08:26 |
|  6 | ggbc      |  NULL | 2020-08-12 22:08:26 |
+----+-----------+-------+---------------------+
```


## 条件判断

> 情境：根据上面学生的成绩，给出`优`，`中`，`差`三个评级
```sql
-- 1) 用if实现
select user_name, grade, if(grade>=60, if(grade>80, 'good', 'not bad'), 'bad') as grade_judge from temp_table;

-- 2) 用case when实现
select user_name, grade, 
case when grade > 80 then 'good'
     when grade between 60 and 80 then 'not bad'
     else 'bad' end as grade_judge
from temp_table;
```
结果如下
```
+-----------+-------+-------------+
| user_name | grade | grade_judge |
+-----------+-------+-------------+
| 12bc      | 78.00 | not bad     |
| abcd      | 80.50 | good        |
| 3456      | 95.00 | good        |
| 56cd      | 47.00 | bad         |
| 00gg      | 66.00 | not bad     |
| ggbc      |  NULL | bad         |
+-----------+-------+-------------+
```

> where运算符(如果条件是主键，理论上应该会快一些)
>> 逻辑符号涉及 `=`, `!=`, `>=`, `<=`, `between * and *`, `like`, `in`
```sql
-- select * from temp_table where grade between 60 and 80;
-- select * from temp_table where grade in (78, 95);
```
~~like模糊查找~~: % 表示全部匹配，_ 下划线表示匹配一个字符；例如`look%`代表匹配`look`开头的信息
> 情境：在上面的表中，提取`user_name`里全部为数字或全部为字母的同学的成绩记录(貌似不识别`regex`)，改成提取`user_name`末尾字母为`d`的信息
```sql
select * from temp_table where user_name like "%d";
```
结果如下
```
+----+-----------+-------+---------------------+
| id | user_name | grade | timenow             |
+----+-----------+-------+---------------------+
|  2 | abcd      | 80.50 | 2020-08-12 22:08:26 |
|  4 | 56cd      | 47.00 | 2020-08-12 22:08:26 |
+----+-----------+-------+---------------------+
```