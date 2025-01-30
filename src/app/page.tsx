"use client";

import styles from "./page.module.css";
import { person } from "@jsonforms/examples";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import React, { useState } from "react";

const schema = person.schema;
const uischema = person.uischema;
const initialData = person.data;

export default function Home() {
  const [data, setData] = useState(initialData);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={materialRenderers}
          cells={materialCells}
          onChange={({ data, errors }) => setData(data)}
        />
      </main>
    </div>
  );
}
