# Api

docker cp ./switch_chat.sql nest_prod_db:/tmp/switch_chat.sql
docker exec nest_prod_db pg_restore -U postgres -d switch_chat -c --if-exists /tmp/switch_chat.sql
docker exec nest_prod_db psql -U postgres -d switch_chat -c "\dt"