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
<!-- or you can call select engine, support, comment from information_schema.engines; -->
+--------------------+---------+----------------------------------------------------------------+
| engine             | support | comment                                                        |
+--------------------+---------+----------------------------------------------------------------+
| MEMORY             | YES     | Hash based, stored in memory, useful for temporary tables      |
| MRG_MYISAM         | YES     | Collection of identical MyISAM tables                          |
| CSV                | YES     | CSV storage engine                                             |
| FEDERATED          | NO      | Federated MySQL storage engine                                 |
| PERFORMANCE_SCHEMA | YES     | Performance Schema                                             |
| MyISAM             | YES     | MyISAM storage engine                                          |
| InnoDB             | DEFAULT | Supports transactions, row-level locking, and foreign keys     |
| BLACKHOLE          | YES     | /dev/null storage engine (anything you write to it disappears) |
| ARCHIVE            | YES     | Archive storage engine                                         |
+--------------------+---------+----------------------------------------------------------------+
```

上面列举了所有$9$种存储引擎，但是常用的是三种:
1. `Innodb`： 是MYSQL 8.0的默认引擎，提供对数据库事务支持[^1]，还提供行级锁[^2]和外键支持[^3]，由于支持事务的提交(commit)和回滚(rollback)，所以不管是对事务完整性要求高的银行还是对并发处理要求高的售票都是不错的选择

2. `MyISAM`: 前面那个由于功能比较多，空间和内存使用比较高，如果主要是插入和读取记录，这个效率会比较高

3. `Memory`: 所有数据存储在内存里，数据处理速度快，但安全性不高，不能建立太大的表(temporary table?)

[^1]: 事务保证数据变化的一致性，比如我转账给你，我少的钱就是你多的钱，要不都发生要不都不发生
[^2]: 锁保证访问的优先级次序，比如酒店的房间，只有申请到钥匙的人才可以入住并将房间锁起来，其他人只有等房间空出来才可以入住
[^3]: 在一个表中存在的另一个表的主键称此表的外键