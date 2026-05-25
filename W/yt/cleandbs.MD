# Cleaning the DBS

## Cleanig Upstash

```sh
FLUSH ALL
```

## Cleanign Sql

```sql
wrangler d1 execute name-db --remote --command="DELETE FROM mistress_book;"
```
