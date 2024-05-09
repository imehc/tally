# 示例命令启动并配置数据库
init-database:
	docker run --name postgres-tally --restart always -e POSTGRES_PASSWORD=2023 -v /home/postgres/data:/var/lib/postgresql -p 5432:5432 -d postgres
	pnpm run gen:model
