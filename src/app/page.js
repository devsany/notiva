import { Modak } from "next/font/google";
import Accordian from "./component/Accordian";
import Carousel from "./component/Carousel";
import DisplayUSer from "./component/DisplayUSer";
import SearchFilter from "./component/SearchFilter";
import Todo from "./component/Todo";
import ToggleText from "./component/ToggleText";
import NotesApp from "./NotesApp";
import Mode from "./component/Mode";

export default function Home() {
  return (
    <div>
      {/* <NotesApp /> */}
      {/* <ToggleText /> */}
      {/* <Todo /> */}
      {/* <SearchFilter /> */}
      {/* <Accordian /> */}
      {/* <Carousel /> */}
      {/* <DisplayUSer /> */}
      <Mode />
    </div>
  );
}
