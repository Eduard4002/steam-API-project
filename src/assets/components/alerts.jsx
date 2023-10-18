import "../css/alerts.css";

export function ScreenAlert(meddelande) {
  return (
    <>
      <dialog id="dialogThing">
        <p>{meddelande}</p>
        <form method="dialog">
          <button>OK</button>
        </form>
      </dialog>
    </>
  );
}

export function BottomAlert(meddelande) {
  const dialogThing = document.getElementById("dialogThing");

  dialogThing.addEventListener("click", (e) => {
    const dialogDimensions = dialogThing.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialogThing.close();
    }
  });

  return (
    <>
      <dialog id="dialogThing">
        <p>{meddelande}</p>
        <form method="dialog">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}
