import { Fragment, useContext } from "react";
import MainHeader from "./MainHeader";
import Notification from "../ui/Notification";
import NotificationContext from "../../store/notificationContext";

export default function Layout(props) {
  const notificatonCTX = useContext(NotificationContext);

  const activeNotification = notificatonCTX.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}
