import { style, media } from "typestyle"
import {
  flex,
  vertical,
  center,
  centerCenter,
  newLayer,
} from 'csstips'

export const pageStyle = style(
  {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#e9ecef",
  },
  vertical,
)

export const paneStyle = style(
  {
    position: "relative",
  },
  flex,
  center,
  vertical,
)

export const containerStyle = style(
  {
    width: "100%",
    padding: 20,
    position: "relative",
  },
  vertical,
  media({minWidth: 601}, {width: "50%"}),
)

export const centerCenterStyle = style(
  {
    width: "100%",
    padding: 20,
  },
  newLayer,
  vertical,
  centerCenter,
)


export const footerStyle = style(
  {
    width: "100%",
    height: 100,
    backgroundColor: "rgb(33, 33, 33)",
    vertical,
    centerCenter,
  }
)

