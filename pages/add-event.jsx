import { useState, useRef } from "react";

export default function AddEvent() {
  const titleRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    console.log(titleRef.current.value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Event Title</label>
        <input id="title" ref={titleRef}></input>
      </form>
    </div>
  );
}
