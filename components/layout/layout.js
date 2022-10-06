import { Fragment, useContext } from 'react';
import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

function Layout(props) {

  const notificationCtx = useContext(NotificationContext);

  const activeNotificaiton = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotificaiton && ( 
      <Notification 
        title={activeNotificaiton.title} 
        message={activeNotificaiton.message} 
        status={activeNotificaiton.status} 
        /> 
      )}
    </Fragment>
  );
}

export default Layout;
