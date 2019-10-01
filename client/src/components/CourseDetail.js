import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {

  state = {
    courses: null,
  };

  componentDidMount() {
    this.getCourses();
  }


  render() {
    const {context} = this.props;
    const {authenticatedUser} = context;
    let updateAndDelete;
    let course = null;
    if (this.state.courses) {
      course = this.state.courses[0];
      let courseOwner = course.emailAddress;
      if (authenticatedUser) {
        if (authenticatedUser.emailAddress === courseOwner) {
          updateAndDelete =
              <React.Fragment><Link className="button" to='' onClick={this.updateCourse}>Update Course</Link>
                < Link className="button" onClick={this.deleteCourse} to='/courses/delete'>Delete
                  Course</Link></React.Fragment>
        }
      }
    }
    return (
        <div>
          <div className="actions--bar">
            <div className="bounds">
              <div className="grid-100">
                <span>
                  {updateAndDelete}
                </span>
                <Link className="button button-secondary" to="/courses">Return to List</Link>

              </div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course ? course.title : ''}</h3>
                <p>By {course ? (`${course.firstName} ${course.lastName}`) : ''}</p>
              </div>
              <div className="course--description">
                {(course)
                    ? <ReactMarkdown source={course.description}/>
                    : ''
                }
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{course ? course.estimatedTime || 'TBD' : ''}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    {(course)
                        ? <ReactMarkdown source={course.materialsNeeded}/>
                        : ''
                    }
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    );
  }

  getCourses = async () => {
    const id = (this.props.match.params.id);
    const url = `/courses/${id}`;
    const response = await this.props.context.data.api(url);
    if (response.status === 200) {
      await response.json().then(data => this.setState({
        courses: data
      }));
    } else {
      this.props.history.push('/error');
    }
  };

  updateCourse = async () => {
    const {context} = this.props;
    const {id} = this.props.match.params;
    const url = `/courses/${id}`;
    const course = this.state.courses;
    await context.data.api(url);
    this.props.history.push(`${url}/update`, course[0]);
  };

  deleteCourse = async () => {
    const {context} = this.props;
    const {id} = this.props.match.params;
    const {authenticatedUser} = context;
    const {emailAddress} = authenticatedUser;
    const password = context.userPassword;
    try {
      const response = await context.data.deleteCourse(id, emailAddress, password);
      if (response.status === 204) {
        this.props.history.push('/courses');
      } else {
        this.props.history.push('/notfound');
      }
    } catch (error) {
      console.log(error);
      this.props.history.push('/error')
    }
  };
}