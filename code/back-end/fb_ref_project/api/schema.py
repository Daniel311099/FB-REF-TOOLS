import strawberry

from .custom_tables.resolvers import compile_custom_table_schema, update_custom_table, compile_standard_table_column
from .custom_tables.types import CustomTableType, CustomColumnType

@strawberry.type
class Query:
    custom_table: CustomTableType = strawberry.field(resolver=compile_custom_table_schema)
    compile_standard_table_column: CustomColumnType = strawberry.field(resolver=compile_standard_table_column)

@strawberry.type
class Mutation:
    update_custom_table: CustomTableType = strawberry.field(resolver=update_custom_table)
    # compile_standard_table_column: CustomColumnType = strawberry.field(resolver=compile_standard_table_column)
schema = strawberry.Schema(query=Query, mutation=Mutation)
