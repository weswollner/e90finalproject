import React, { useState, useEffect } from 'react';
import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { API } from 'aws-amplify';
import { createProjectTimer as createProjectTimerMutation, deleteProjectTimer as deleteProjectTimerMutation, updateProjectTimer as updateProjectTimerMutation } from './graphql/mutations';
import { listProjectTimers } from './graphql/queries';

const initialModelState = { projectName: '', projectCategory: '', startTime: '' }

function App() {
  const [projectTimers, setProjectTimers] = useState([]);
  const [dataModel, setDataModel] = useState(initialModelState);

  useEffect(() => {
    getAllProjectTimers();
  }, []);

  async function createTimer() {
    dataModel.startTime = new Date().toUTCString();
    await API.graphql({ query: createProjectTimerMutation, variables: { input: dataModel } });
    getAllProjectTimers();
    setDataModel(initialModelState);
  }

  async function getAllProjectTimers() {
    const apiData = await API.graphql({ query: listProjectTimers });
    setProjectTimers(apiData.data.listProjectTimers.items);
  }

  async function deleteProjectTimer({ id }) {
    const newProjectTimers = projectTimers.filter(timer => timer.id !== id);
    setProjectTimers(newProjectTimers);
    await API.graphql({ query: deleteProjectTimerMutation, variables: { input: { id } } });
  }

  async function updateProjectTimer({ id }) {
    let thisTimer = projectTimers.find(timer => timer.id === id);
    thisTimer.endTime = new Date().toUTCString();
    thisTimer.timeSpent = calcDateDiff(thisTimer.endTime, thisTimer.startTime);
    await API.graphql({ query: updateProjectTimerMutation, variables: { input: { id, endTime: thisTimer.endTime, timeSpent: thisTimer.timeSpent } } });
    getAllProjectTimers();
  }

  function calcDateDiff(endDate, starDate) {
    let diffInMilliSeconds = Math.abs(new Date(endDate) - new Date(starDate)) / 1000;

    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    const seconds = diffInMilliSeconds
    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    if (hours > 0) {
      difference += (hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
    }

    if (minutes > 0) {
      difference += (minutes === 1) ? `${minutes} minute, ` : `${minutes} minutes, `;
    }

    difference += `${seconds} seconds`;

    return difference;
  }


  return (
    <Authenticator>
      {({ signOut, user }) => (
        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <h1>Project Timer Application v3</h1>
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Name of project"
                      onChange={e => setDataModel({ ...dataModel, 'projectName': e.target.value })}
                      value={dataModel.projectName}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Select
                      onChange={e => setDataModel({ ...dataModel, 'projectCategory': e.target.value })}
                      value={dataModel.projectCategory}>
                      <option>Select Project Category</option>
                      <option value="Work">Work</option>
                      <option value="School">School</option>
                      <option value="Home">Home</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Button onClick={createTimer}>
                Add Project Timer
              </Button>
            </Form>
            <Container className="p-3">
              <Row xs={1} md={2} className="g-4">
                {
                  projectTimers.map(projectTimer => (
                    <Col key={projectTimer.id}>
                      <Card key={projectTimer.id}>
                        <Card.Header>{projectTimer.projectName}</Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <b>Category: </b>{projectTimer.projectCategory} <br />
                            <b>Time Started: </b>{projectTimer.startTime}<br />
                            <b>Time Ended: </b>{projectTimer.endTime}<br />
                            <b>Time Spent: </b>{projectTimer.timeSpent}<br />
                          </Card.Text>
                          <ButtonGroup size="sm">
                            <Button onClick={() => deleteProjectTimer(projectTimer)}>Delete Timer</Button>
                            <Button onClick={() => updateProjectTimer(projectTimer)}>Stop Timer</Button>
                          </ButtonGroup>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </Container>
            <Button onClick={signOut}>Sign out</Button>
          </Container>
        </Container>
      )}
    </Authenticator>
  );
}

export default App;