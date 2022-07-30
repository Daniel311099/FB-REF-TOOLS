import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://127.0.0.1:8000/api/", {
    method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CustomColumnType = {
  __typename?: 'CustomColumnType';
  custom: Scalars['Boolean'];
  customTableId: Scalars['Int'];
  exp: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type CustomTableType = {
  __typename?: 'CustomTableType';
  id: Scalars['Int'];
  name: Scalars['String'];
  subjectType: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateCustomTable: CustomTableType;
};


export type MutationUpdateCustomTableArgs = {
  name: Scalars['String'];
  tabId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  compileStandardTableColumn: CustomColumnType;
  customTable: CustomTableType;
};


export type QueryCompileStandardTableColumnArgs = {
  customTableId: Scalars['Int'];
  pageColumnId: Scalars['Int'];
};

export type TableNameQueryVariables = Exact<{ [key: string]: never; }>;


export type TableNameQuery = { __typename?: 'Query', customTable: { __typename?: 'CustomTableType', name: string } };

export type NewQQueryVariables = Exact<{
  customTableId: Scalars['Int'];
}>;


export type NewQQuery = { __typename?: 'Query', compileStandardTableColumn: { __typename?: 'CustomColumnType', id: number, name: string, custom: boolean, customTableId: number, exp: string } };


export const TableNameDocument = `
    query tableName {
  customTable {
    name
  }
}
    `;
export const useTableNameQuery = <
      TData = TableNameQuery,
      TError = unknown
    >(
      variables?: TableNameQueryVariables,
      options?: UseQueryOptions<TableNameQuery, TError, TData>
    ) =>
    useQuery<TableNameQuery, TError, TData>(
      variables === undefined ? ['tableName'] : ['tableName', variables],
      fetcher<TableNameQuery, TableNameQueryVariables>(TableNameDocument, variables),
      options
    );
export const NewQDocument = `
    query newQ($customTableId: Int!) {
  compileStandardTableColumn(customTableId: $customTableId, pageColumnId: 3) {
    id
    name
    custom
    customTableId
    exp
  }
}
    `;
export const useNewQQuery = <
      TData = NewQQuery,
      TError = unknown
    >(
      variables: NewQQueryVariables,
      options?: UseQueryOptions<NewQQuery, TError, TData>
    ) =>
    useQuery<NewQQuery, TError, TData>(
      ['newQ', variables],
      fetcher<NewQQuery, NewQQueryVariables>(NewQDocument, variables),
      options
    );