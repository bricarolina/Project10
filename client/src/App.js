import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';


//Components
import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import Authenticated from './components/Authenticated';
import CourseDetail from './components/CourseDetail';
import DeleteCourse from './components/DeleteCourse';
import CreateCourse from './components/CreateCourse';
import Forbidden from "./components/Forbidden";
import UpdateCourse from "./components/UpdateCourse";


//Higher order components
import withContext from './Context';
import PrivateRoute from './PrivateRoute';
import UnhandledError from "./components/UnhandledError";

//Routes with Context added
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const AuthWithContext = withContext(Authenticated);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const DeleteCourseWithContext = withContext(DeleteCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const NotFoundWithContext = withContext(NotFound);
const ForbiddenWithContext = withContext(Forbidden);
const UnhandledErrorWithContext = withContext(UnhandledError);


//Route Handling
export default () => (
    <Router>
      <div>
        <HeaderWithContext/>

        <Switch>
          <Route exact path="/" component={CoursesWithContext}/>
          <Route exact path="/courses" component={CoursesWithContext}/>
          <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext}/>
          <PrivateRoute exact path="/courses/delete" component={DeleteCourseWithContext}/>
          <PrivateRoute exact path="/courses/:id/update" component={UpdateCourseWithContext}/>
          <Route exact path="/courses/:id" component={CourseDetailWithContext}/>
          <Route exact path="/signin" component={UserSignInWithContext}/>
          <Route exact path="/signup" component={UserSignUpWithContext}/>
          <Route exact path="/signout" component={UserSignOutWithContext}/>
          <PrivateRoute exact path="/authenticated" component={AuthWithContext}/>
          <Route exact path="/notfound" component={NotFoundWithContext}/>
          <Route exact path="/forbidden" component={ForbiddenWithContext}/>
          <Route exact path="/error" component={UnhandledErrorWithContext}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
);