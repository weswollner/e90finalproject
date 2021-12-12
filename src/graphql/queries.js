/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProjectTimer = /* GraphQL */ `
  query GetProjectTimer($id: ID!) {
    getProjectTimer(id: $id) {
      id
      projectName
      projectCategory
      startTime
      endTime
      timeSpent
      createdAt
      updatedAt
    }
  }
`;
export const listProjectTimers = /* GraphQL */ `
  query ListProjectTimers(
    $filter: ModelProjectTimerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjectTimers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        projectName
        projectCategory
        startTime
        endTime
        timeSpent
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
