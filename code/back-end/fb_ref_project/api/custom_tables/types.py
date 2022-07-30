import strawberry
from typing import Optional

@strawberry.type
class CustomTableType:
    name:str
    id:int
    subjectType: str

@strawberry.input
class CustomTableInput:
    name:str
    id:int
    subjectType: str

@strawberry.input
class NewCol:
    page_column_id: int
    custom_table_id: int

@strawberry.type
class CustomColumnType:
    id:int # from django
    exp: str
    name: str
    custom: bool # only for rendering purposes
    custom_table_id: int
