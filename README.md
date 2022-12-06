Modify config/config.json to use valid connection configurations.
```
{
    "username": "root",
    "password": "password",
    "database": "sql_demo",
    "host": "127.0.0.1",
    "dialect": "mysql"
}
```

**To apply migration**
```
npm run init
```

Need to extend `max_allowed_packet` since rows inserted would exceed the limit. [Instruction](https://dev.mysql.com/doc/refman/8.0/en/packet-too-large.html#:~:text=The%20largest%20possible%20packet%20that,error%20and%20closes%20the%20connection.)

**To execute demo script**
```
npm start
```
