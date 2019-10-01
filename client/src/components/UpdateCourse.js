import React, {Component} from 'react';
import {} from "react-router-dom";
import Form from "./Form";

export default class UpdateCourse extends Component {

  state = {
    errors: [],
    courseTitle: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    id: '',
  };

  componentDidMount() {
    const courses = this.props.location.state;
    this.setState({
      courseTitle: `${courses.title}`,
      description: `${courses.description}`,
      estimatedTime: `${courses.estimatedTime}` || null,
      materialsNeeded: `${courses.materialsNeeded}` || null,
      id: `${courses.id}`,
    });
  }

  componentWillUnmount() {
    this.submit();
  }

  render() {
    const {context} = this.props;
    const {authenticatedUser} = context;

    const {
      errors,
      courseTitle,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    return (

        <div className="bounds course--detail">
          <h1>Update Course</h1>
          <div>
            {errors
                ?
                <ul className="validation--errors--label">
                  {
                    errors.length > 0
                        ? errors.map(error => <li key={error}>{error}</li>)
                        : ''
                  }
                </ul>
                : ''
            }
            <Form
                cancel={this.cancel}
                submit={this.submit}
                submitButtonText="Update Course"
                elements={() => (
                    <div>
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <React.Fragment>
                            <input id="courseTitle"
                                   name="courseTitle"
                                   type="text"
                                   className="input-title course--title--input"
                                   placeholder="Course title..."
                                   value={courseTitle}
                                   onChange={this.change}/>
                          </React.Fragment>
                          <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>
                          <div className="course--description">
                            <React.Fragment>
                          <textarea id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Course description..."
                                    value={description}
                                    onChange={this.change}/>
                            </React.Fragment>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="grid-25 grid-right">
                          <div className="course--stats">
                            <ul className="course--stats--list">
                              <li key="Estimated Time">
                                <h4>Estimated Time</h4>
                                <div>
                                  <React.Fragment>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        className="course--time--input"
                                        placeholder="Hours"
                                        value={estimatedTime || ""}
                                        onChange={this.change}/>
                                  </React.Fragment>
                                </div>
                              </li>
                              <li key="Materials">
                                <h4>Materials Needed</h4>
                                <div>
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        placeholder="List materials..."
                                        value={materialsNeeded}
                                        onChange={this.change}
                                    />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                )}/>
          </div>
        </div>
    );
  }

  //Updates state on form content change
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  //Submits the form when the submit button is clicked
  submit = async () => {
    const {context} = this.props;
    const {authenticatedUser} = context;
    const {emailAddress} = authenticatedUser;
    const password = context.userPassword;
    const userId = this.props.context.authenticatedUser.id;

    const {
      errors,
      courseTitle,
      description,
      estimatedTime,
      materialsNeeded,
      id,

    } = this.state;

    const course = {
      title: courseTitle,
      description: description,
      estimatedTime,
      materialsNeeded,
      errors,
      id
    };

    //sends an API request when the submit button is clicked
    const response = await context.data.updateCourse(course, {emailAddress, password, userId});
    if (response.status === 400) {
      response.json()
          .then(data =>
              Promise.resolve(this.setState({
                errors: data.errors
              })));
    } else if (response.status === 204) {
      this.props.history.push('/courses/'+ id);
    } else {
      this.props.history.push('/notfound');
    }
  };

  //returns the user to the home page
  cancel = () => {
    this.props.history.push('/courses');
  };

};