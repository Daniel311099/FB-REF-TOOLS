# import strawberry
from .types import CustomTableType, CustomTableInput, CustomColumnType

def compile_custom_table_schema():
    return CustomTableType(name='test', subjectType='wfee', id=77)

def update_custom_table(name: str, tab_id: int):
    return CustomTableType(name=name, subjectType='wf', id=12)

def compile_standard_table_column(page_column_id: int, custom_table_id: int): # add url etc late
    name = 'page column inner text' # from page_column_id
    return CustomColumnType(id=45, name=name, custom=False, custom_table_id=custom_table_id, exp="a")
