class PostgrestQuery {
  constructor(tableName, query, queryParams) {
    this.tableName = tableName;
    this.query = query;
    this.queryParams = queryParams;
  }

  getQuery() {
    return this.query;
  }

  getQueryParams() {
    return this.queryParams;
  }

  getTableName() {
    return this.tableName;
  }
}

module.exports = {
  PostgrestQuery,
};
