import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Alert = withReactContent(Swal);

const error = Alert.mixin({
  toast: true,
  position: "top",

  iconColor: "white",
  showCloseButton: true,
  customClass: {
    closeButton:
      "!bg-white outline-none ring-2 ring-[#0f143a] focus:outline-none border-none",
  },
  timer: 6000,
  showCancelButton: false,
  showConfirmButton: false,
  timerProgressBar: true,
  background: "#f75616",
  color: "white",
});
const success = Alert.mixin({
  toast: true,
  position: "top",

  iconColor: "white",
  showCloseButton: true,
  customClass: {
    closeButton:
      "!bg-white outline-none ring-2 ring-[#0f143a] focus:outline-none border-none",
  },
  timer: 6000,
  showCancelButton: false,
  showConfirmButton: false,
  timerProgressBar: true,
  background: "green",
  color: "white",
});

const modal = () =>
  Alert.fire({
    timer: 3000,
    text: "Page loading please wait",
    showCancelButton: false,
    showConfirmButton: false,
    timerProgressBar: true,
    background: "#f75616",
    didOpen: () => {
      Alert.showLoading();
    },
    color: "white",
  });

const Toast = { error, success, modal, Alert };

export default Toast;
