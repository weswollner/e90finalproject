/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createProjectTimer = /* GraphQL */ `
  mutation CreateProjectTimer(
    $input: CreateProjectTimerInput!
    $condition: ModelProjectTimerConditionInput
  ) {
    createProjectTimer(input: $input, condition: $condition) {
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
export const updateProjectTimer = /* GraphQL */ `
  mutation UpdateProjectTimer(
    $input: UpdateProjectTimerInput!
    $condition: ModelProjectTimerConditionInput
  ) {
    updateProjectTimer(input: $input, condition: $condition) {
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
export const deleteProjectTimer = /* GraphQL */ `
  mutation DeleteProjectTimer(
    $input: DeleteProjectTimerInput!
    $condition: ModelProjectTimerConditionInput
  ) {
    deleteProjectTimer(input: $input, condition: $condition) {
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
