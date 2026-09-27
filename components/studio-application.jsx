"use client";
import { Studio } from "sanity";
import config from "../sanity/config";
export default function StudioApplication() {
  return <Studio config={config} />;
}
