# 基本知识

### 数据库三大范式

1. 第一范式：要求属性具有原子性，不可以再被拆分
> 如表(学号，姓名，性别，出生年月日)，如果认为最后一列还可以再分成(年，月，日)，就违反第一范式

2. 第二范式：非主键列的数据提取完全依赖于主键，不存在部分依赖，记录具有唯一标识性(这个主键可以由多个列决定)
> 如表(学号，课程号，姓名，学分)，学分依赖课程号，姓名依赖学号，那些没选课的学生有两列都是NULL，违反第二范式
>> 正确做法是设计三个表，第一个表`学生`(学号，姓名)，第二个表`课程`(课程号，学分)，第三个表`选课关系`(学号，课程号，成绩)

3. 第三范式：数据尽量不要啰嗦
> 如表(学号，姓名，年龄，学院名称，学院电话)，很多学生在同一个学院，这样学院和电话这两栏就会有大量信息冗余
>> 正确做法是设计两个表，一个学生(学号，姓名，年龄，所在学院)，一个学院(学院，电话)

### 存储引擎

```cmd
mysql xiang@localhost:test> show engines;
+--------------------+---------+----------------------------------------------------------------+--------------+--------+------------+
| Engine             | Support | Comment                                                        | Transactions | XA     | Savepoints |
+--------------------+---------+----------------------------------------------------------------+--------------+--------+------------+
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      | NO           | NO     | NO         |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          | NO           | NO     | NO         |
| CSV                | YES     | CSV storage engine                                             | NO           | NO     | NO         |
| FEDERATED          | NO      | Federated MySQL storage engine                                 | <null>       | <null> | <null>     |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             | NO           | NO     | NO         |
| MyISAM             | YES     | MyISAM storage engine                                          | NO           | NO     | NO         |
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     | YES          | YES    | YES        |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) | NO           | NO     | NO         |
| ARCHIVE            | YES     | Archive storage engine                                         | NO           | NO     | NO         |
+--------------------+---------+----------------------------------------------------------------+--------------+--------+------------+
```