import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";

export default function usePage() {
  return useContext(PageContext);
}
